import { Button, Container, Group, SimpleGrid, TextInput, Title } from '@mantine/core';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Layout from '../../../components/dashboard/AppShell';
import ProgramCard from '../../../components/programs/ProgramCard';
import ProgramsNav from '../../../components/programs/ProgramsNav';
import { db } from '../../../firebase';
export default function CategorySearchPage({ programsProps, lastVisible }: any): JSX.Element {
  const [programs, setPrograms] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);

  const [last, setLast] = useState<any>(null);
  //   console.log('cat programs', JSON.parse(programsProps));
  useEffect(() => {
    setPrograms(JSON.parse(programsProps));
    setLast(JSON.parse(lastVisible));
  }, []);

  function getProgramsQuery() {
    let q;

    q = query(
      collection(db, 'programs'),
      where('category', 'array-contains', 'bodybuilding'),
      orderBy('featured', 'desc'),
      orderBy('heartCount', 'desc'),
      startAfter(last),
      limit(2)
    );

    return q;
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

    if (documentSnapshots.empty) {
      setEmpty(true);
    }
  };
  return (
    <Layout>
      <Container size="xl">
        <Title order={1} align="center" mb={20}>
          Bodybuilding Programs
        </Title>

        <Group position="apart">
          <ProgramsNav />
          <TextInput icon={<BiSearch />} placeholder="Search by title" />
        </Group>

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
            <Button loading={loading} onClick={() => getPrograms()}>
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
    let q = query(
      collection(db, 'programs'),
      where('category', 'array-contains', 'bodybuilding'),
      orderBy('featured', 'desc'),
      orderBy('heartCount', 'desc'),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    let programs: any = [];
    querySnapshot.forEach((doc) => {
      programs.push({
        ...doc.data(),
        id: doc.id,
        created: doc.data().createdDate.toDate().getTime(),
        updated: doc.data().updatedDate.toDate().getTime(),
      });
    });
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return {
      props: {
        programsProps: JSON.stringify(programs) || [],
        lastVisible: JSON.stringify(lastVisible),
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};
