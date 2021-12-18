import { Button, Container, Group, SimpleGrid, Title } from '@mantine/core';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/dashboard/AppShell';
import ProgramCard from '../../../components/programs/ProgramCard';
import ProgramsNav from '../../../components/programs/ProgramsNav';
import { db } from '../../../firebase';
export default function CategorySearchPage({ programsProps, lastVisible }: any): JSX.Element {
  const [programs, setPrograms] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);

  const [last, setLast] = useState<any>(null);

  useEffect(() => {
    setPrograms(JSON.parse(programsProps));
    setLast(JSON.parse(lastVisible));
  }, []);

  function getProgramsQuery() {
    return query(
      collection(db, 'programs'),
      where('featured', '==', true),
      orderBy('heartCount', 'desc'),
      startAfter(last),
      limit(10)
    );
  }

  const getPrograms = async () => {
    const documentSnapshots = await getDocs(getProgramsQuery());
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    if (!empty) {
      documentSnapshots.docs.forEach((d) => {
        console.log('doc data', d.data());
        console.log('in loop');
        const docObj = {
          id: d.id,
          ...d.data(),
        };
        setPrograms((prev: any) => [...prev, docObj]);
      });
    }
    setLast(lastVisible);
    if (documentSnapshots.empty) {
      setEmpty(true);
    }
  };
  return (
    <Layout>
      <Container size="lg">
        <Title order={1} align="center" mb={20}>
          Featured Programs
        </Title>

        <ProgramsNav />

        <SimpleGrid
          breakpoints={[
            { minWidth: 'sm', cols: 1, spacing: 'sm' },
            { minWidth: 'md', cols: 2, spacing: 'lg' },
            { minWidth: 1200, cols: 2, spacing: 'lg' },
          ]}
        >
          {programs.length > 0 &&
            programs.map((p: any) => <ProgramCard program={p} id={p.id} key={p.id} />)}
        </SimpleGrid>
        {!empty && (
          <Group position="center">
            <Button loading={loading} onClick={() => getPrograms()} variant="outline" my={20}>
              Load More
            </Button>
          </Group>
        )}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  try {
    const q = query(
      collection(db, 'programs'),
      where('featured', '==', true),
      orderBy('heartCount', 'desc'),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    let programs: any = [];
    let empty;
    querySnapshot.forEach((doc) => {
      programs.push({
        ...doc.data(),
        id: doc.id,
        created: doc.data().createdDate.toDate().getTime(),
        updated: doc.data().updatedDate.toDate().getTime(),
      });
    });
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    if (querySnapshot.empty || programs.length < 10) {
      empty = true;
    } else {
      empty = false;
    }
    return {
      props: {
        programsProps: JSON.stringify(programs) || [],
        lastVisible: lastVisible == undefined ? null : JSON.stringify(lastVisible),
        isEmpty: empty,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};
