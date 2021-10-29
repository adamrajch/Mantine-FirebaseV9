import { Button, Group, Modal } from '@mantine/core';
import React, { useState } from 'react';
import FormikCreateProgramForm from './FormikCreateProgramForm';

export default function CreateProgramModal() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Create A New Program">
        {/* <CreateProgramForm /> */}
        <FormikCreateProgramForm />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)} radius="md">
          Create Program
        </Button>
      </Group>
    </>
  );
}
