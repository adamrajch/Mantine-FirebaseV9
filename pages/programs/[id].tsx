import { Container } from '@mantine/core';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import React, { ReactElement } from 'react';
import Layout from '../../components/dashboard/AppShell';
import FullProgramForm from '../../components/programs/FullProgramForm';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
export default function Program({ programProps, programID }: any): ReactElement {
  const p = JSON.parse(programProps);
  console.log('individual program: ', p);
  const { user, loading } = useAuth();

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
      <Container size="xl">
        {!loading && (
          <FullProgramForm
            program={JSON.parse(programProps)}
            programID={programID}
            user={user}
            programAuthor={p.author}
          />
        )}

        {/* {!loading && user && (
          <CommentSection programID={programID} user={user} programAuthor={p.email} />
        )} */}
      </Container>
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
