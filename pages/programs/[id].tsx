import { Group, Title } from '@mantine/core';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Layout from '../../components/dashboard/AppShell';
import FullProgramForm from '../../components/programs/FullProgramForm';
import { db } from '../../firebase';
export default function Program({ programProps, programID }: any): ReactElement {
  const p = JSON.parse(programProps);
  console.log('individual program: ', p);
  // console.log('date', p.createdDate);
  // console.log('dateP', p.createdDate.toDate().getTime());
  // console.log('timestamp', p.timestamp);
  const initialValues: any = {
    blocks: [
      {
        name: 'Block 1',
        weeks: [
          {
            name: 'Week 1',
            days: [
              {
                name: 'Day 1',
                summary: '',
                workouts: [],
              },
            ],
          },
        ],
      },
    ],
  };
  return (
    <Layout>
      <Group direction="column" spacing={2} position="center">
        <Group direction="column" key={p.id} spacing={0}>
          <Link href={`programs/${p.id}`}>
            <Title order={1}>{p.template.title}</Title>
          </Link>
          {/* <Text>Created {dayjs(p.createdDate.toDate().getTime()).format('MMMM DD YYYY')}</Text>
          {p.hasOwnProperty('updatedDate') && (
            <Text>Updated {dayjs(p.timestamp).format('MMMM DD YYYY')}</Text>
          )} */}
        </Group>
      </Group>
      <FullProgramForm program={JSON.parse(programProps)} programID={programID} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'programs'));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: typeof params) => {
  const id = params.id;

  const docRef = doc(db, 'programs', id);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      programProps: JSON.stringify(docSnap.data()) || null,
      programID: id,
    },
  };
};
