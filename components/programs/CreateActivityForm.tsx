import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Group,
  Loader,
  Menu,
  NumberInput,
  SegmentedControl,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { FieldArray, Form, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiOutlineClose, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
import { FaRegStickyNote } from 'react-icons/fa';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import * as Yup from 'yup';
import { FlexContainer } from '../FlexContainer';
type Record = {
  sets: number;
  reps: number;
  rpe?: number;
  load?: number;
  type?: string;
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

const ActivitySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Must be between 2-50 characters')
    .max(20, 'Must be between 2-50 characters')
    .required('Required'),
  note: Yup.string()
    .min(2, 'Must be between 3-50 characters')
    .max(20, 'Must be between 3-50 characters'),
  type: Yup.string(),
  lifts: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .min(2, 'Must be between 3-50 characters')
        .max(20, 'Must be between 3-50 characters')
        .required('Required'),
      records: Yup.array().of(
        Yup.object().shape({
          sets: Yup.number()
            .min(1, 'Must be between 1-999')
            .max(999, 'Must be between 1-999')
            .required('Required'),
          reps: Yup.number()
            .min(1, 'Must be between 1-999')
            .max(999, 'Must be between 1-999')
            .required('Required'),
          rpe: Yup.number().min(1, 'Must be between 1-10').max(10, 'Must be between 1-10'),
          load: Yup.number().min(0, 'Must be between 9999').max(9990, 'Must be between 0-9999'),
          percent: Yup.number().min(0, 'Must be between 0-100').max(999, 'Must be between 0-100'),
          hasLoad: Yup.boolean(),
          hasRPE: Yup.boolean(),
          hasPercent: Yup.boolean(),
        })
      ),
    })
  ),
});
export default function CreateActivityForm({
  workoutArrayHelpers: tHelpers,
  handleOpen,
  formValues,
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
    rpe: 8,
    load: 135,
    percent: 75,
    hasLoad: false,
    hasRPE: false,
    hasPercent: false,
  };

  const emptyLift = {
    name: '',
    records: [
      {
        type: 'working',
        sets: 3,
        reps: 5,
        rpe: 8,
        load: 135,
        percent: 75,
        hasLoad: false,
        hasRPE: false,
        hasPercent: false,
      },
    ],
  };

  const starterLift = [
    {
      name: '',
      records: [
        {
          type: 'working',
          sets: 3,
          reps: 5,
          rpe: 8,
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
      name: '',
      records: [
        {
          type: 'working',
          sets: 3,
          reps: 5,
          rpe: 8,
          load: 135,
          percent: 75,
          hasLoad: false,
          hasRPE: false,
          hasPercent: false,
        },
      ],
    },
    {
      name: '',
      records: [
        {
          type: 'working',
          sets: 3,
          reps: 5,
          rpe: 8,
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
        name: '',
        records: [
          {
            type: 'working',
            sets: 3,
            reps: 5,
            rpe: 8,
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
  const colorScheme = useColorScheme();
  async function handleSubmit(values: formValues) {
    setLoading(true);
    console.log(values);
    tHelpers.push(values);
    handleOpen(false);
    setLoading(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => handleSubmit(values)}
      enableReinitialize={false}
      validateOnChange={false}
      validateOnBlur={true}
      validationSchema={ActivitySchema}
      render={({ values, handleChange, setFieldValue, handleReset, errors }) => (
        <Form>
          <FieldArray
            name="lifts"
            render={(liftArrayHelpers) => (
              <Box
                styles={(theme) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  rowGap: 10,
                  width: '100%',
                })}
              >
                <SegmentedControl
                  fullWidth
                  color="cyan"
                  value={values.type}
                  onChange={(value) => {
                    setFieldValue('type', value);
                    setFieldValue('name', '');
                    if (value === 'single') {
                      setFieldValue('lifts', [emptyLift]);
                      setFieldValue('note', '');
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
                  styles={{
                    root: {
                      width: '100%',
                    },
                    controlActive: {
                      backgroundColor: '#2782b0',
                      borderRadius: 4,
                    },
                    active: {
                      backgroundColor: '#2782b0',
                    },
                  }}
                  my={6}
                />
                {values.type !== 'single' && (
                  <Box
                    sx={{
                      marginTop: 12,
                    }}
                  >
                    <FlexContainer justify="space-between">
                      <TextInput
                        autoComplete="false"
                        required
                        label={values.type === 'single' ? '' : 'Add Cluster'}
                        placeholder={values.type === 'single' ? 'Add lift' : 'Cluster Name'}
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
                    </FlexContainer>
                    <Collapse in={opened} my={8}>
                      <Textarea
                        placeholder="Add directions/tips here!"
                        name="note"
                        value={values.note}
                        onChange={handleChange}
                      />
                    </Collapse>
                  </Box>
                )}

                {values.lifts &&
                  values.lifts.length > 0 &&
                  values.lifts.map((lift, liftIndex) => (
                    <Box
                      key={liftIndex}
                      sx={(theme) => ({
                        width: '100%',
                        padding: 12,
                        marginTop: 2,
                        marginBottom: 2,
                        borderRadius: 8,
                        borderColor: theme.colors.gray[9],
                        '&:hover': {
                          backgroundColor:
                            theme.colorScheme === 'dark'
                              ? theme.colors.gray[9]
                              : theme.colors.gray[5],
                        },
                      })}
                    >
                      <FieldArray name={`lifts[${liftIndex}].records`}>
                        {({ move, swap, push, insert, unshift, pop, form, remove }) => {
                          return (
                            <Form>
                              <FlexContainer justify="space-between" align="center">
                                <TextInput
                                  autoComplete="false"
                                  required
                                  placeholder={
                                    values.type === 'single' ? 'Add lift' : `Lift ${liftIndex + 1}`
                                  }
                                  value={values.lifts[liftIndex].name}
                                  name={`lifts[${liftIndex}].name`}
                                  onChange={(e) => {
                                    handleChange(e);
                                    if (values.type === 'single') {
                                      setFieldValue('name', e.currentTarget.value);
                                    }
                                  }}
                                  style={{
                                    marginTop: 'auto',
                                    marginBottom: 'auto',
                                  }}
                                />
                                {/* validation for nested input */}
                                <Group position="right">
                                  {values.type !== 'single' &&
                                    values.lifts.every((l) => l.name.length > 0) && (
                                      <Menu
                                        control={
                                          <ActionIcon size="lg" color="cyan">
                                            <HiOutlineSwitchVertical />
                                          </ActionIcon>
                                        }
                                        zIndex={1200}
                                        sx={(theme) => ({
                                          color: 'pink',
                                          '&:hover': {
                                            backgroundColor: theme.colors.gray[1],
                                          },
                                        })}
                                      >
                                        {values.lifts.map((lift, i) => (
                                          <Menu.Item key={i} onClick={() => swap(liftIndex, i)}>
                                            {values.lifts[i].name}
                                          </Menu.Item>
                                        ))}
                                      </Menu>
                                    )}

                                  <ActionIcon
                                    onClick={() => push(emptyRecord)}
                                    size="lg"
                                    color="cyan"
                                  >
                                    <AiOutlinePlus style={{ height: 18, width: 18 }} />
                                  </ActionIcon>
                                  <ActionIcon
                                    onClick={() => setFieldValue(`lifts[${liftIndex}]`, emptyLift)}
                                    size="lg"
                                    color="cyan"
                                  >
                                    <BiReset style={{ height: 18, width: 18 }} />
                                  </ActionIcon>
                                  {values.type !== 'single' && (
                                    <ActionIcon
                                      onClick={() => liftArrayHelpers.remove(liftIndex)}
                                      size="lg"
                                      color="cyan"
                                    >
                                      <AiOutlineClose style={{ height: 18, width: 18 }} />
                                    </ActionIcon>
                                  )}
                                </Group>
                              </FlexContainer>
                              {/* Record Array  */}
                              {values.lifts[liftIndex].records &&
                                values.lifts[liftIndex].records.length > 0 &&
                                values.lifts[liftIndex].records.map(
                                  (record: Record, recordIndex: number) => (
                                    <Group
                                      key={recordIndex}
                                      direction="column"
                                      spacing={0}
                                      sx={(theme) => ({
                                        marginBottom: 24,
                                      })}
                                    >
                                      <FlexContainer justify="space-between" align="center">
                                        <SegmentedControl
                                          fullWidth
                                          size="xs"
                                          color="cyan"
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
                                          styles={{
                                            root: {
                                              width: '100%',
                                            },
                                            controlActive: {
                                              backgroundColor: '#2782b0',
                                              borderRadius: 4,
                                            },
                                            active: {
                                              backgroundColor: '#2782b0',
                                            },
                                          }}
                                        />
                                        <FlexContainer justify="flex-end" align="center">
                                          <Switch
                                            label="RPE"
                                            checked={
                                              values.lifts[liftIndex].records[recordIndex].hasRPE
                                            }
                                            name={`lifts[${liftIndex}].records[${recordIndex}].hasRPE`}
                                            onChange={(event) => {
                                              setFieldValue(
                                                `lifts[${liftIndex}].records[${recordIndex}].hasRPE`,
                                                event.currentTarget.checked
                                              );
                                              if (event.currentTarget.checked == true) {
                                                setFieldValue(
                                                  `lifts[${liftIndex}].records[${recordIndex}].hasLoad`,
                                                  false
                                                );
                                                // setFieldValue(
                                                //   `lifts[${liftIndex}].records[${recordIndex}].hasPercent`,
                                                //   false
                                                // );
                                              }
                                            }}
                                            styles={{
                                              label: {
                                                marginRight: 8,
                                                padding: 2,
                                              },
                                            }}
                                          />
                                          <Switch
                                            label="%"
                                            checked={
                                              values.lifts[liftIndex].records[recordIndex]
                                                .hasPercent
                                            }
                                            name={`lifts[${liftIndex}].records[${recordIndex}].hasPercent`}
                                            onChange={(event) => {
                                              setFieldValue(
                                                `lifts[${liftIndex}].records[${recordIndex}].hasPercent`,
                                                event.currentTarget.checked
                                              );
                                              if (event.currentTarget.checked == true) {
                                                setFieldValue(
                                                  `lifts[${liftIndex}].records[${recordIndex}].hasLoad`,
                                                  false
                                                );
                                                // setFieldValue(
                                                //   `lifts[${liftIndex}].records[${recordIndex}].hasRPE`,
                                                //   false
                                                // );
                                              }
                                            }}
                                            styles={{
                                              label: {
                                                marginRight: 8,
                                                paddingLeft: 2,
                                              },
                                            }}
                                          />
                                          <Switch
                                            label="Load"
                                            checked={
                                              values.lifts[liftIndex].records[recordIndex].hasLoad
                                            }
                                            name={`lifts[${liftIndex}].records[${recordIndex}].hasLoad`}
                                            onChange={(event) => {
                                              setFieldValue(
                                                `lifts[${liftIndex}].records[${recordIndex}].hasLoad`,
                                                event.currentTarget.checked
                                              );
                                              if (event.currentTarget.checked == true) {
                                                setFieldValue(
                                                  `lifts[${liftIndex}].records[${recordIndex}].hasPercent`,
                                                  false
                                                );
                                                setFieldValue(
                                                  `lifts[${liftIndex}].records[${recordIndex}].hasRPE`,
                                                  false
                                                );
                                              }
                                            }}
                                            styles={{
                                              label: {
                                                marginRight: 8,
                                                padding: 2,
                                              },
                                            }}
                                          />
                                          <ActionIcon
                                            onClick={() => remove(recordIndex)}
                                            color="red"
                                            styles={{
                                              root: {
                                                marginTop: 'auto',
                                                marginBottom: 'auto',
                                              },
                                            }}
                                          >
                                            <AiOutlineDelete />
                                          </ActionIcon>
                                        </FlexContainer>
                                      </FlexContainer>

                                      <FlexContainer>
                                        <FlexContainer justify="flex-start">
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
                                                fontSize: 12,
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
                                            styles={{
                                              icon: {
                                                fontSize: 12,
                                              },
                                            }}
                                            icon={<span>r</span>}
                                          />
                                        </FlexContainer>

                                        <FlexContainer justify="flex-end" align="center">
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
                                              styles={{
                                                icon: {
                                                  fontSize: 12,
                                                },
                                              }}
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
                                              styles={{
                                                icon: {
                                                  fontSize: 12,
                                                },
                                              }}
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
                                              styles={{
                                                icon: {
                                                  fontSize: 12,
                                                },
                                              }}
                                              icon={<span>lbs</span>}
                                            />
                                          )}
                                        </FlexContainer>
                                      </FlexContainer>
                                    </Group>
                                  )
                                )}
                            </Form>
                          );
                        }}
                      </FieldArray>
                    </Box>
                  ))}
              </Box>
            )}
          />

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
