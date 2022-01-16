import { Container, Grid } from '@mantine/core';
import React from 'react';
import ActiveProgramList from '../../components/activePrograms/ActiveProgramList';
import Layout from '../../components/dashboard/AppShell';
import HistoryList from '../../components/workoutHistory/HistoryList';
import { useAuth } from '../../context/auth';

export default function DashboardHome(): JSX.Element {
  const { user, loading } = useAuth();
  return (
    <Layout>
      {user && (
        <Container size="xl">
          <Grid>
            <Grid.Col span={4}>
              <HistoryList user={user} />
            </Grid.Col>
            <Grid.Col span={4}>
              <ActiveProgramList user={user} />
            </Grid.Col>
          </Grid>
        </Container>
      )}
    </Layout>
  );
}
