import { addDoc, collection, Timestamp } from '@firebase/firestore';
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
import { Form, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import * as Yup from 'yup';
import { db } from '../../../firebase';
interface formValues {
  title: string;
  public: boolean;
  summary: string;
  type: string;
  category: string[];
  experience: string[];
  periodization: string[];
}

const ProgramSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Must be between 3-50 characters')
    .max(50, 'Must be between 3-50 characters')
    .required('Required'),
  public: Yup.boolean(),
  summary: Yup.string().min(2, 'Too Short!').max(300, 'Too Long!'),
  category: Yup.array().of(Yup.string()).min(1, 'Required'),
  experience: Yup.array().of(Yup.string()).min(1, 'Required'),
});

export default function FormikCreateProgramForm(): ReactElement {
  const [loading, setLoading] = useState(false);

  const initialValues: formValues = {
    title: '',
    public: true,
    summary: '',
    type: 'routine',
    category: ['bb', 'pl'],
    experience: ['beginner', 'intermediate', 'advanced'],
    periodization: [],
  };

  const multiSelectData = [
    { value: 'bb', label: 'bodybuilding', group: 'Lifting' },
    { value: 'oly', label: 'olympic weightlifting', group: 'Lifting' },
    { value: 'pl', label: 'powerlifting', group: 'Lifting' },
    { value: 'sm', label: 'strongman', group: 'Lifting' },
    { value: 'cal', label: 'calesthenics', group: 'Lifting' },
    { value: 'cf', label: 'crossfit', group: 'Lifting' },
    { value: 'mobility', label: 'mobility', group: 'Mobility' },
    { value: 'prehab', label: 'prehab', group: 'Mobility' },
    { value: 'rehab', label: 'rehab', group: 'Mobility' },
    { value: 'sport', label: 'sport', group: 'General' },
    { value: 'conditioning', label: 'conditioning', group: 'General' },
  ];
  const multiSelectExperience = [
    { value: 'beginner', label: 'noob' },
    { value: 'intermediate', label: 'basic' },
    { value: 'advanced', label: 'chad' },
  ];
  const periodizationData = [
    { value: 'linear', label: 'linear' },
    { value: 'block', label: 'block' },
    { value: 'wave', label: 'wave' },
    { value: 'dup', label: 'D.U.P' },
    { value: 'reverse', label: 'reverse' },
  ];
  async function handleSubmit(values: any) {
    setLoading(true);
    console.log(values);

    values.createdDate = Timestamp.now();
    values.updatedDate = null;
    const docRef = await addDoc(collection(db, 'programs'), values);

    console.log(docRef.id);
    setLoading(false);
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        handleSubmit(values);
      }}
      validationSchema={ProgramSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values, handleChange, errors, setFieldValue }) => (
        <Form>
          <Group direction="column" spacing="lg" grow>
            <TextInput
              autoComplete="false"
              required
              label="Program Title"
              name="title"
              error={errors.title}
              value={values.title}
              onChange={handleChange}
            />
            <SegmentedControl
              fullWidth
              name="type"
              value={values.type}
              onChange={(value) => {
                if (value === 'program') {
                }
                setFieldValue('type', value);
              }}
              data={[
                { label: 'Routine', value: 'routine' },
                { label: 'Program', value: 'program' },
              ]}
            />
            {values.type === 'program' && (
              <Group position="center">
                {periodizationData.map((p) => (
                  <Checkbox
                    label={p.label}
                    name="periodization"
                    value={p.value}
                    onChange={handleChange}
                    key={p.value}
                  />
                ))}
              </Group>
            )}

            <Textarea
              label="Summary"
              name="summary"
              value={values.summary}
              onChange={handleChange}
              error={errors.summary}
            />
            <MultiSelect
              required
              data={multiSelectData}
              label="Focus"
              value={values.category}
              searchable
              clearable
              onChange={(value) => setFieldValue('category', value)}
              error={errors.category}
            />
            <MultiSelect
              required
              data={multiSelectExperience}
              label="Experience"
              value={values.experience}
              clearable
              onChange={(value) => setFieldValue('experience', value)}
              error={errors.experience}
            />
            <Checkbox
              label="Public"
              name="public"
              checked={values.public}
              onChange={handleChange}
            />
            <Button type="submit">
              {loading ? <Loader color="white" variant="dots" /> : 'Create'}
            </Button>
          </Group>
        </Form>
      )}
    </Formik>
  );
}
