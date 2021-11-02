import { ActionIcon, Group, Modal } from '@mantine/core';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import CreateActivityForm from './CreateActivityForm';

export default function CreateActivityModal(props: any) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Activity"
        size="xl"
        style={{ padding: 12 }}
      >
        <CreateActivityForm
          workoutArrayHelpers={props.workoutArrayHelpers}
          formValues={props.values}
          handleChange={props.handleChange}
          handleOpen={setOpened}
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
