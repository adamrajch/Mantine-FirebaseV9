import { Box, Container, Grid, Group, Title } from '@mantine/core';
import React from 'react';
import ActiveProgramList from '../../components/activePrograms/ActiveProgramList';
import Layout from '../../components/dashboard/AppShell';
import HistoryList from '../../components/workoutHistory/HistoryList';
import WorkoutContainer from '../../components/workouts/WorkoutContainer';
import { useAuth } from '../../context/auth';

export default function DashboardHome(): JSX.Element {
  const { user, loading } = useAuth();
  return (
    <Layout>
      {user && (
        <Container size="xl">
          <Grid>
            <Grid.Col span={12} lg={4}>
              <Box
                sx={(theme) => ({
                  padding: 16,
                  borderRadius: theme.radius.md,

                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
                  boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
                })}
              >
                <Group grow direction="column">
                  <Title align="center" order={2}>
                    Add A Workout
                  </Title>
                  <WorkoutContainer user={user} />
                </Group>
              </Box>
            </Grid.Col>
            <Grid.Col span={12} lg={4}>
              <HistoryList user={user} />
            </Grid.Col>
            <Grid.Col span={12} lg={4}>
              <ActiveProgramList user={user} />
            </Grid.Col>
          </Grid>
        </Container>
      )}
    </Layout>
  );
}
