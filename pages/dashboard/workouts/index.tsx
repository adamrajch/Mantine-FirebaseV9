import { Box, Container, Group, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/dashboard/AppShell';
import { useAuth } from '../../../context/auth';
import { db } from '../../../firebase';
export default function IndividualWorkout(): ReactElement {
  const { user, loading } = useAuth();
  const [workouts, setWorkouts] = useState<any>([]);
  dayjs.extend(relativeTime);

  useEffect(() => {
    console.log('user: ', user);
    fetchWorkouts();
  }, [user]);

  async function fetchWorkouts() {
    let unsubscribe;
    if (user?.uid) {
      const q = query(collection(db, 'workouts'), where('user', '==', user.uid), limit(15));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        let arr: any[] = [];
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, ...doc.data() });
        });
        setWorkouts(arr);
      });
    }

    return unsubscribe;
  }
  return (
    <Layout>
      {user && (
        <Container size="md">
          <Title align="center">Workouts</Title>
          <Group direction="column" position="center" my={12}>
            {workouts.length > 0 ? (
              <Group direction="column" position="center" grow>
                {workouts.map((w: any, wi: number) => (
                  <Box
                    sx={(theme) => ({
                      maxWidth: 400,
                      padding: 16,
                      borderRadius: theme.radius.md,
                      backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
                      boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
                      '&:hover': {
                        boxShadow: '8px 8px 18px  #0f0f0f, -2px -2px 6px #14698b',
                      },
                    })}
                  >
                    <Group position="apart">
                      <Link href={`/dashboard/workouts/${w.id}`}>
                        <Title
                          order={3}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              color: '#14b8f8',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {w.name}
                        </Title>
                      </Link>
                      <Text color="dimmed" size="sm">
                        {dayjs(w.date.toDate()).fromNow()}
                      </Text>
                    </Group>

                    <Group direction="column" key={wi} grow spacing={1}>
                      {w.lifts.map((l: any, li: number) => (
                        <Group direction="column" key={l.id} grow>
                          <Group noWrap grow position="apart">
                            <Text>{l.name}</Text>

                            <Group direction="column" grow noWrap spacing={0}>
                              {l.records.map((r: any, ri: number) => (
                                <Text align="right">{`${r.load} ${r.sets}x${r.reps} ${
                                  r.rpe ? `@${r.rpe}` : ''
                                }`}</Text>
                              ))}
                            </Group>
                          </Group>
                        </Group>
                      ))}
                    </Group>
                  </Box>
                ))}
              </Group>
            ) : (
              <div>No workouts :D</div>
            )}
          </Group>
        </Container>
      )}
    </Layout>
  );
}
