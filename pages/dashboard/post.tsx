import { Container, Title } from '@mantine/core';
import React, { ReactElement } from 'react';
import Layout from '../../components/dashboard/AppShell';
import CreateWorkoutForm from '../../components/workouts/CreateWorkoutForm';
import { useAuth } from '../../context/auth';

export default function Post(): ReactElement {
  const { user, loading } = useAuth();
  return (
    <Layout>
      {user && (
        <Container size="lg">
          <Title align="center">Add A Workout</Title>

          <CreateWorkoutForm user={user} />
        </Container>
      )}
    </Layout>
  );
}
