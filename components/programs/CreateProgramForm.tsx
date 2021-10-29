import {
  Button,
  Checkbox,
  Group,
  Loader,
  MultiSelect,
  SegmentedControl,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { db } from '../../firebase';
interface formValues {
  title: string;
  public: boolean;
  summary: string;
  type: string;
  category: string[];
  experience: string[];
  periodization: string[];
}
export default function CreateProgramForm(): ReactElement {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const multiSelectData = [
    { value: 'bodybuilding', label: 'bodybuilding' },
    { value: 'olympic weightlifting', label: 'olympic weightlifting' },
    { value: 'powerlifting', label: 'powerlifting' },
    { value: 'mobility', label: 'mobility' },
    { value: 'sport', label: 'sport' },
  ];
  const multiSelectExperience = [
    { value: 'beginner', label: 'noob' },
    { value: 'intermediate', label: 'basic' },
    { value: 'advanced', label: 'chad' },
  ];
  const form = useForm<formValues>({
    initialValues: {
      title: '',
      public: false,
      summary: '',
      type: 'routine',
      category: ['bb', 'pl'],
      experience: ['beginner', 'intermediate', 'advanced'],
      periodization: ['none'],
    },

    validationRules: {
      title: (value) => value.trim().length >= 3 && value.trim().length <= 50,
      summary: (value) => value.trim().length >= 3 && value.trim().length <= 300,
    },
  });
  async function handleSubmit(values: any) {
    setLoading(true);
    console.log({
      values,
    });
    //create fb doc of program
    const d = new Date();
    const time = d.getTime();
    values.createdDate = time;
    values.updatedDate = null;
    values.weeks = null;

    const docRef = await addDoc(collection(db, 'programs'), values);

    console.log(docRef.id);
    setLoading(false);
  }
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Group direction="column" spacing="lg" grow>
        <TextInput
          autoComplete="false"
          required
          label="Program Title"
          error={form.errors.title && 'Title must be between 3 and 20 characters'}
          value={form.values.title}
          onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
        />
        <SegmentedControl
          fullWidth
          value={form.values.type}
          onChange={(value) => form.setFieldValue('type', value)}
          data={[
            { label: 'Routine', value: 'routine' },
            { label: 'Program', value: 'program' },
          ]}
        />
        <Group position="center">
          <Checkbox label="Linear" />
          <Checkbox label="Block" />
          <Checkbox label="Wave" />
          <Checkbox label="D.U.P" />
          <Checkbox label="Reverse" />
        </Group>

        <Textarea
          label="Summary"
          value={form.values.summary}
          onChange={(event) => form.setFieldValue('summary', event.currentTarget.value)}
        />
        <MultiSelect
          required
          data={multiSelectData}
          label="Focus"
          value={form.values.category}
          clearable
          onChange={(value) => form.setFieldValue('category', value)}
        />
        <MultiSelect
          required
          data={multiSelectExperience}
          label="Experience"
          value={form.values.experience}
          clearable
          onChange={(value) => form.setFieldValue('experience', value)}
        />
        <Checkbox
          label="Private"
          checked={form.values.public}
          onChange={(event) => form.setFieldValue('public', event.currentTarget.checked)}
        />
        <Button type="submit">
          {loading ? <Loader color="green" variant="dots" /> : 'Create'}
        </Button>
      </Group>
    </form>
  );
}
