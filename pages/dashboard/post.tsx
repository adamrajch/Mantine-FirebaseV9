import { Box, Container, Title } from '@mantine/core';
import React, { ReactElement, useState } from 'react';
import Layout from '../../components/dashboard/AppShell';
import CustomWorkoutForm from '../../components/workouts/CustomWorkoutForm';
import { useAuth } from '../../context/auth';

export default function Post(): ReactElement {
  const { user, loading } = useAuth();
  const [sesh, setSesh] = useState<any>('title');
  return (
    <Layout>
      {user && (
        <Container size="lg">
          <Box
            sx={(theme) => ({
              padding: 16,
              borderRadius: theme.radius.md,

              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
              boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
            })}
          >
            <Title align="center" order={2}>
              Add Custom Workout
            </Title>

            <CustomWorkoutForm user={user} />
          </Box>
        </Container>
      )}
    </Layout>
  );
}
