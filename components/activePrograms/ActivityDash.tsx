import { ActionIcon, Box, Group, Title } from '@mantine/core';
import React, { ReactElement, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function ActivityDash({ program }: any): ReactElement {
  const curr = program.currentDay;
  const blocks = program.workouts;
  const [workout, setWorkout] = useState(blocks[0].weeks[0].days[0]);

  function getWorkout(a, b, c) {
    setWorkout(blocks[a].weeks[b].days[c]);
  }

  function handleRight() {}
  return (
    <Box>
      <Title>{program.title}</Title>
      <Group>
        <ActionIcon>
          <BsChevronLeft />
        </ActionIcon>
        <ActionIcon>
          <BsChevronRight />
        </ActionIcon>
      </Group>
      {workout && <Box>{workout.name}</Box>}
    </Box>
  );
}
