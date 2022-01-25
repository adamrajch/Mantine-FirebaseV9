import { Box, Button, Group, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { collection, doc, getDoc, onSnapshot, updateDoc, writeBatch } from 'firebase/firestore';
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
export default function ProgramWorkoutForm({
  workout,
  user,
  setEdit,
  programId,
  programTitle,
  id,
  currentIndex,
  workoutsLength,
  setCurrIndex,
}: any): ReactElement {
  const [list, setList] = useState<any>([]);
  const [hits, setHits] = useState<any>([]);
  const [dateInput, setDateInput] = useState<any>(new Date());
  const [submitting, setSubmitting] = useState<boolean>(false);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, `users/${user.uid}/lifts`, user.uid), (doc) => {
      console.log('Current data: ', doc.data());

      const data = doc.data();
      console.log(data);
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
    console.log(data);
    if (docSnap.exists()) {
      setHits(
        data?.lifts.map((l: any) => {
          return {
            label: l.name,
            value: l.name,
            id: l.id,
          };
        })
      );
    } else {
      console.log('No such document!');
    }
  }

  console.log('currIndex and workout:', currentIndex, workoutsLength);
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
    setSubmitting(true);

    const batch = writeBatch(db);

    //add workout, updateUser user recents, add lifts
    const r = collection(db, 'workouts');
    const workoutRef = doc(r);

    batch.set(workoutRef, {
      date: dateInput,
      lifts: values.lifts,
      name: values.name,
      user: user.uid,
      programId: programId,
      programTitle: programTitle,
    });

    const workoutId = workoutRef.id;

    let newArr = user.recentWorkouts.map((w: any) => {
      return { ...w, date: w.date.toDate() };
    });

    newArr.push({
      date: dateInput,
      name: values.name,
      user: user.uid,
      workoutId: workoutId,
      programId: programId,
      programTitle: programTitle,
    });
    console.log('new Arr', newArr);

    let sortedArr = newArr.sort((f: any, s: any) => {
      console.log(f, s);
      return s.date - f.date;
    });
    const userRef = doc(db, 'users', user.uid);
    if (sortedArr.length >= 5) {
      sortedArr = sortedArr.slice(0, 5);

      batch.update(userRef, { recentWorkouts: sortedArr });
    } else {
      batch.update(userRef, { recentWorkouts: sortedArr });
    }
    console.log(sortedArr);

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

    //update program completed to move currentIndex

    if (currentIndex < workoutsLength - 1) {
      await updateDoc(doc(db, 'subscribed', id), {
        currentIndex: currentIndex + 1,
      });
      setCurrIndex(currentIndex + 1);
      setEdit(false);
    }

    // Router.push('/dashboard');
    await batch.commit();
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
                        hits={hits}
                      />
                    ))}
                  <Group position="center" grow>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEdit(false);
                      }}
                      variant="default"
                    >
                      Cancel
                    </Button>
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

                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </Group>
            )}
          </FieldArray>
        </Box>
      )}
    </Formik>
  );
}
