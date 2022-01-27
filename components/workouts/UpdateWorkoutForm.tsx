import { Box, Button, Group, Text, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useNotifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { doc, getDoc, onSnapshot, writeBatch } from 'firebase/firestore';
import { FieldArray, Formik } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
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
    id?: string;
    records: Array<{
      sets: number;
      reps: number;
      rpe: number | null;
      load: number | null;
      unit: string | null;
    }>;
  }>;
}
export default function UpdateWorkoutForm({
  workout,
  user,
  programId,
  programTitle,
  workoutId,
  setEdit,
}: any): ReactElement {
  const [list, setList] = useState<any>([]);
  const [hits, setHits] = useState<any>([]);
  const [dateInput, setDateInput] = useState<any>(new Date(workout.date.toDate()));
  const [submitting, setSubmitting] = useState<boolean>(false);
  const notifications = useNotifications();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, `users/${user.uid}/lifts`, user.uid), (doc) => {
      console.log('Current data: ', doc.data());

      const data = doc.data();
      setList(
        data?.lifts.map((l: any) => {
          return {
            label: l.name,
            value: l.name,
            id: l.id,
          };
        })
      );
    });

    return unsub;
  }, []);

  useEffect(() => {
    fetchGlobalLifts();
  }, []);

  async function fetchGlobalLifts() {
    const docRef = doc(db, 'global-lifts', 'global');
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    setHits(
      data?.lifts.map((l: any) => {
        return {
          label: l.name,
          value: l.name,
          id: l.id,
        };
      })
    );
  }
  const initialValues: MyFormValues = { name: workout.name, lifts: workout.lifts };

  async function handleFormSubmit(values: any) {
    setSubmitting(true);
    try {
      const batch = writeBatch(db);

      //add workout, updateUser user recents, add lifts

      const workoutRef = doc(db, 'workouts', workoutId);
      batch.update(workoutRef, {
        date: dateInput,
        lifts: values.lifts,
        name: values.name,
        programId: programId ? programId : null,
        programTitle: programTitle ? programTitle : null,
      });

      let newArr = user.recentWorkouts.map((w: any) => {
        return { ...w, date: w.date.toDate() };
      });

      newArr.push({
        date: dateInput,
        name: values.name,
        user: user.uid,
        workoutId: workoutId,
        programId: programId ? programId : null,
        programTitle: programTitle ? programTitle : null,
      });
      console.log('new Arr', newArr);

      let sortedArr = newArr.sort((f: any, s: any) => {
        return s.date - f.date;
      });
      const userRef = doc(db, 'users', user.uid);
      if (sortedArr.length >= 5) {
        sortedArr = sortedArr.slice(0, 5);
        console.log(sortedArr);
        batch.update(userRef, { recentWorkouts: sortedArr });
      } else {
        batch.update(userRef, { recentWorkouts: sortedArr });
      }
      await batch.commit();
      notifications.showNotification({
        title: 'Updated',
        message: 'Workout successfully updated',
      });
      setEdit(false);
    } catch (err) {
      console.log(err);
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
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <Box>
          <FieldArray name="lifts">
            {(liftHelpers) => (
              <Group direction="column" grow>
                <Title align="center">Update Workout</Title>
                <Text align="center" color="dimmed">
                  {workout.programTitle}
                </Text>
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

                {list.length > 0 && (
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
                          hits={hits}
                        />
                      ))}
                    <Group position="center">
                      <Button onClick={() => setEdit(false)}>Cancel</Button>
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
                )}
              </Group>
            )}
          </FieldArray>
        </Box>
      )}
    </Formik>
  );
}
