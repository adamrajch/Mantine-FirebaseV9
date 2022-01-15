import { Button, Group, Modal, MultiSelect, TextInput } from '@mantine/core';
import { Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import * as Yup from 'yup';
const LiftSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(25, 'Too Long!').required('Required'),
  category: Yup.array().of(Yup.string()).max(5, 'Can only have 5'),
});

type Lift = {
  name: string;
  category: string[];
};

export default function AddLiftForm({}): ReactElement {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState<any>([]);
  const initialValues: Lift = {
    name: '',
    category: [],
  };

  const handleCreateLift = async (values: any) => {
    // const form = new FormData(event.target);
    // const formData = Object.fromEntries(form.entries());

    const formValues = {
      name: values.name,
      value: values.name,
      category: value,
    };
    console.log(formValues);
    const res = await fetch('/api/lifts', {
      body: JSON.stringify(formValues),
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
    });

    setOpened(false);
  };

  const data = [
    { value: 'bodybuilding', label: 'Bodybuilding' },
    { value: 'powerlifting', label: 'Powerlifting' },
    { value: 'weightlifting', label: 'weightlifting' },
    { value: 'crossfit', label: 'crossfit' },
    { value: 'mobility', label: 'mobility' },
    { value: 'strongman', label: 'strongman' },
    { value: 'sport', label: 'sport' },
  ];
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => handleCreateLift(values)}
          enableReinitialize={false}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={LiftSchema}
        >
          {({ handleSubmit, values, errors, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <Group direction="column" grow>
                <TextInput
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Create a lift"
                  label="Lift Name"
                />
                <MultiSelect
                  data={data}
                  label="Add categories"
                  placeholder="Select up to 5 tags"
                  value={value}
                  onChange={(val) => setValue(val)}
                  searchable
                  nothingFound="Nothing found"
                  clearButtonLabel="Clear selection"
                  clearable
                />
                <Button size="sm" type="submit">
                  Save
                </Button>
              </Group>
            </form>
          )}
        </Formik>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}
