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

  const initialValues = {};
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
                <Text>%</Text>
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
                  //   value={}
                  //   onChange={(value) => {

                  //   }
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
                <NumberInput
                  autoComplete="false"
                  min={0}
                  step={45}
                  max={9999}
                  styles={{
                    icon: {
                      fontSize: 12,
                    },
                  }}
                  icon={<span>lbs</span>}
                />

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
