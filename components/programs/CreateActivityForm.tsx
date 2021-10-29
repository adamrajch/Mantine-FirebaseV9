import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Group,
  Loader,
  NumberInput,
  SegmentedControl,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core';
import { FieldArray, Form, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
import { FaRegStickyNote } from 'react-icons/fa';
type Record = {
  sets: number;
  reps: number;
  rpe?: number;
  load?: number;
  percent?: number;
  hasLoad: boolean;
  hasRPE: boolean;
  hasPercent: boolean;
};

type Lift = {
  name: string;
  records: Record[];
};

interface formValues {
  name: string;
  type: string;
  note?: string;
  lifts: Lift[];
  circuitInterval?: number;
  circuitRest?: number;
}

export default function CreateActivityForm({
  workoutArrayHelpers,
  formValues,
  handleChange,
}: any): ReactElement {
  const [loading, setLoading] = useState(false);
  const [opened, setOpen] = useState(false);
  const MARKS = [
    { value: 10, label: '1' },
    { value: 20, label: '2' },
    { value: 30, label: '3' },
    { value: 40, label: '4' },
    { value: 50, label: '5' },
    { value: 60, label: '6' },
    { value: 70, label: '7' },
    { value: 80, label: '8' },
    { value: 90, label: '9' },
    { value: 100, label: '10' },
  ];

  const emptyRecord = {
    type: 'working',
    sets: 3,
    reps: 5,
    rpe: 6,
    load: 135,
    percent: 75,
    hasLoad: false,
    hasRPE: false,
    hasPercent: false,
  };

  const emptyLift = [
    {
      name: 'Lift',
      records: [
        {
          type: 'working',
          sets: 3,
          reps: 5,
          rpe: 6,
          load: 135,
          percent: 75,
          hasLoad: false,
          hasRPE: false,
          hasPercent: false,
        },
      ],
    },
  ];

  const emptyCluster = [
    {
      name: 'Lift 1',
      records: [
        {
          type: 'working',
          sets: 3,
          reps: 5,
          rpe: 6,
          load: 135,
          percent: 75,
          hasLoad: false,
          hasRPE: false,
          hasPercent: false,
        },
      ],
    },
    {
      name: 'Lift 2',
      records: [
        {
          type: 'working',
          sets: 3,
          reps: 5,
          rpe: 6,
          load: 135,
          percent: 75,
          hasLoad: false,
          hasRPE: false,
          hasPercent: false,
        },
      ],
    },
  ];
  const initialValues = {
    name: '',
    type: 'single',
    note: '',
    lifts: [
      {
        name: 'Beg',
        records: [
          {
            type: 'working',
            sets: 3,
            reps: 5,
            rpe: 6,
            load: 135,
            percent: 75,
            hasLoad: false,
            hasRPE: false,
            hasPercent: false,
          },
        ],
      },
    ],
    circuitInterval: undefined,
    circuitRest: undefined,
  };

  async function handleSubmit(values: formValues) {
    setLoading(true);
    console.log({
      values,
    });

    setLoading(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
      enableReinitialize={false}
      validateOnChange={false}
      validateOnBlur={false}
      render={({ values, handleChange, setFieldValue, handleReset, errors }) => (
        <Form>
          <FieldArray
            name="lifts"
            render={(liftArrayHelpers) => (
              <Group
                direction="column"
                grow
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'space-between',
                  width: '100%',
                })}
              >
                <SegmentedControl
                  fullWidth
                  value={values.type}
                  onChange={(value) => {
                    setFieldValue('type', value);
                    if (value === 'single') {
                      setFieldValue('lifts', emptyLift);
                    } else if (value === 'cluster') {
                      setFieldValue('lifts', emptyCluster);
                    } else {
                      setFieldValue('lifts', emptyCluster);
                    }
                  }}
                  data={[
                    { label: 'single', value: 'single' },
                    { label: 'cluster', value: 'cluster' },
                    { label: 'circuit', value: 'circuit' },
                  ]}
                  my={6}
                />
                {values.type !== 'single' && (
                  <Group position="apart">
                    <TextInput
                      autoComplete="false"
                      required
                      label={values.type === 'single' ? 'Lift' : 'Cluster Name'}
                      error={errors.name && 'Name must be between 3 and 25 characters'}
                      value={values.name}
                      name="name"
                      onChange={handleChange}
                    />
                    <Group>
                      <ActionIcon size="lg" color="cyan" onClick={() => setOpen((o) => !o)}>
                        <FaRegStickyNote />
                      </ActionIcon>
                      <Button
                        onClick={() => liftArrayHelpers.push(emptyLift)}
                        leftIcon={<AiOutlinePlus />}
                        size="xs"
                      >
                        Lift
                      </Button>
                    </Group>
                  </Group>
                )}
                <Collapse in={opened}>
                  <Textarea
                    placeholder="Add directions/tips here!"
                    name="note"
                    value={values.note}
                    onChange={handleChange}
                  />
                </Collapse>

                {values.lifts &&
                  values.lifts.length > 0 &&
                  values.lifts.map((lift, liftIndex) => (
                    <Box
                      sx={(theme) => ({
                        width: '100%',
                        padding: 12,
                        marginTop: 12,
                        marginBottom: 12,
                        borderRadius: 8,
                        borderColor: theme.colors.gray[9],
                        '&:hover': {
                          backgroundColor: theme.colors.gray[9],
                        },
                      })}
                    >
                      <FieldArray name={`lifts[${liftIndex}].records`}>
                        {({ move, swap, push, insert, unshift, pop, form, remove }) => {
                          return (
                            <Form>
                              <Group
                                noWrap
                                position="apart"
                                grow
                                sx={(theme) => ({
                                  width: '100%',
                                })}
                              >
                                <TextInput
                                  autoComplete="false"
                                  required
                                  label="Lift"
                                  error={errors.name && 'Title must be between 3 and 20 characters'}
                                  value={values.lifts[liftIndex].name}
                                  name={`lifts[${liftIndex}].name`}
                                  onChange={(e) => {
                                    handleChange(e);
                                    if (values.type === 'single') {
                                      setFieldValue('name', e.currentTarget.value);
                                    }
                                  }}
                                />
                                <Group position="right">
                                  <ActionIcon
                                    onClick={() => push(emptyRecord)}
                                    size="lg"
                                    color="cyan"
                                  >
                                    <AiOutlinePlus style={{ height: 18, width: 18 }} />
                                  </ActionIcon>
                                  <ActionIcon onClick={() => handleReset()} size="lg" color="cyan">
                                    <BiReset style={{ height: 18, width: 18 }} />
                                  </ActionIcon>
                                </Group>
                              </Group>
                              {/* Record Array  */}
                              {values.lifts[liftIndex].records &&
                                values.lifts[liftIndex].records.length > 0 &&
                                values.lifts[liftIndex].records.map(
                                  (record: Record, recordIndex: number) => (
                                    <Group
                                      direction="column"
                                      spacing={1}
                                      sx={(theme) => ({
                                        paddingLeft: 12,
                                        marginBottom: 24,
                                      })}
                                    >
                                      <Group
                                        position="apart"
                                        noWrap
                                        grow
                                        spacing={0}
                                        sx={(theme) => ({
                                          width: '100%',
                                          padding: 'none',
                                          margin: 'none',
                                        })}
                                      >
                                        <SegmentedControl
                                          fullWidth
                                          color="cyan"
                                          size="xs"
                                          value={values.lifts[liftIndex].records[recordIndex].type}
                                          onChange={(value) => {
                                            setFieldValue(
                                              `lifts[${liftIndex}].records[${recordIndex}].type`,
                                              value
                                            );
                                          }}
                                          data={[
                                            { label: 'warmup', value: 'warmup' },
                                            { label: 'working set', value: 'working' },
                                            { label: 'backdown', value: 'backdown' },
                                          ]}
                                          my={6}
                                        />
                                        <Group position="right">
                                          <Switch
                                            label="RPE"
                                            checked={
                                              values.lifts[liftIndex].records[recordIndex].hasRPE
                                            }
                                            name={`lifts[${liftIndex}].records[${recordIndex}].hasRPE`}
                                            onChange={(event) =>
                                              setFieldValue(
                                                `lifts[${liftIndex}].records[${recordIndex}].hasRPE`,
                                                event.currentTarget.checked
                                              )
                                            }
                                          />
                                          <Switch
                                            label="%"
                                            checked={
                                              values.lifts[liftIndex].records[recordIndex]
                                                .hasPercent
                                            }
                                            name={`lifts[${liftIndex}].records[${recordIndex}].hasPercent`}
                                            onChange={(event) =>
                                              setFieldValue(
                                                `lifts[${liftIndex}].records[${recordIndex}].hasPercent`,
                                                event.currentTarget.checked
                                              )
                                            }
                                          />
                                          <Switch
                                            label="Load"
                                            checked={
                                              values.lifts[liftIndex].records[recordIndex].hasLoad
                                            }
                                            name={`lifts[${liftIndex}].records[${recordIndex}].hasLoad`}
                                            onChange={(event) =>
                                              setFieldValue(
                                                `lifts[${liftIndex}].records[${recordIndex}].hasLoad`,
                                                event.currentTarget.checked
                                              )
                                            }
                                          />
                                          <ActionIcon
                                            onClick={() => remove(recordIndex)}
                                            color="red"
                                          >
                                            <AiOutlineDelete />
                                          </ActionIcon>
                                        </Group>
                                      </Group>
                                      <Group
                                        position="apart"
                                        noWrap
                                        grow
                                        spacing={0}
                                        sx={(theme) => ({
                                          width: '100%',
                                          padding: 'none',
                                          margin: 'none',
                                        })}
                                      >
                                        <Group spacing={0} position="apart" grow>
                                          <Group spacing={5} grow>
                                            <NumberInput
                                              autoComplete="false"
                                              required
                                              min={1}
                                              step={1}
                                              max={999}
                                              value={
                                                values.lifts[liftIndex].records[recordIndex].sets
                                              }
                                              name={`lifts[${liftIndex}].records[${recordIndex}].sets`}
                                              onChange={(value) =>
                                                setFieldValue(
                                                  `lifts[${liftIndex}].records[${recordIndex}].sets`,
                                                  value
                                                )
                                              }
                                              styles={{
                                                icon: {
                                                  padding: 1,
                                                  marginRight: 2,
                                                  tabSize: 10,
                                                },
                                              }}
                                              icon={<span>s</span>}
                                            />
                                            <NumberInput
                                              autoComplete="false"
                                              required
                                              min={1}
                                              step={1}
                                              max={9999}
                                              value={
                                                values.lifts[liftIndex].records[recordIndex].reps
                                              }
                                              name={`lifts[${liftIndex}].records[${recordIndex}].reps`}
                                              onChange={(value) =>
                                                setFieldValue(
                                                  `lifts[${liftIndex}].records[${recordIndex}].reps`,
                                                  value
                                                )
                                              }
                                              icon={<span>r</span>}
                                            />
                                          </Group>
                                        </Group>
                                        <Group position="right" spacing={5} grow>
                                          {values.lifts[liftIndex].records[recordIndex].hasRPE && (
                                            <NumberInput
                                              autoComplete="false"
                                              min={1}
                                              step={1}
                                              max={10}
                                              value={
                                                values.lifts[liftIndex].records[recordIndex].rpe
                                              }
                                              name={`lifts[${liftIndex}].records[${recordIndex}].rpe`}
                                              onChange={(value) =>
                                                setFieldValue(
                                                  `lifts[${liftIndex}].records[${recordIndex}].rpe`,
                                                  value
                                                )
                                              }
                                              icon={<span>rpe</span>}
                                            />
                                          )}
                                          {values.lifts[liftIndex].records[recordIndex]
                                            .hasPercent && (
                                            <NumberInput
                                              autoComplete="false"
                                              min={1}
                                              step={5}
                                              max={100}
                                              value={
                                                values.lifts[liftIndex].records[recordIndex].percent
                                              }
                                              name={`lifts[${liftIndex}].records[${recordIndex}].percent`}
                                              onChange={(value) =>
                                                setFieldValue(
                                                  `lifts[${liftIndex}].records[${recordIndex}].percent`,
                                                  value
                                                )
                                              }
                                              icon={<span>%</span>}
                                            />
                                          )}
                                          {values.lifts[liftIndex].records[recordIndex].hasLoad && (
                                            <NumberInput
                                              autoComplete="false"
                                              min={0}
                                              step={45}
                                              max={9999}
                                              value={
                                                values.lifts[liftIndex].records[recordIndex].load
                                              }
                                              name={`lifts[${liftIndex}].records[${recordIndex}].load`}
                                              onChange={(value) =>
                                                setFieldValue(
                                                  `lifts[${liftIndex}].records[${recordIndex}].load`,
                                                  value
                                                )
                                              }
                                              icon={<span>lbs</span>}
                                            />
                                          )}
                                        </Group>
                                      </Group>
                                    </Group>
                                  )
                                )}
                            </Form>
                          );
                        }}
                      </FieldArray>
                    </Box>
                  ))}
              </Group>
            )}
          />
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <Group position="right">
            <Button type="submit">
              {loading ? <Loader color="green" variant="dots" /> : 'Add'}
            </Button>
          </Group>
        </Form>
      )}
    />
  );
}
