import { Button, Container, Group, Title } from '@mantine/core';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/dashboard/AppShell';
import RecordsContainer from '../../../components/records/RecordsContainer';
import { useAuth } from '../../../context/auth';
import { db } from '../../../firebase';

const LIMIT = 10;
export default function AllLifts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<any>([]);
  const [listEnd, setListEnd] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    console.log('user: ', user);
    fetchRecords();
  }, [user]);

  async function fetchRecords() {
    let unsubscribe;
    if (user?.uid) {
      const q = query(
        collection(db, `users/${user.uid}/records`),
        orderBy('date', 'desc'),
        limit(LIMIT)
      );
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        let arr: any[] = [];
        querySnapshot.forEach((doc) => {
          arr.push({ rid: doc.id, ...doc.data() });
        });
        setRecords(arr);
        setLoading(false);

        if (arr.length < LIMIT) {
          setListEnd(true);
        }
      });
    }

    return unsubscribe;
  }
  const getMoreRecords = async () => {
    setLoading(true);
    const last = records[records.length - 1];

    const cursor = typeof last.date === 'number' ? Timestamp.fromMillis(last.date) : last.date;

    const ref = collection(db, `users/${user.uid}/records`);
    const recordsQuery = query(ref, orderBy('date', 'desc'), startAfter(cursor), limit(LIMIT));

    const newRecords = (await getDocs(recordsQuery)).docs.map((doc) => {
      return { rid: doc.id, ...doc.data() };
    });

    setRecords(records.concat(newRecords));
    setLoading(false);

    if (newRecords.length < LIMIT) {
      setListEnd(true);
    }
  };
  return (
    <Layout>
      {user && (
        <Container size="xl">
          <Title align="center">All Lifts</Title>
          <RecordsContainer records={records} />

          {!loading && !listEnd && (
            <Group position="center" my={25}>
              <Button variant="outline" onClick={getMoreRecords}>
                Load more
              </Button>
            </Group>
          )}
        </Container>
      )}
    </Layout>
  );
}
