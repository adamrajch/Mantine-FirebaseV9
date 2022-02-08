import { Box, Button, Group, Modal, Text, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { doc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { db } from '../../firebase';

export default function WorkoutDisplay({ user, workout, workoutId, setEdit }: any) {
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    setDeleteLoading(true);
    console.log(user.recentWorkouts);
    let arr = user.recentWorkouts;

    let filtered = arr.filter((e: any) => e.workoutId !== workoutId);

    try {
      const batch = writeBatch(db);
      const workoutRef = doc(db, 'workouts', workoutId);
      const userRef = doc(db, 'users', user.uid);

      await batch.delete(workoutRef);

      if (filtered.length < user.recentWorkouts.length) {
        await batch.update(userRef, {
          recentWorkouts: filtered,
        });
      }

      await batch.commit();
      setDeleteLoading(false);
      router.push('/dashboard/workouts');
    } catch (err) {
      console.log(err);
      setDeleteLoading(false);
    }
    setDeleteLoading(false);
  }
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
          <Button variant="outline" color="red" onClick={() => setOpen(true)}>
            Delete
          </Button>
          <Button variant="outline" onClick={() => setEdit(true)}>
            Edit
          </Button>
          <>
            <Modal opened={open} onClose={() => setOpen(false)} title={`Workout: ${workout.name}`}>
              <Text>Are you sure you want to delete this workout?</Text>
              <Group position="center" mt={18}>
                <Button variant="outline" color="red" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={() => handleDelete()} loading={deleteLoading}>
                  Delete
                </Button>
              </Group>
            </Modal>
          </>
        </Group>
      </Box>
    </Group>
  );
}
