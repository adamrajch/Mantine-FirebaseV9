import { Container, Group, Title } from '@mantine/core';
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
          <Title>Welcome {user.name}</Title>
          <Group position="center" grow style={{ width: '100%' }}>
            <HistoryList user={user} />
            <ActiveProgramList user={user} />
          </Group>
        </Container>
      )}
    </Layout>
  );
}
