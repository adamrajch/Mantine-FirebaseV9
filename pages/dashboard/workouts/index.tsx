import { Button, Container, Group, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/dashboard/AppShell';
import DynamicWorkoutList from '../../../components/workouts/DynamicWorkoutList';
import { useAuth } from '../../../context/auth';
import { db } from '../../../firebase';

const LIMIT = 6;

export default function WorkoutsFeed(): ReactElement {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<any>([]);
  const [listEnd, setListEnd] = useState(false);

  dayjs.extend(relativeTime);

  useEffect(() => {
    console.log('user: ', user);
    fetchWorkouts();
  }, [user]);

  async function fetchWorkouts() {
    let unsubscribe;
    if (user?.uid) {
      const q = query(
        collection(db, 'workouts'),
        where('user', '==', user.uid),
        orderBy('date', 'desc'),
        limit(LIMIT)
      );
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        let arr: any[] = [];
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, ...doc.data() });
        });
        setWorkouts(arr);
      });
    }

    return unsubscribe;
  }

  const getMorePosts = async () => {
    setLoading(true);
    const last = workouts[workouts.length - 1];

    const cursor = typeof last.date === 'number' ? Timestamp.fromMillis(last.date) : last.date;

    const ref = collection(db, 'workouts');
    const workoutsQuery = query(
      ref,
      where('user', '==', user.uid),
      orderBy('date', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newWorkouts = (await getDocs(workoutsQuery)).docs.map((doc) => doc.data());

    setWorkouts(workouts.concat(newWorkouts));
    setLoading(false);

    if (newWorkouts.length < LIMIT) {
      setListEnd(true);
    }
  };

  return (
    <Layout>
      {user && (
        <Container size="xl">
          <Title align="center">Workouts</Title>

          <DynamicWorkoutList workouts={workouts} />

          {!loading && !listEnd && (
            <Group position="center">
              <Button onClick={getMorePosts}>Load more</Button>
            </Group>
          )}

          {listEnd && <Text align="center">No more workouts!</Text>}
        </Container>
      )}
    </Layout>
  );
}
