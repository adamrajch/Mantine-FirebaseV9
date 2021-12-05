import { SimpleGrid, Title } from '@mantine/core';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/dashboard/AppShell';
import ProgramCard from '../../components/programs/ProgramCard';
import { db } from '../../firebase';
export default function ProgramFeed(): ReactElement {
  const [programs, setPrograms] = useState<any>([]);
  useEffect(() => {
    const q = query(collection(db, `programs`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setPrograms(
        querySnapshot.docs.map((d) => {
          const docObj = {
            id: d.id,
            data: d.data(),
          };
          return docObj;
        })
      );
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (programs.length) {
      console.log('home programs', programs);
    }
  }, [programs]);
  return (
    <Layout>
      <Title order={1} align="center" mb={20}>
        Programs
      </Title>
      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 1 },
          { minWidth: 'md', cols: 1 },
          { minWidth: 1200, cols: 3 },
        ]}
      >
        {programs.length > 0 && programs.map((p: any) => <ProgramCard program={p} />)}
      </SimpleGrid>
    </Layout>
  );
}
