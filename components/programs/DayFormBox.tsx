import { addDoc, collection } from '@firebase/firestore';
import { Button, Checkbox, Group, Loader, MultiSelect, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { db } from '../../firebase';

interface formValues {
  title: string;
  public: boolean;
  summary: string;
  type: string;
  category: string[];
}
export default function DayFormBox(): ReactElement {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const multiSelectData = [
    { value: 'bb', label: 'bodybuilding' },
    { value: 'oly', label: 'olympic weightlifting' },
    { value: 'pl', label: 'powerlifting' },
    { value: 'mobility', label: 'mobility' },
    { value: 'sport', label: 'sport' },
  ];
  const form = useForm<formValues>({
    initialValues: {
      title: '',
      public: false,
      summary: '',
      type: 'routine',
      category: ['bb', 'pl'],
    },

    validationRules: {
      title: (value) => value.trim().length >= 3 && value.trim().length <= 50,
      summary: (value) => value.trim().length >= 3 && value.trim().length <= 300,
    },
  });
  async function handleSubmit(values: formValues) {
    setLoading(true);
    console.log({
      values,
    });
    //create fb doc of program

    const docRef = await addDoc(collection(db, 'programs'), {
      values,
    });

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
