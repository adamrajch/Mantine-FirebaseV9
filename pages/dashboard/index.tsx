import { Box, Button, Container, Grid, Group, Text, Title } from '@mantine/core';
import { doc, setDoc } from 'firebase/firestore';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import nookies from 'nookies';
import React from 'react';
import ActiveProgramList from '../../components/activePrograms/ActiveProgramList';
import Layout from '../../components/dashboard/AppShell';
import LiftGraph from '../../components/graphs/GraphContainer';
import HistoryList from '../../components/workoutHistory/HistoryList';
import { LiftsData } from '../../components/workouts/LiftData';
import WorkoutContainer from '../../components/workouts/WorkoutContainer';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
import { verifyIdToken } from '../../firebaseAdmin';
export default function DashboardHome(): JSX.Element {
  const { user, loading } = useAuth();
  async function addGlobalLifts() {
    await setDoc(
      doc(db, 'global-lifts', 'global'),
      {
        lifts: LiftsData,
      },
      { merge: true }
    );
  }
  return (
    <Layout>
      {user && (
        <Container size="xl">
          <Grid>
            <Grid.Col span={12} lg={4}>
              <Group direction="column" grow>
                <Box
                  sx={(theme) => ({
                    padding: 16,
                    borderRadius: theme.radius.md,
                    height: 90,
                    backgroundColor:
                      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
                    boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
                    '&:hover': {
                      boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
                    },
                  })}
                >
                  <Text size="lg">
                    Welcome Back{' '}
                    <Link href="/dashboard/profile">
                      <Text
                        weight={500}
                        size="lg"
                        transform="capitalize"
                        component="span"
                        sx={(theme) => ({
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: '#18a6df',
                          },
                        })}
                      >
                        {user.name}
                      </Text>
                    </Link>
                  </Text>
                </Box>
                <Box
                  sx={(theme) => ({
                    padding: 16,
                    borderRadius: theme.radius.md,
                    height: 195,
                    backgroundColor:
                      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
                    boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
                    '&:hover': {
                      boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
                    },
                  })}
                >
                  <Group direction="column" grow>
                    <Title align="center" order={3}>
                      Add A Workout
                    </Title>

                    <Group grow direction="column">
                      <WorkoutContainer user={user} />
                    </Group>
                  </Group>
                </Box>
              </Group>
            </Grid.Col>
            <Grid.Col span={12} lg={4}>
              <HistoryList user={user} />
            </Grid.Col>
            <Grid.Col span={12} lg={4}>
              <ActiveProgramList user={user} />
            </Grid.Col>
            {user.trackedLifts.length > 0 && (
              <Grid.Col span={12}>
                <LiftGraph lifts={user.trackedLifts} userId={user.uid} />
              </Grid.Col>
            )}
          </Grid>

          <Box>
            <Button onClick={addGlobalLifts}>Edit Global Lifts Data</Button>
          </Box>
          {/* <DynamicWorkoutList userId={user.uid} /> */}
        </Container>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: {
        verified: true,
      },
    };
  } catch (error) {
    // context.res.writeHead(302, {
    //   Location: `/refresh`,
    // });
    // context.res.end();
    // return {
    //   props: {} as never,
    // };
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
