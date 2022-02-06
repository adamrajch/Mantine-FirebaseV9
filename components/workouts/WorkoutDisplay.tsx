import { Box, Button, Group, Text, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react';

export default function WorkoutDisplay({ user, workout, workoutId, setEdit }: any) {
  return (
    <Group direction="column" grow>
      <Title order={2} align="center">
        Workout
      </Title>
      <Text align="center" color="dimmed">
        {workout.programTitle}
      </Text>
      <Group position="center" my={8}>
        <Group position="center" style={{ alignItems: 'flex-start' }}>
          <TextInput name="name" label="Workout Name" value={workout.name} disabled />

          <DatePicker
            placeholder="Pick date"
            label="Date Performed"
            value={new Date(workout.date.toDate())}
            disabled
          />
        </Group>
      </Group>
      <Box>
        <Group direction="column" position="center" grow style={{ maxWidth: 600, margin: 'auto' }}>
          {workout.lifts.map((l: any, li: number) => (
            <Group
              key={li}
              position="apart"
              sx={(theme) => ({
                padding: 16,
                borderRadius: theme.radius.md,
                alignItems: 'flex-start',
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
                boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
                '&:hover': {
                  boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
                },
              })}
            >
              <Text>{l.name}</Text>
              <Group direction="column">
                {l.records.map((r: any, ri: number) => (
                  <Text key={ri}>
                    {`${r.load ? `${r.load}` : ''} ${r.sets}x${r.reps} ${
                      r.rpe ? `@${r.rpe}` : ''
                    } ${r.percent ? `${r.percent}%` : ''} `}
                  </Text>
                ))}
              </Group>
            </Group>
          ))}
        </Group>
        <Group position="center" mt={18}>
          <Button variant="outline" style={{ alignSelf: 'flex-end' }} onClick={() => setEdit(true)}>
            Edit
          </Button>
        </Group>
      </Box>
    </Group>
  );
}
