import { Container, Title } from '@mantine/core';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { ReactElement, useState } from 'react';
import Layout from '../../../components/dashboard/AppShell';
import CreateWorkoutForm from '../../../components/workouts/CreateWorkoutForm';
import { useAuth } from '../../../context/auth';
import { db } from '../../../firebase';

export default function IndividualWorkout({ workoutProps, workoutId }: any): ReactElement {
  const { user, loading } = useAuth();
  const [workout, setWorkout] = useState(JSON.parse(workoutProps));
  return (
    <Layout>
      {user && (
        <Container size="lg">
          <Title align="center">Workout</Title>

          <CreateWorkoutForm user={user} workout={workout} workoutId={workoutId} />
        </Container>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  const id = params.id;
  const docRef = doc(db, 'workouts', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      props: {
        workoutProps: JSON.stringify(docSnap.data()) || null,
        workoutId: id,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
};
