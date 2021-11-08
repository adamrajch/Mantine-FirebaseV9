import { Group } from '@mantine/core';
import React, { ReactElement } from 'react';
import BlockSelect from './BlockSelect';
import DaySelect from './DaySelect';
import WeekSelect from './WeekSelect';

export default function SplitSelect({}: any): ReactElement {
  return (
    <Group>
      <BlockSelect />
      <WeekSelect />
      <DaySelect />
    </Group>
  );
}
