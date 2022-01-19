import { Box, Grid, Group, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React, { ReactElement } from 'react';
export default function DynamicWorkoutList({ workouts }: any): ReactElement {
  dayjs.extend(relativeTime);

  return (
    <>
      <Grid grow my={18} gutter="md" justify="center">
        {workouts.map((w: any, wi: number) => (
          <Grid.Col span={12} sm={6} md={4}>
            <Box
              key={w.id}
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
                height: 320,
                overflowY: 'hidden',
              })}
            >
              <Group position="apart" mb={8}>
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
                    <Group noWrap grow position="apart" style={{ alignItems: 'flex-start' }}>
                      <Text>{l.name}</Text>

                      <Group direction="column" grow noWrap spacing={0}>
                        {l.records.map((r: any, ri: number) => (
                          <Text align="right">{`${r.load ? r.load : ''} ${r.sets}x${r.reps} ${
                            r.rpe ? `@${r.rpe}` : ''
                          }`}</Text>
                        ))}
                      </Group>
                    </Group>
                  </Group>
                ))}
              </Group>
            </Box>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
