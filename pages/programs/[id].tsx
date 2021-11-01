import { ActionIcon, Button, Group, Input, Menu, Paper, Text, Title } from '@mantine/core';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FieldArray, Form, Formik } from 'formik';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { AiFillSetting, AiOutlineClose, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import Layout from '../../components/dashboard/AppShell';
import CreateActivityModal from '../../components/programs/CreateActivityModal';
import { db } from '../../firebase';
import { Block, Day, Week, Workout } from '../../types/types';
export default function Program({ programProps: p }: any): ReactElement {
  console.log(p);

  function addWorkout(workout: any, values: any, workoutArrayHelpers: any) {
    console.log(workout);
    console.log(values);
    workoutArrayHelpers.push(workout);
  }

  const emptyBlock: Block = {
    name: 'New Block',
    summary: undefined,
    weeks: [],
  };
  const emptyWeek: Week = {
    name: 'New Week',
    summary: undefined,
    days: [],
  };

  const emptyDay: Day = {
    name: '',
    summary: '',
    workouts: [],
  };
  const emptyWorkout: Workout = {
    name: '',
    type: 'single',
    note: undefined,
    lifts: [
      {
        name: '',
        records: [
          {
            load: 135,
            sets: 5,
            reps: 5,
            unit: 'lbs',
            rpe: 8,
            percent: undefined,
          },
        ],
      },
    ],
  };

  const emptyCluster: Workout = {
    name: '',
    type: 'cluster',
    lifts: [
      {
        name: '',
        records: [
          {
            load: 135,
            sets: 5,
            reps: 5,
            unit: 'lbs',
            rpe: 8,
            percent: undefined,
          },
        ],
      },
      {
        name: '',
        records: [
          {
            load: 135,
            sets: 5,
            reps: 5,
            unit: 'lbs',
            rpe: 8,
            percent: undefined,
          },
        ],
      },
    ],
  };

  const emptyCircuit: Workout = {
    name: '',
    type: 'circuit',
    note: '5 min rest',
    lifts: [
      {
        name: '',
        records: [
          {
            load: 125,
            sets: 5,
            reps: 5,
            unit: 'lbs',
            rpe: 8,
            percent: undefined,
          },
        ],
      },
      {
        name: '',
        records: [
          {
            load: 125,
            sets: 5,
            reps: 5,
            unit: 'lbs',
            rpe: 8,
            percent: undefined,
          },
        ],
      },
    ],
  };
  const initialValues: any = {
    blocks: [
      {
        name: 'Block Title',
        weeks: [
          {
            name: 'Week 1',
            days: [
              {
                name: 'Day 1',
                summary: '',
                workouts: [],
              },
            ],
          },
        ],
      },
    ],
  };
  return (
    <Layout>
      <Group direction="column" spacing={2} position="center">
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
          render={({ values, handleChange, setFieldValue, handleReset }) => (
            <Form>
              <FieldArray
                name="blocks"
                render={(blockArrayHelpers) => (
                  <>
                    {values.blocks &&
                      values.blocks.length > 0 &&
                      values.blocks.map((b: any, blockIndex: number) => (
                        <div key={blockIndex}>
                          <FieldArray
                            name={`blocks[${blockIndex}].weeks`}
                            render={(arrayHelpers) => (
                              <Group grow direction="column" position="center">
                                <Group position="apart">
                                  <Input
                                    name={`blocks[${blockIndex}].name`}
                                    value={values.blocks[blockIndex].name}
                                    onChange={handleChange}
                                  />

                                  <ActionIcon
                                    onClick={() =>
                                      blockArrayHelpers.insert(
                                        values.blocks.length,
                                        values.blocks[blockIndex]
                                      )
                                    }
                                    color="cyan"
                                  >
                                    <BiDuplicate />
                                  </ActionIcon>

                                  <Button
                                    onClick={() =>
                                      arrayHelpers.push({
                                        name: `Week ${values.blocks[blockIndex].weeks.length + 1}`,
                                        days: [],
                                      })
                                    }
                                  >
                                    +Week
                                  </Button>
                                </Group>
                                <Group direction="column" spacing={4} grow>
                                  {values.blocks[blockIndex].weeks &&
                                    values.blocks[blockIndex].weeks.length > 0 &&
                                    values.blocks[blockIndex].weeks.map(
                                      (week: any, weekIndex: number) => (
                                        <Paper
                                          key={weekIndex}
                                          style={{
                                            width: '50vw',
                                            border: '1px solid gray',
                                            padding: '16px',
                                          }}
                                        >
                                          <FieldArray
                                            name={`blocks[${blockIndex}].weeks[${weekIndex}].days`}
                                            render={(dayArrayHelpers) => (
                                              <>
                                                <Group position="apart">
                                                  <Input
                                                    name={`blocks[${blockIndex}].weeks[${weekIndex}].name`}
                                                    value={
                                                      values.blocks[blockIndex].weeks[weekIndex]
                                                        .name
                                                    }
                                                    onChange={handleChange}
                                                  />
                                                  <Group position="right">
                                                    <Button
                                                      onClick={() => dayArrayHelpers.push(emptyDay)}
                                                    >
                                                      Add Day
                                                    </Button>
                                                    <ActionIcon
                                                      onClick={() =>
                                                        arrayHelpers.insert(
                                                          values.blocks[blockIndex].weeks.length,
                                                          values.blocks[blockIndex].weeks[weekIndex]
                                                        )
                                                      }
                                                      color="cyan"
                                                    >
                                                      <BiDuplicate />
                                                    </ActionIcon>
                                                    <Menu
                                                      control={
                                                        <ActionIcon size="lg" color="cyan">
                                                          <AiFillSetting />
                                                        </ActionIcon>
                                                      }
                                                      zIndex={1200}
                                                    >
                                                      <Menu.Item
                                                        icon={<AiOutlineDelete />}
                                                        onClick={() =>
                                                          arrayHelpers.remove(weekIndex)
                                                        }
                                                      >
                                                        Delete
                                                      </Menu.Item>
                                                    </Menu>
                                                  </Group>
                                                </Group>
                                                {values.blocks[blockIndex].weeks[weekIndex].days &&
                                                  values.blocks[blockIndex].weeks[weekIndex].days
                                                    .length > 0 &&
                                                  values.blocks[blockIndex].weeks[
                                                    weekIndex
                                                  ].days.map((d: any, dayIndex: number) => (
                                                    <FieldArray
                                                      key={dayIndex}
                                                      name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts`}
                                                      render={(workoutArrayHelpers) => (
                                                        <>
                                                          <Group direction="column" my={24} grow>
                                                            <Group position="apart" spacing={2}>
                                                              <Input
                                                                name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.name`}
                                                                value={
                                                                  values.blocks[blockIndex].weeks[
                                                                    weekIndex
                                                                  ].days[dayIndex].name
                                                                }
                                                                onChange={handleChange}
                                                              />
                                                              <Group>
                                                                <Button
                                                                  onClick={() =>
                                                                    workoutArrayHelpers.push(
                                                                      emptyWorkout
                                                                    )
                                                                  }
                                                                  leftIcon={<AiOutlinePlus />}
                                                                  size="xs"
                                                                >
                                                                  Lift
                                                                </Button>

                                                                <Button
                                                                  onClick={() =>
                                                                    workoutArrayHelpers.push(
                                                                      emptyCluster
                                                                    )
                                                                  }
                                                                  size="xs"
                                                                  leftIcon={<AiOutlinePlus />}
                                                                >
                                                                  Cluster
                                                                </Button>
                                                                <Button
                                                                  onClick={() =>
                                                                    workoutArrayHelpers.push(
                                                                      emptyWorkout
                                                                    )
                                                                  }
                                                                  size="xs"
                                                                  leftIcon={<AiOutlinePlus />}
                                                                >
                                                                  Circuit
                                                                </Button>

                                                                <CreateActivityModal
                                                                  workoutArrayHelpers={
                                                                    workoutArrayHelpers
                                                                  }
                                                                  formValues={values}
                                                                  handleChange={handleChange}
                                                                  addWorkout={addWorkout}
                                                                />
                                                                <ActionIcon
                                                                  size="lg"
                                                                  variant="filled"
                                                                  color="cyan"
                                                                  onClick={() =>
                                                                    dayArrayHelpers.remove(dayIndex)
                                                                  }
                                                                >
                                                                  <AiOutlineDelete />
                                                                </ActionIcon>
                                                              </Group>
                                                            </Group>
                                                            {values.blocks[blockIndex].weeks[
                                                              weekIndex
                                                            ].days[dayIndex].workouts &&
                                                              values.blocks[blockIndex].weeks[
                                                                weekIndex
                                                              ].days[dayIndex].workouts.length >
                                                                0 &&
                                                              values.blocks[blockIndex].weeks[
                                                                weekIndex
                                                              ].days[dayIndex].workouts.map(
                                                                (w: any, workoutIndex: number) => (
                                                                  <>
                                                                    <Group
                                                                      position="apart"
                                                                      key={workoutIndex}
                                                                    >
                                                                      <Input
                                                                        name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.name`}
                                                                        value={
                                                                          values.blocks[blockIndex]
                                                                            .weeks[weekIndex].days[
                                                                            dayIndex
                                                                          ].workouts[workoutIndex]
                                                                            .name
                                                                        }
                                                                        onChange={handleChange}
                                                                      />
                                                                      <ActionIcon
                                                                        size="lg"
                                                                        variant="filled"
                                                                        color="cyan"
                                                                        onClick={() =>
                                                                          workoutArrayHelpers.remove(
                                                                            workoutIndex
                                                                          )
                                                                        }
                                                                      >
                                                                        <AiOutlineClose />
                                                                      </ActionIcon>
                                                                    </Group>
                                                                  </>
                                                                )
                                                              )}
                                                          </Group>
                                                        </>
                                                      )}
                                                    />
                                                  ))}
                                              </>
                                            )}
                                          />
                                        </Paper>
                                      )
                                    )}
                                </Group>
                              </Group>
                            )}
                          />
                        </div>
                      ))}
                  </>
                )}
              />

              <pre>{JSON.stringify(values, null, 2)}</pre>
              <Button type="submit">Submit</Button>
            </Form>
          )}
        />
      </Group>
    </Layout>
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
