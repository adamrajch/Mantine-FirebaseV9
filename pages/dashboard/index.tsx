import { Container } from '@mantine/core';
import React from 'react';
import ActiveProgramList from '../../components/activePrograms/ActiveProgramList';
import Layout from '../../components/dashboard/AppShell';
import { useAuth } from '../../context/auth';

export default function DashboardHome(): JSX.Element {
  const { user, loading } = useAuth();
  return (
    <Layout>
      <Container size="lg">{user && <ActiveProgramList user={user} />}</Container>
    </Layout>
  );
}
