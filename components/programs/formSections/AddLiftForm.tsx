import { Button, Group, Modal, MultiSelect, TextInput } from '@mantine/core';
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
  const [name, setName] = useState('');
  const [value, setValue] = useState<any>([]);
  const initialValues: Lift = {
    name: '',
    category: [],
  };

  const handleCreateLift = async () => {
    // e.preventDefault();
    const formValues = {
      name,
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
    { value: 'fullbody', label: 'fullbody' },
    { value: 'push', label: 'push' },
    { value: 'pull', label: 'pull' },
    { value: 'legs', label: 'legs' },
    { value: 'chest', label: 'chest' },
    { value: 'back', label: 'back' },
    { value: 'arms', label: 'arms' },
    { value: 'quads', label: 'quads' },
    { value: 'hamstrings', label: 'hamstrings' },
    { value: 'glutes', label: 'glutes' },
    { value: 'shoulders', label: 'shoulders' },
    { value: 'biceps', label: 'biceps' },
    { value: 'triceps', label: 'triceps' },
    { value: 'hand', label: 'hand' },
    { value: 'cardio', label: 'cardio' },
    { value: 'core', label: 'core' },
    { value: 'mobility', label: 'mobility' },
  ];
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form onSubmit={handleCreateLift}>
          <Group direction="column" grow>
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <Button size="sm" onClick={() => handleCreateLift()}>
              Save
            </Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)} variant="outline">
          Add Lift to DB
        </Button>
      </Group>
    </>
  );
}
