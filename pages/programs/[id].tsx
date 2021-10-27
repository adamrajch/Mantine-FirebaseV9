import { Button, Group, Paper, Text, Title } from '@mantine/core';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FieldArray, Form, Formik } from 'formik';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import ColorModeSwitch from '../../components/NextLink/ColorModeSwitch';
import { db } from '../../firebase';
export default function Program({ programProps: p }: any): ReactElement {
  console.log(p);

  //   const TemplateSchema = Yup.object().shape({

  //   days: Yup.array().of(
  //     Yup.object().shape({
  //       dayName: Yup.string(),
  //       dayDescription: Yup.string(),
  //       hideNote: Yup.boolean(),
  //       workouts: Yup.array().of(
  //         Yup.object().shape({
  //           workoutName: Yup.string().min(2, 'too short').max(25, 'Too long!'),
  //           workoutNote: Yup.string().min(3, 'Too short! How is that a note?').max(100, 'Too long!'),
  //           type: Yup.string(),
  //           lifts: Yup.array().of(
  //             Yup.object().shape({
  //               name: Yup.string().min(2, 'too short').required('Required').max(25, 'Too long!'),
  //               load: Yup.number()
  //                 .positive('Provide a positive load!')
  //                 .max(9000, "It can't be over 9000!!"),
  //               sets: Yup.number()
  //                 .required('Sets required!😡')
  //                 .positive('Use a positive number')
  //                 .max(999, 'Thats too much..'),
  //               reps: Yup.number()
  //                 .required('Reps required!😡')
  //                 .positive('Use a positive number')
  //                 .max(999, 'Thats too much..'),
  //               rest: Yup.string().max(50, 'Too long!'),
  //               note: Yup.string().min(3, 'Too short! How is that a note?').max(100, 'Too long!'),
  //               unit: Yup.string().max(15),
  //               hideNote: Yup.boolean(),
  //             })
  //           ),
  //         })
  //       ),
  //     }),

  //   ),
  // });
  const emptyWeek: any = {
    title: 'New Week',
    days: [],
  };
  const initialValues: any = {
    weeks: [
      {
        title: 'Week 1',
        days: [
          {
            name: 'Day 1',
            summary: '',
            workouts: [
              {
                name: 'bench press',
                note: '',
                type: 'single',
                lifts: [
                  {
                    name: 'bench press',
                    note: '',
                    records: [
                      {
                        load: '135',
                        sets: '5',
                        reps: '5',
                        unit: 'lbs',
                        rpe: 8,
                        percent: null,
                      },
                      {
                        load: '225',
                        sets: '3',
                        reps: '5',
                        unit: '',
                        rpe: 5,
                        percent: null,
                      },
                    ],
                  },
                ],
              },
              ,
              {
                name: 'back squat + front squat',
                note: '',
                type: 'cluster',
                lifts: [
                  {
                    name: 'bench press',
                    note: '',
                    records: [
                      {
                        load: '135',
                        sets: '5',
                        reps: '5',
                        unit: 'lbs',
                        rpe: 8,
                        percent: null,
                      },
                      {
                        load: '225',
                        sets: '3',
                        reps: '5',
                        unit: '',
                        rpe: 5,
                        percent: null,
                      },
                    ],
                  },
                  {
                    name: 'front squat squat',
                    note: '',
                    records: [
                      {
                        load: '225',
                        sets: '5',
                        reps: '5',
                        unit: 'lbs',
                        rpe: 8,
                        percent: null,
                      },
                      {
                        load: '315',
                        sets: '3',
                        reps: '5',
                        unit: '',
                        rpe: 5,
                        percent: null,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  return (
    <Group direction="column" spacing={2} position="center">
      <ColorModeSwitch />
      <Group direction="column" key={p.id} spacing={0}>
        <Link href={`programs/${p.id}`}>
          <Title order={1}>{p.title}</Title>
        </Link>
        <Text>Created {new Date(p.createdDate * 1000).toLocaleDateString()}</Text>

        <Text mx={0}>
          {`Level: `}
          {p.experience.map((e: string, i: number) => (
            <Text key={e} component="span" mx={2}>
              {e}
              {i < p.experience.length - 1 && ','}
            </Text>
          ))}
        </Text>
        <Text mx={0}>
          {`Discipline: `}
          {p.category.map((e: string, i: number) => (
            <Text key={e} component="span" mx={2}>
              {e}
              {i < p.category.length - 1 && ','}
            </Text>
          ))}
        </Text>
        {p.periodization.length > 0 && (
          <Text>
            {`Periodization: `}
            {p.periodization.map((x: string, i: number) => (
              <Text component="span" mx={2} key={x}>
                {x}
                {i < p.periodization.length - 1 && ','}
              </Text>
            ))}
          </Text>
        )}
      </Group>
      <Title>Template Editor </Title>
      {!p.wave && <Text>No Template yet</Text>}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
        enableReinitialize={false}
        validateOnChange={false}
        validateOnBlur={false}
        render={({ values }) => (
          <Form>
            <FieldArray
              name="weeks"
              render={(arrayHelpers) => (
                <Group grow direction="column" position="center">
                  <Group>
                    <Title>{p.title}</Title>
                    <button type="button" onClick={() => arrayHelpers.push(emptyWeek)}>
                      +
                    </button>
                  </Group>
                  <Group direction="column" spacing={4} grow>
                    {values.weeks.map((week: any, index: number) => (
                      <Paper
                        key={index}
                        style={{
                          backgroundColor: 'gray',
                          width: '50vw',
                          height: '50vh',
                          padding: '8px',
                        }}
                        color="blue"
                      >
                        <Group position="apart">
                          <Title style={{ color: 'blue' }}>{week.title}</Title>
                          <button type="button" onClick={() => arrayHelpers.remove(index)}>
                            -
                          </button>
                        </Group>

                        {/* <Field name={`friends[${index}].name`} />
                      <Field name={`friends.${index}.age`} /> */}
                      </Paper>
                    ))}
                  </Group>
                </Group>
              )}
            />
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      />
    </Group>
  );
}

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'programs'));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: typeof params) => {
  const id = params.id;

  const docRef = doc(db, 'programs', id);
  const docSnap = await getDoc(docRef);

  return {
    props: { programProps: docSnap.data() || null },
  };
};
