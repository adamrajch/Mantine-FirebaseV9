import { Button, Container, Group, SimpleGrid, TextInput, Title } from '@mantine/core';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Layout from '../../../components/dashboard/AppShell';
import ProgramCard from '../../../components/programs/ProgramCard';
import ProgramsNav from '../../../components/programs/ProgramsNav';
import { db } from '../../../firebase';
export default function CategorySearchPage({ programsProps, id }: any): JSX.Element {
  const [programs, setPrograms] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);
  const [first, setFirst] = useState<any>(null);
  const [last, setLast] = useState<any>(null);

  function getProgramsQuery() {
    let q;
    if (id == 'featured') {
      q = query(
        collection(db, 'programs'),
        where('featured', '==', true),
        orderBy('heartCount', 'desc'),
        limit(10)
      );
    } else if (id == 'olympicweightlifting') {
      q = query(
        collection(db, 'programs'),
        where('category', 'array-contains', 'olympic weightlifting'),
        orderBy('featured', 'desc'),
        orderBy('heartCount', 'desc'),
        limit(2)
      );
    } else {
      q = query(
        collection(db, 'programs'),
        where('category', 'array-contains', id),
        orderBy('featured', 'desc'),
        orderBy('heartCount', 'desc'),
        limit(2)
      );
    }

    if (last) {
      q = query(q, startAfter(last));
    }
    return q;
  }
  // function getNextQuery() {
  //   if (id == 'featured') {
  //     return query(
  //       collection(db, 'programs'),
  //       where('featured', '==', true),
  //       orderBy('heartCount', 'desc'),
  //       startAfter(last),
  //       limit(2)
  //     );
  //   } else if (id == 'olympicweightlifting') {
  //     return query(
  //       collection(db, 'programs'),
  //       where('category', 'array-contains', 'olympic weightlifting'),
  //       orderBy('featured', 'desc'),
  //       orderBy('heartCount', 'desc'),
  //       startAfter(last),
  //       limit(2)
  //     );
  //   } else {
  //     return query(
  //       collection(db, 'programs'),
  //       where('category', 'array-contains', id),
  //       orderBy('featured', 'desc'),
  //       orderBy('heartCount', 'desc'),
  //       startAfter(last),
  //       limit(2)
  //     );
  //   }
  // }
  useEffect(() => {
    // setPrograms(JSON.parse(programsProps));

    getPrograms();
  }, [id]);
  // useEffect(() => {
  //   // setPrograms(JSON.parse(programsProps));
  //   setLast(null);
  //   setPrograms([]);
  //   getNextPrograms();
  // }, [id]);

  useEffect(() => {
    console.log('programs', programs);
  }, [programs]);

  const getPrograms = async () => {
    console.log('running');

    const documentSnapshots = await getDocs(getProgramsQuery());
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    if (last) {
      documentSnapshots.docs.forEach((d) => {
        console.log('doc data', d.data());
        console.log('in loop');
        const docObj = {
          id: d.id,
          data: d.data(),
        };
        setPrograms((prev: any) => [...prev, docObj]);
      });
    } else {
      let newPrograms = [];
      documentSnapshots.docs.forEach((d) => {
        console.log('doc data', d.data());
        console.log('in loop');
        const docObj = {
          id: d.id,
          data: d.data(),
        };
        newPrograms.push(docObj);
      });
      setPrograms(newPrograms);
    }

    setLast(lastVisible);

    if (documentSnapshots.empty) {
      setEmpty(true);
    }
  };
  return (
    <Layout>
      <Container size="xl">
        <Title order={1} align="center" mb={20}>
          {id} Programs
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
            programs.map((p: any) => <ProgramCard program={p.data} id={p.id} key={p.id} />)}
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
