import { Button, Checkbox, Group } from '@mantine/core';
import React from 'react';

type Props = {};

export default function SettingsForm({}: Props) {
  async function handleSubmit() {}
  return (
    <form onSubmit={handleSubmit}>
      <Group grow direction="column">
        <Checkbox label="Auto restart program upon completion" />
        <Button size="xs">Save</Button>
      </Group>
    </form>
  );
}
