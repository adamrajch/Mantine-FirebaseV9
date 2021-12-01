import {
  ActionIcon,
  Button,
  Group,
  Modal,
  NumberInput,
  SegmentedControl,
  Slider,
  Text,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { ClockIcon } from '@modulz/radix-icons';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function RecordModal(props: any) {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rpe, setRPE] = useState(8);
  const [percent, setPercent] = useState(75);
  const handleSubmit = async (values) => {
    alert(values);
  };
  const MARKS = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];
  type FormValues = {
    rpe: number | undefined;
    percent: number | undefined;
    load: number | undefined;
    unit: string | undefined;
  };
  const initialValues: FormValues = {
    rpe: 8,
    percent: 75,
    load: undefined,
    unit: 'lbs',
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Modifications"
        size="xl"
        style={{ padding: 12 }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => handleSubmit(values)}
          enableReinitialize={false}
          validateOnChange={false}
          validateOnBlur={true}
          render={({ values, handleChange, setFieldValue, handleReset, errors }) => (
            <Form>
              <Group direction="column" position="left" grow>
                <Text>RPE</Text>
                <NumberInput
                  autoComplete="false"
                  min={1}
                  step={1}
                  max={10}
                  value={values.rpe}
                  name={`rpe`}
                  onChange={handleChange}
                  styles={{
                    icon: {
                      fontSize: 12,
                    },
                  }}
                  icon={<span>RPE</span>}
                />
                <Slider
                  labelAlwaysOn
                  max={10}
                  label={(value) => value.toFixed(1)}
                  value={values.rpe}
                  onChange={handleChange}
                  step={0.5}
                  radius={5}
                  marks={MARKS}
                  styles={{ markLabel: { display: 'none' } }}
                />
              </Group>
              <Group direction="column" position="left" grow>
                <Text>%</Text>
                <Slider
                  labelAlwaysOn
                  max={100}
                  label={(value) => `${value.toFixed(2)} %`}
                  value={percent}
                  onChange={setPercent}
                  radius={5}
                  step={0.01}
                  // marks={PERCENT_MARKS}
                  styles={{ markLabel: { display: 'none' } }}
                />
              </Group>
              <Group direction="column" position="left" grow>
                <Text>Load</Text>
                <Slider
                  max={10}
                  label={(value) => value.toFixed(1)}
                  value={rpe}
                  onChange={setRPE}
                  step={0.5}
                  radius={5}
                  marks={MARKS}
                  styles={{ markLabel: { display: 'none' } }}
                />
              </Group>
              <Group direction="column" position="left" grow>
                <SegmentedControl
                  fullWidth
                  size="xs"
                  color="cyan"
                  value={values.unit}
                  onChange={(value) => {
                    setFieldValue('unit', value);
                  }}
                  data={[
                    { label: 'lbs', value: 'lbs' },
                    { label: 'kg', value: 'kg' },
                    { label: 'time', value: 'time' },
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
                {values.unit == 'lbs' && (
                  <NumberInput
                    autoComplete="false"
                    min={0}
                    step={45}
                    max={9999}
                    value={values.load}
                    name="load"
                    onChange={(value) => setFieldValue(`load`, value)}
                    styles={{
                      icon: {
                        fontSize: 12,
                      },
                    }}
                    icon={<span>lbs</span>}
                  />
                )}

                {values.unit == 'kg' && (
                  <NumberInput
                    type="number"
                    autoComplete="false"
                    min={0}
                    step={45}
                    max={9999}
                    value={values.load}
                    name="load"
                    onChange={(value) => setFieldValue(`load`, value)}
                    styles={{
                      icon: {
                        fontSize: 12,
                      },
                    }}
                    icon={<span>kg</span>}
                  />
                )}

                <TimeInput icon={<ClockIcon />} withSeconds />
              </Group>
              <Group position="right">
                <Button type="submit" loading={loading} variant="outline" size="xs">
                  Add Record
                </Button>
              </Group>
            </Form>
          )}
        />
      </Modal>

      <Group position="center">
        <ActionIcon onClick={() => setOpened(true)}>
          <AiOutlinePlusCircle />
        </ActionIcon>
      </Group>
    </>
  );
}
