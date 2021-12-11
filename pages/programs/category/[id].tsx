import { Container, SimpleGrid, TextInput, Title } from '@mantine/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Layout from '../../../components/dashboard/AppShell';
import ProgramCard from '../../../components/programs/ProgramCard';
import ProgramsNav from '../../../components/programs/ProgramsNav';
import { db } from '../../../firebase';
export default function CategorySearchPage({ programsProps, id }: any): JSX.Element {
  const [programs, setPrograms] = useState<any>([]);
  useEffect(() => {
    setPrograms(JSON.parse(programsProps));
  }, [id]);

  // console.log('cat programs', JSON.parse(programsProps));
  console.log(id);
  console.log(id == 'olympicweightlifting');
  const title = id === 'olympicweightlifting?' ? 'poo' : id[0].toUpperCase() + id.slice(1);
  return (
    <Layout>
      <Container size="xl">
        <Title order={1} align="center" mb={20}>
          {title} Programs
        </Title>
        <TextInput icon={<BiSearch />} placeholder="Search by title" />
        <ProgramsNav />
        <SimpleGrid
          breakpoints={[
            { minWidth: 'sm', cols: 1, spacing: 'sm' },
            { minWidth: 'md', cols: 2, spacing: 'lg' },
            { minWidth: 1200, cols: 2, spacing: 'lg' },
          ]}
        >
          {programs.length > 0 && programs.map((p: any) => <ProgramCard program={p} key={p.id} />)}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  try {
    const id = params.id;

    const collectionRef = collection(db, 'programs');

    let q;
    if (id == 'featured') {
      q = query(collection(db, 'programs'), where('featured', '==', true));
    } else if (id == 'olympicweightlifting') {
      q = query(
        collection(db, 'programs'),
        where('category', 'array-contains', 'olympic weightlifting')
      );
    } else {
      q = query(collection(db, 'programs'), where('category', 'array-contains', id));
    }

    const querySnapshot = await getDocs(q);
    let programs = [];
    querySnapshot.forEach((doc) => {
      programs.push({
        ...doc.data(),
        id: doc.id,
        created: doc.data().createdDate.toDate().getTime(),
        updated: doc.data().updatedDate.toDate().getTime(),
      });
    });

    return {
      props: {
        programsProps: JSON.stringify(programs) || [],
        id,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};
