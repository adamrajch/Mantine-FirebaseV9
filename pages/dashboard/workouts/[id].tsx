import { Box, Container } from '@mantine/core';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/dashboard/AppShell';
import UpdateWorkoutForm from '../../../components/workouts/UpdateWorkoutForm';
import WorkoutDisplay from '../../../components/workouts/WorkoutDisplay';
import { useAuth } from '../../../context/auth';
import { db } from '../../../firebase';

export default function IndividualWorkout({ workoutId }: any): ReactElement {
  const { user, loading } = useAuth();
  const [workout, setWorkout] = useState<any>(null);
  const [edit, setEdit] = useState<boolean>(false);
  // const router = useRouter();

  // const { id } = router.query;

  useEffect(() => {
    let unsub = onSnapshot(doc(db, 'workouts', workoutId), (doc) => {
      console.log('Current data: ', doc.data());
      if (doc.data() === undefined) {
        console.log('no data');
      } else {
        const w = {
          id: doc?.data()?.id,
          ...doc.data(),
        };
        setWorkout(w);
      }
    });

    return unsub;
  }, []);

  return (
    <Layout>
      {user && workout && (
        <Container size="md">
          <Box
            sx={(theme) => ({
              padding: 16,
              borderRadius: theme.radius.md,
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
              boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #17aae4',
            })}
          >
            {edit ? (
              <UpdateWorkoutForm
                user={user}
                workout={workout}
                workoutId={workoutId}
                setEdit={setEdit}
              />
            ) : (
              <WorkoutDisplay workout={workout} setEdit={setEdit} />
            )}
          </Box>
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
        // workoutProps: postToJSON(docSnap) || null,
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
