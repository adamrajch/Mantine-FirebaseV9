import { Box, Button, Group, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FieldArray, Formik } from 'formik';
import Router from 'next/router';
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
export default function CreateWorkoutForm({
  workout,
  user,
  workoutId,
  setEdit,
  programId,
  programTitle,
}: any): ReactElement {
  const [dateInput, setDateInput] = useState<any>(new Date());
  const [list, setList] = useState<any>([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, `users/${user.uid}/lifts`, user.uid), (doc) => {
      console.log('Current data: ', doc.data());
      const data = doc.data();
      setList(data?.lifts);
    });

    return unsub;
  }, []);

  const mappedLifts = workout?.lifts.map((w: any) => {
    return { value: w.name, label: w.name, id: w.id };
  });
  const fullData = list.concat(mappedLifts);

  console.log(workout);

  const initialValues: MyFormValues = workout
    ? { name: workout.dayName, lifts: workout.lifts }
    : {
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
  async function handleFormSubmit(values: any) {
    if (workoutId) {
      await updateDoc(doc(db, 'workouts', workoutId), {
        date: dateInput,
        lifts: values.lifts,
        name: values.name,
        programId: programId,
        programTitle: programTitle,
      });

      if (user.recentWorkouts.find((e: any) => e.id === workoutId)) {
        let arr = user.recentWorkouts.map((p: any) =>
          p.id === workoutId
            ? {
                date: dateInput,
                lifts: values.lifts,
                name: values.name,
                user: user.uid,
                id: workoutId,
                programId: programId,
                programTitle: programTitle,
              }
            : p
        );

        await updateDoc(doc(db, 'users', user.uid), {
          recentWorkouts: arr,
        });
      }
    } else {
      const docRef = await addDoc(collection(db, 'workouts'), {
        date: dateInput,
        lifts: values.lifts,
        name: values.name,
        user: user.uid,
        programId: programId,
        programTitle: programTitle,
      });

      const workoutId = docRef.id;
      let newArr = user.recentWorkouts;

      if (user.recentWorkouts.length >= 5) {
        newArr.shift();
      }
      newArr.push({
        date: dateInput,
        lifts: values.lifts,
        name: values.name,
        user: user.uid,
        id: workoutId,
        programId: programId,
        programTitle: programTitle,
      });
      await updateDoc(doc(db, 'users', user.uid), {
        recentWorkouts: newArr,
      });
    }
    Router.push('/dashboard');
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
      {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
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

                {list.length > 0 && (
                  <Group direction="column" spacing="md">
                    {values.lifts.length > 0 &&
                      values.lifts.map((lift, li) => (
                        <WorkoutLiftSection
                          key={li}
                          lift={lift}
                          li={li}
                          liftHelpers={liftHelpers}
                          user={user}
                          list={fullData}
                        />
                      ))}

                    <Button
                      size="sm"
                      onClick={() => {
                        handleSubmit();
                      }}
                      variant="outline"
                      loading={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Group>
                )}

                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Box>
            )}
          </FieldArray>
        </Box>
      )}
    </Formik>
  );
}
