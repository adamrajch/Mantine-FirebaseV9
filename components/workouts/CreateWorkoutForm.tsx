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
export default function CreateWorkoutForm({ workout, user }: any): ReactElement {
  const [list, setList] = useState<any>([]);
  const [dateInput, setDateInput] = useState<any>(new Date());
  useEffect(() => {
    const unsub = onSnapshot(doc(db, `users/${user.uid}/lifts`, user.uid), (doc) => {
      console.log('Current data: ', doc.data());

      setList(doc.data().lifts);
    });

    return unsub;
  }, []);
  console.log(user);
  const initialValues: MyFormValues = workout
    ? { name: workout.name, lifts: workout.lifts }
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
    await addDoc(collection(db, 'workouts'), {
      date: dateInput,
      lifts: values.lifts,
      name: values.name,
      user: user.uid,
    });

    let newArr = user.recentWorkouts;

    if (user.recentWorkouts.length >= 5) {
      newArr.shift();
    }
    newArr.push({ date: dateInput, lifts: values.lifts, name: values.name, user: user.uid });
    await updateDoc(doc(db, 'users', user.uid), {
      recentWorkouts: newArr,
    });
    Router.push('/dashboard');
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        handleFormSubmit(values);
      }}
      enableReinitialize={false}
      // validateOnChange={false}
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
                          list={list}
                        />
                      ))}

                    <Button
                      size="sm"
                      onClick={() => handleSubmit()}
                      variant="outline"
                      loading={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Group>
                )}

                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </Box>
            )}
          </FieldArray>
        </Box>
      )}
    </Formik>
  );
}
