import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Input,
  Menu,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FieldArray, Form, Formik } from 'formik';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import {
  AiFillSetting,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
  AiOutlinePlus,
  AiOutlineSave,
} from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import { CgPlayListAdd } from 'react-icons/cg';
import { RiAddLine } from 'react-icons/ri';
import Layout from '../../components/dashboard/AppShell';
import { FlexContainer } from '../../components/FlexContainer';
import CreateActivityModal from '../../components/programs/CreateActivityModal';
import RecordSection from '../../components/programs/formSections/RecordSection';
import { db } from '../../firebase';
import { Block, Day, Week, Workout } from '../../types/types';
export default function Program({ programProps: p }: any): ReactElement {
  console.log(p);

  function addWorkout(workout: any, values: any, workoutArrayHelpers: any) {
    console.log(workout);
    console.log(values);
    workoutArrayHelpers.push(workout);
  }
  const emptyRecord = {
    type: 'working',
    load: 135,
    sets: 5,
    reps: 5,
    unit: 'lbs',
    rpe: 8,
    percent: undefined,
  };

  const emptyLift = {
    name: 'New Lift',
    records: [
      {
        type: 'working',
        load: 135,
        sets: 5,
        reps: 5,
        unit: 'lbs',
        rpe: 8,
        percent: undefined,
      },
    ],
  };
  const emptyWorkout: Workout = {
    name: 'New Lift',
    type: 'single',
    note: undefined,
    lifts: [
      {
        name: 'New Lift',
        records: [
          {
            type: 'working',
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

  const emptyDay: Day = {
    name: 'New Day',
    summary: undefined,
    workouts: [emptyWorkout],
  };

  const emptyCluster: Workout = {
    name: 'New Cluster',
    type: 'cluster',
    note: undefined,
    lifts: [
      {
        name: 'Lift 1',
        records: [
          {
            type: 'working',
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
        name: 'Lift 2',
        records: [
          {
            type: 'working',
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
  const emptyWeek: Week = {
    name: 'New Week',
    summary: undefined,
    days: [emptyDay],
  };
  const emptyBlock: Block = {
    name: 'New Block',
    summary: undefined,
    weeks: [emptyWeek],
  };

  const initialValues: any = {
    blocks: [
      {
        name: 'Block 1',
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
                                  <Group position="right">
                                    <ActionIcon
                                      onClick={() =>
                                        arrayHelpers.push({
                                          name: `Week ${
                                            values.blocks[blockIndex].weeks.length + 1
                                          }`,
                                          summary: undefined,
                                          days: [emptyDay],
                                        })
                                      }
                                    >
                                      <AiOutlineFolderAdd />
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
                                        icon={<AiOutlineSave color="cyan" />}
                                        onClick={() =>
                                          blockArrayHelpers.insert(
                                            values.blocks.length,
                                            values.blocks[blockIndex]
                                          )
                                        }
                                      >
                                        Save block
                                      </Menu.Item>
                                      <Menu.Item
                                        icon={<BiDuplicate color="cyan" />}
                                        onClick={() =>
                                          blockArrayHelpers.insert(
                                            values.blocks.length,
                                            values.blocks[blockIndex]
                                          )
                                        }
                                      >
                                        Duplicate Block
                                      </Menu.Item>
                                      <Menu.Item
                                        icon={<AiOutlineDelete />}
                                        onClick={() => blockArrayHelpers.remove(blockIndex)}
                                        color="red"
                                      >
                                        Delete
                                      </Menu.Item>
                                    </Menu>
                                  </Group>
                                </Group>
                                <Group direction="column" spacing={4} grow>
                                  {values.blocks[blockIndex].weeks &&
                                    values.blocks[blockIndex].weeks.length > 0 &&
                                    values.blocks[blockIndex].weeks.map(
                                      (week: any, weekIndex: number) => (
                                        <Paper
                                          key={weekIndex}
                                          style={{
                                            width: '60vw',
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
                                                    placeholder="week name"
                                                    name={`blocks[${blockIndex}].weeks[${weekIndex}].name`}
                                                    value={
                                                      values.blocks[blockIndex].weeks[weekIndex]
                                                        .name
                                                    }
                                                    onChange={handleChange}
                                                    rightSection={
                                                      values.blocks[blockIndex].weeks[weekIndex]
                                                        .name.length ? (
                                                        <ActionIcon
                                                          onClick={() =>
                                                            setFieldValue(
                                                              `blocks[${blockIndex}].weeks[${weekIndex}].name`,
                                                              ''
                                                            )
                                                          }
                                                          size="xs"
                                                        >
                                                          <AiOutlineClose color="cyan" />
                                                        </ActionIcon>
                                                      ) : null
                                                    }
                                                  />
                                                  <Group position="right">
                                                    <ActionIcon
                                                      onClick={() =>
                                                        dayArrayHelpers.push({
                                                          name: `Day ${
                                                            values.blocks[blockIndex].weeks[
                                                              weekIndex
                                                            ].days.length + 1
                                                          }`,
                                                          workouts: [emptyWorkout],
                                                        })
                                                      }
                                                    >
                                                      <AiOutlineFileAdd />
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
                                                        icon={<BiDuplicate color="cyan" />}
                                                        onClick={() =>
                                                          arrayHelpers.insert(
                                                            values.blocks[blockIndex].weeks.length,
                                                            values.blocks[blockIndex].weeks[
                                                              weekIndex
                                                            ]
                                                          )
                                                        }
                                                      >
                                                        Duplicate Week
                                                      </Menu.Item>
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
                                                                placeholder="day name"
                                                                name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.name`}
                                                                value={
                                                                  values.blocks[blockIndex].weeks[
                                                                    weekIndex
                                                                  ].days[dayIndex].name
                                                                }
                                                                onChange={handleChange}
                                                                rightSection={
                                                                  values.blocks[blockIndex].weeks[
                                                                    weekIndex
                                                                  ].days[dayIndex].name.length ? (
                                                                    <ActionIcon
                                                                      onClick={() =>
                                                                        setFieldValue(
                                                                          `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].name`,
                                                                          ''
                                                                        )
                                                                      }
                                                                      size="xs"
                                                                    >
                                                                      <AiOutlineClose color="cyan" />
                                                                    </ActionIcon>
                                                                  ) : null
                                                                }
                                                              />
                                                              <Group>
                                                                <Button
                                                                  onClick={() =>
                                                                    workoutArrayHelpers.push(
                                                                      emptyWorkout
                                                                    )
                                                                  }
                                                                  leftIcon={<AiOutlinePlus />}
                                                                  variant="outline"
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
                                                                  variant="outline"
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
                                                                  variant="outline"
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
                                                                    <FieldArray
                                                                      name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.lifts`}
                                                                    >
                                                                      {(liftArrayHelpers) => {
                                                                        return (
                                                                          <>
                                                                            {values.blocks[
                                                                              blockIndex
                                                                            ].weeks[weekIndex].days[
                                                                              dayIndex
                                                                            ].workouts[workoutIndex]
                                                                              .type !==
                                                                              'single' && (
                                                                              <div
                                                                                style={{
                                                                                  display: 'flex',
                                                                                  justifyContent:
                                                                                    'space-between',
                                                                                  alignContent:
                                                                                    'center',
                                                                                  marginBottom: 10,
                                                                                }}
                                                                                key={workoutIndex}
                                                                              >
                                                                                <Input
                                                                                  name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.name`}
                                                                                  value={
                                                                                    values.blocks[
                                                                                      blockIndex
                                                                                    ].weeks[
                                                                                      weekIndex
                                                                                    ].days[dayIndex]
                                                                                      .workouts[
                                                                                      workoutIndex
                                                                                    ].name
                                                                                  }
                                                                                  onChange={
                                                                                    handleChange
                                                                                  }
                                                                                />
                                                                                <div
                                                                                  style={{
                                                                                    display: 'flex',
                                                                                    justifyContent:
                                                                                      'flex-end',
                                                                                    alignContent:
                                                                                      'center',
                                                                                    gap: 10,
                                                                                  }}
                                                                                >
                                                                                  <ActionIcon
                                                                                    size="xs"
                                                                                    color="cyan"
                                                                                    onClick={() =>
                                                                                      liftArrayHelpers.push(
                                                                                        emptyLift
                                                                                      )
                                                                                    }
                                                                                  >
                                                                                    <CgPlayListAdd />
                                                                                  </ActionIcon>
                                                                                  <ActionIcon
                                                                                    size="xs"
                                                                                    color="cyan"
                                                                                    onClick={() =>
                                                                                      workoutArrayHelpers.remove(
                                                                                        workoutIndex
                                                                                      )
                                                                                    }
                                                                                  >
                                                                                    <AiOutlineClose />
                                                                                  </ActionIcon>
                                                                                </div>
                                                                              </div>
                                                                            )}

                                                                            {values.blocks[
                                                                              blockIndex
                                                                            ].weeks[weekIndex].days[
                                                                              dayIndex
                                                                            ].workouts[workoutIndex]
                                                                              .lifts &&
                                                                              values.blocks[
                                                                                blockIndex
                                                                              ].weeks[weekIndex]
                                                                                .days[dayIndex]
                                                                                .workouts[
                                                                                workoutIndex
                                                                              ].lifts.length > 0 &&
                                                                              values.blocks[
                                                                                blockIndex
                                                                              ].weeks[
                                                                                weekIndex
                                                                              ].days[
                                                                                dayIndex
                                                                              ].workouts[
                                                                                workoutIndex
                                                                              ].lifts.map(
                                                                                (
                                                                                  l,
                                                                                  liftIndex: number
                                                                                ) => (
                                                                                  <div
                                                                                    key={liftIndex}
                                                                                  >
                                                                                    <FieldArray
                                                                                      name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.lifts[${liftIndex}].records`}
                                                                                    >
                                                                                      {(
                                                                                        recordArrayHelpers
                                                                                      ) => {
                                                                                        return (
                                                                                          <div
                                                                                            style={{
                                                                                              marginBottom: 5,
                                                                                              paddingLeft: 10,
                                                                                            }}
                                                                                          >
                                                                                            <div
                                                                                              key={
                                                                                                liftIndex
                                                                                              }
                                                                                              style={{
                                                                                                display:
                                                                                                  'flex',
                                                                                                justifyContent:
                                                                                                  'space-between',
                                                                                                alignContent:
                                                                                                  'center',
                                                                                              }}
                                                                                            >
                                                                                              <TextInput
                                                                                                autoComplete="false"
                                                                                                required
                                                                                                placeholder="New Lift"
                                                                                                value={
                                                                                                  values
                                                                                                    .blocks[
                                                                                                    blockIndex
                                                                                                  ]
                                                                                                    .weeks[
                                                                                                    weekIndex
                                                                                                  ]
                                                                                                    .days[
                                                                                                    dayIndex
                                                                                                  ]
                                                                                                    .workouts[
                                                                                                    workoutIndex
                                                                                                  ]
                                                                                                    .lifts[
                                                                                                    liftIndex
                                                                                                  ]
                                                                                                    .name
                                                                                                }
                                                                                                name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].name`}
                                                                                                onChange={(
                                                                                                  e
                                                                                                ) => {
                                                                                                  handleChange(
                                                                                                    e
                                                                                                  );
                                                                                                  if (
                                                                                                    values
                                                                                                      .blocks[
                                                                                                      blockIndex
                                                                                                    ]
                                                                                                      .weeks[
                                                                                                      weekIndex
                                                                                                    ]
                                                                                                      .days[
                                                                                                      dayIndex
                                                                                                    ]
                                                                                                      .workouts[
                                                                                                      workoutIndex
                                                                                                    ]
                                                                                                      .type ===
                                                                                                    'single'
                                                                                                  ) {
                                                                                                    setFieldValue(
                                                                                                      `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].name`,
                                                                                                      e
                                                                                                        .currentTarget
                                                                                                        .value
                                                                                                    );
                                                                                                  }
                                                                                                }}
                                                                                                style={{
                                                                                                  marginTop:
                                                                                                    'auto',
                                                                                                  marginBottom:
                                                                                                    'auto',
                                                                                                }}
                                                                                              />
                                                                                              <FlexContainer justify="flex-end">
                                                                                                {values
                                                                                                  .blocks[
                                                                                                  blockIndex
                                                                                                ]
                                                                                                  .weeks[
                                                                                                  weekIndex
                                                                                                ]
                                                                                                  .days[
                                                                                                  dayIndex
                                                                                                ]
                                                                                                  .workouts[
                                                                                                  workoutIndex
                                                                                                ]
                                                                                                  .type !==
                                                                                                  'single' && (
                                                                                                  <ActionIcon
                                                                                                    onClick={() =>
                                                                                                      recordArrayHelpers.push(
                                                                                                        emptyRecord
                                                                                                      )
                                                                                                    }
                                                                                                  >
                                                                                                    <RiAddLine color="cyan" />
                                                                                                  </ActionIcon>
                                                                                                )}
                                                                                                <ActionIcon
                                                                                                  onClick={() => {
                                                                                                    liftArrayHelpers.remove(
                                                                                                      liftIndex
                                                                                                    );
                                                                                                    if (
                                                                                                      values
                                                                                                        .blocks[
                                                                                                        blockIndex
                                                                                                      ]
                                                                                                        .weeks[
                                                                                                        weekIndex
                                                                                                      ]
                                                                                                        .days[
                                                                                                        dayIndex
                                                                                                      ]
                                                                                                        .workouts[
                                                                                                        workoutIndex
                                                                                                      ]
                                                                                                        .type ===
                                                                                                      'single'
                                                                                                    ) {
                                                                                                      workoutArrayHelpers.remove(
                                                                                                        workoutIndex
                                                                                                      );
                                                                                                    }
                                                                                                  }}
                                                                                                >
                                                                                                  <AiOutlineClose color="cyan" />
                                                                                                </ActionIcon>
                                                                                              </FlexContainer>
                                                                                            </div>
                                                                                            {values
                                                                                              .blocks[
                                                                                              blockIndex
                                                                                            ].weeks[
                                                                                              weekIndex
                                                                                            ].days[
                                                                                              dayIndex
                                                                                            ]
                                                                                              .workouts[
                                                                                              workoutIndex
                                                                                            ].lifts[
                                                                                              liftIndex
                                                                                            ]
                                                                                              .records &&
                                                                                              values
                                                                                                .blocks[
                                                                                                blockIndex
                                                                                              ]
                                                                                                .weeks[
                                                                                                weekIndex
                                                                                              ]
                                                                                                .days[
                                                                                                dayIndex
                                                                                              ]
                                                                                                .workouts[
                                                                                                workoutIndex
                                                                                              ]
                                                                                                .lifts[
                                                                                                liftIndex
                                                                                              ]
                                                                                                .records
                                                                                                .length >
                                                                                                0 &&
                                                                                              values.blocks[
                                                                                                blockIndex
                                                                                              ].weeks[
                                                                                                weekIndex
                                                                                              ].days[
                                                                                                dayIndex
                                                                                              ].workouts[
                                                                                                workoutIndex
                                                                                              ].lifts[
                                                                                                liftIndex
                                                                                              ].records.map(
                                                                                                (
                                                                                                  r,
                                                                                                  recordIndex: number
                                                                                                ) => (
                                                                                                  <RecordSection
                                                                                                    values={
                                                                                                      values
                                                                                                    }
                                                                                                    blockIndex={
                                                                                                      blockIndex
                                                                                                    }
                                                                                                    weekIndex={
                                                                                                      weekIndex
                                                                                                    }
                                                                                                    workoutIndex={
                                                                                                      workoutIndex
                                                                                                    }
                                                                                                    dayIndex={
                                                                                                      dayIndex
                                                                                                    }
                                                                                                    recordIndex={
                                                                                                      recordIndex
                                                                                                    }
                                                                                                    liftIndex={
                                                                                                      liftIndex
                                                                                                    }
                                                                                                    setFieldValue={
                                                                                                      setFieldValue
                                                                                                    }
                                                                                                    recordArrayHelpers={
                                                                                                      recordArrayHelpers
                                                                                                    }
                                                                                                  />
                                                                                                )
                                                                                              )}
                                                                                          </div>
                                                                                        );
                                                                                      }}
                                                                                    </FieldArray>
                                                                                  </div>
                                                                                )
                                                                              )}
                                                                          </>
                                                                        );
                                                                      }}
                                                                    </FieldArray>
                                                                    <Divider
                                                                      size="sm"
                                                                      color="cyan"
                                                                      style={{
                                                                        marginTop: 20,
                                                                        marginBottom: 20,
                                                                      }}
                                                                    />
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
