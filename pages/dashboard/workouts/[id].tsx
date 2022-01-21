import { Container } from '@mantine/core';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { ReactElement, useState } from 'react';
import Layout from '../../../components/dashboard/AppShell';
import UpdateWorkoutForm from '../../../components/workouts/UpdateWorkoutForm';
import { useAuth } from '../../../context/auth';
import { db, postToJSON } from '../../../firebase';

export default function IndividualWorkout({ workoutProps, workoutId }: any): ReactElement {
  const { user, loading } = useAuth();
  const [workout, setWorkout] = useState(workoutProps);

  return (
    <Layout>
      {user && (
        <Container size="lg">
          <UpdateWorkoutForm user={user} workout={workout} workoutId={workoutId} />
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
        workoutProps: postToJSON(docSnap) || null,
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
