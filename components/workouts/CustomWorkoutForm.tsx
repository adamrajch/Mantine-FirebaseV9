import { Box, Button, Group, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { collection, doc, onSnapshot, writeBatch } from 'firebase/firestore';
import { FieldArray, Formik } from 'formik';
import Router from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useLiftLibrary } from '../../context/LiftsListContext';
import { db } from '../../firebase';
import WorkoutLiftSection from './WorkoutLiftSection';

const WorkoutSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required'),
});

interface MyFormValues {
  name: string;
  lifts: Array<{
    name: string;
    note: string;
    id?: string | null;
    records: Array<{
      sets: number;
      reps: number;
      rpe: number | null;
      load: number | null;
      unit?: string | null;
    }>;
  }>;
}
export default function CustomWorkoutForm({ user }: any): ReactElement {
  const [list, setList] = useState<any>([]);

  const [dateInput, setDateInput] = useState<any>(new Date());
  const [submitting, setSubmitting] = useState<boolean>(false);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, `users/${user.uid}/lifts`, user.uid), (doc) => {
      console.log('Current data: ', doc.data());
      const data = doc.data();
      if (data) {
        setList(
          data?.lifts.map((l: any) => {
            console.log('individual ', l);

            return {
              label: l.name,
              value: l.name,
              id: l.id,
            };
          })
        );
      }
    });

    return unsub;
  }, []);

  const { lifts } = useLiftLibrary();

  const initialValues: MyFormValues = {
    name: '',
    lifts: [
      {
        name: '',
        id: null,
        note: '',
        records: [
          {
            sets: 5,
            reps: 5,
            rpe: 8,
            load: 135,
          },
        ],
      },
    ],
  };
  async function handleFormSubmit(values: MyFormValues) {
    setSubmitting(true);
    try {
      const batch = writeBatch(db);

      //add workout, updateUser user recents, add lifts
      const r = collection(db, 'workouts');
      const workoutRef = doc(r);

      batch.set(workoutRef, {
        date: dateInput,
        lifts: values.lifts,
        name: values.name,
        user: user.uid,
      });

      const workoutId = workoutRef.id;
      //add workout to sorted array
      let newArr = user.recentWorkouts.map((w: any) => {
        return { ...w };
      });

      newArr.push({
        date: dateInput,
        name: values.name,
        user: user.uid,
        workoutId: workoutId,
      });
      console.log('new Arr', newArr);

      let sortedArr = newArr.sort((f: any, s: any) => {
        return s.date - f.date;
      });
      const userRef = doc(db, 'users', user.uid);
      if (sortedArr.length >= 5) {
        sortedArr = sortedArr.slice(0, 5);
      }

      for (let i = 0; i < values.lifts.length; i++) {
        for (let k = 0; k < values.lifts[i].records.length; k++) {
          const lr = collection(db, `users/${user.uid}/records`);
          const liftRef = doc(lr);
          batch.set(liftRef, {
            name: values.lifts[i].name,
            id: values.lifts[i].id,
            records: values.lifts[i].records[k],
            date: dateInput,
            workoutId: workoutId,
          });
        }
      }

      const tracked = user.trackedLifts;
      console.log('user tracked lifts: ', tracked);
      let newLifts = values.lifts.filter((item: any) => {
        return tracked.every((f: any) => {
          return f.id !== item.id;
        });
      });
      const formatNew = newLifts.map((n: any) => {
        return {
          id: n.id,
          name: n.name,
        };
      });
      console.log('new lifts:', newLifts);
      batch.update(userRef, { trackedLifts: tracked.concat(formatNew), recentWorkouts: sortedArr });

      await batch.commit();
      Router.push('/dashboard');
    } catch (err) {
      console.log(err);

      setSubmitting(false);
    }

    setSubmitting(false);
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        handleFormSubmit(values);
      }}
      enableReinitialize={false}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={WorkoutSchema}
    >
      {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
        <Box>
          <FieldArray name="lifts">
            {(liftHelpers) => (
              <Box>
                <Group position="apart" my={8}>
                  <Group position="center" style={{ alignItems: 'flex-start' }}>
                    <TextInput
                      name="name"
                      label="Workout Name"
                      value={values.name}
                      onChange={handleChange}
                      required
                      error={errors.name ? errors.name : false}
                    />

                    <DatePicker
                      placeholder="Pick date"
                      label="Date Performed"
                      required
                      value={dateInput}
                      onChange={setDateInput}
                      maxDate={dayjs(new Date()).toDate()}
                    />
                  </Group>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      liftHelpers.push({
                        name: '',
                        id: null,
                        note: '',
                        records: [
                          {
                            sets: 3,
                            reps: 5,
                            rpe: 8,
                            load: 135,
                          },
                        ],
                      })
                    }
                    style={{ alignSelf: 'center' }}
                  >
                    Add Lift
                  </Button>
                </Group>

                <Group direction="column" spacing="md" grow>
                  {values.lifts.length > 0 &&
                    values.lifts.map((lift, li) => (
                      <WorkoutLiftSection
                        key={li}
                        lift={lift}
                        li={li}
                        liftHelpers={liftHelpers}
                        user={user}
                        list={list}
                        hits={lifts}
                      />
                    ))}
                  <Group position="center">
                    <Button
                      size="sm"
                      onClick={() => {
                        handleSubmit();
                      }}
                      variant="outline"
                      loading={submitting}
                    >
                      Submit
                    </Button>
                  </Group>
                </Group>
              </Box>
            )}
          </FieldArray>
        </Box>
      )}
    </Formik>
  );
}
