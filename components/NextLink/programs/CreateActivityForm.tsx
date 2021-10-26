import {
  Button,
  Group,
  Loader,
  NumberInput,
  Paper,
  SegmentedControl,
  Slider,
  Switch,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
interface lift {
  name: string;
  sets: number;
  reps: number;
  load?: number;
  rpe?: number;
  percentage?: number;
  note?: string;
}
interface formValues {
  name: string;
  type: string;
  lifts: lift[];
  circuitInterval?: number;
  circuitRest?: number;
}

export default function CreateActivityForm(): ReactElement {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const form = useForm<formValues>({
    initialValues: {
      name: '',
      type: 'single',
      lifts: [],
      circuitInterval: undefined,
      circuitRest: undefined,
    },

    validationRules: {
      name: (value) => value.trim().length >= 3 && value.trim().length <= 50,
    },
  });
  async function handleSubmit(values: formValues) {
    setLoading(true);
    console.log({
      values,
    });

    setLoading(false);
  }
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Group direction="column" position="apart" spacing={1}>
        <SegmentedControl
          fullWidth
          value={form.values.type}
          onChange={(value) => form.setFieldValue('type', value)}
          data={[
            { label: 'single', value: 'Single' },
            { label: 'superset', value: 'SuperSet' },
            { label: 'cluster', value: 'Cluster' },
            { label: 'circuit', value: 'Circuit' },
          ]}
          my={6}
        />
        <TextInput
          autoComplete="false"
          required
          label="Cluster Lift"
          error={form.errors.name && 'Name must be between 3 and 20 characters'}
          value={form.values.name}
          onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
        />
        <Paper>
          <Group grow>
            <TextInput
              autoComplete="false"
              required
              label="Lift"
              error={form.errors.name && 'Title must be between 3 and 20 characters'}
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          </Group>
          <Group grow>
            <NumberInput
              autoComplete="false"
              required
              label="Sets"
              min={1}
              step={1}
              max={999}
              // value={form.values.set}
              // onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
            <NumberInput
              autoComplete="false"
              required
              label="Reps"
              min={1}
              step={1}
              max={999}
              // value={form.values.name}
              // onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          </Group>
          <Group position="apart">
            <Switch label="Weight" />
            <Switch label="RPE" />
            <Switch label="%" />
          </Group>
          <Group>
            <NumberInput
              autoComplete="false"
              required
              label="Load"
              min={0}
              step={45}
              max={9999}
              // value={form.values.name}
              // onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          </Group>

          <SegmentedControl
            fullWidth
            // value={form.values.type}
            // onChange={(value) => form.setFieldValue('type', value)}
            data={[
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
              { label: '4', value: 4 },
              { label: '5', value: 5 },
              { label: '6', value: 6 },
              { label: '7', value: 7 },
              { label: '8', value: 8 },
              { label: '9', value: 9 },
              { label: '10', value: 10 },
            ]}
            my={6}
          />
          <Slider
            labelAlwaysOn
            marks={[
              { value: 25, label: '25%' },
              { value: 50, label: '50%' },
              { value: 75, label: '75%' },
            ]}
            my={6}
          />
        </Paper>
        <Button type="submit">{loading ? <Loader color="green" variant="dots" /> : 'Save'}</Button>
      </Group>
    </form>
  );
}
