import { Box, Button, Group, Text } from '@mantine/core';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { FieldArray, Formik } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import { date } from 'yup';
import { db } from '../../firebase';
import WorkoutLiftSection from './WorkoutLiftSection';

interface MyFormValues {
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
export default function CreateWorkoutForm({ workout, user }: any): ReactElement {
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, `users/${user.uid}/lifts`, user.uid), (doc) => {
      console.log('Current data: ', doc.data());

      setList(doc.data().lifts);
    });

    return unsub;
  }, []);
  console.log(user);
  const initialValues: MyFormValues = workout
    ? { lifts: workout.lifts }
    : {
        lifts: [
          {
            name: 'Lift',
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
    const workoutRef = await addDoc(collection(db, 'workouts'), {
      date: date,
      lifts: values.lifts,
      name: 'custom',
      user: user.uid,
    });
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        handleFormSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Box>
          <FieldArray name="lifts">
            {(liftHelpers) => (
              <Box>
                <Group position="apart">
                  <Text>Date Completed: </Text>

                  <Button
                    size="md"
                    onClick={() =>
                      liftHelpers.push({
                        name: 'Lift',
                        id: 2,
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
                  >
                    Add Lift
                  </Button>
                </Group>
                {list.length > 0 && (
                  <Group direction="column" my="4" spacing="xl">
                    {values.lifts.length > 0 &&
                      values.lifts.map((lift, li) => (
                        <WorkoutLiftSection
                          key={li}
                          lift={lift}
                          li={li}
                          liftHelpers={liftHelpers}
                          user={user}
                          list={list}
                        />
                      ))}

                    <Button size="md" onClick={() => handleSubmit()}>
                      Submit
                    </Button>
                  </Group>
                )}

                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Box>
            )}
          </FieldArray>
        </Box>
      )}
    </Formik>
  );
}
