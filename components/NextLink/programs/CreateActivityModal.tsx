import { Button, Group, Modal } from '@mantine/core';
import React, { useState } from 'react';
import CreateActivityForm from './CreateActivityForm';

export default function CreateActivityModal() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Activity" size="lg">
        <CreateActivityForm />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)} radius="md">
          Add Activity
        </Button>
      </Group>
    </>
  );
}
