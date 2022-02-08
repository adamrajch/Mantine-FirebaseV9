import { Box, Grid, Group, ScrollArea, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React, { ReactElement } from 'react';
export default function DynamicWorkoutList({ workouts }: any): ReactElement {
  dayjs.extend(relativeTime);

  return (
    <Grid my={18} gutter="md" justify="center">
      {workouts.map((w: any, wi: number) => (
        <Grid.Col span={12} sm={6} md={4} key={w.id}>
          <Box
            key={w.id}
            sx={(theme) => ({
              borderRadius: theme.radius.md,
              boxShadow: '6px 6px  14px  #16171a , -2px -2px 6px #1b3742',
              '&:hover': {
                boxShadow: '8px 8px 12px  #0f0f0f, -2px -2px 6px #14698b',
              },
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],

              position: 'relative',
              '&:after': {
                content: "''",
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 10,
                pointerEvents: 'none',
                width: '100%',
                height: 275,
                borderRadius: theme.radius.md,
                // backgroundImage: theme.fn.linearGradient(
                //   180,
                //   'rgba(18, 18, 20, 0)',
                //   'rgba(18, 18, 20, 0.8)'
                // ),
                // backgroundImage:
                //   'linear-gradient(to bottom, rgb(26, 27, 30, 0), rgb(13, 13, 15, 0.6)  110%)',
              },
            })}
          >
            <Group position="apart" mb={8} style={{ padding: 12 }}>
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
            <ScrollArea
              style={{ height: 200, paddingRight: 12, paddingLeft: 12 }}
              type="scroll"
              scrollbarSize={2}
              scrollHideDelay={500}
              offsetScrollbars
              styles={{
                root: { color: 'red' },
                thumb: { backgroundColor: '#14698b' },
              }}
            >
              <Group direction="column" key={wi} grow spacing={0}>
                {w.lifts.map((l: any, li: number) => (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 14,
                    }}
                  >
                    <Text>{l.name}</Text>

                    <Group direction="column" noWrap spacing={0}>
                      {l.records.map((r: any, ri: number) => (
                        <Text align="right" key={ri}>{`${r.load ? r.load : ''} ${r.sets}x${
                          r.reps
                        } ${r.rpe ? `@${r.rpe}` : ''}`}</Text>
                      ))}
                    </Group>
                  </div>
                ))}
              </Group>
            </ScrollArea>
          </Box>
        </Grid.Col>
      ))}
    </Grid>
  );
}
