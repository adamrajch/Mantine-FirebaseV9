import { Container } from '@mantine/core';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';
import Layout from '../../components/dashboard/AppShell';
import CommentSection from '../../components/programs/Comments/CommentSection';
import FullProgramForm from '../../components/programs/FullProgramForm';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
export default function Program({ programProps, programID }: any): ReactElement {
  const p = programProps;

  const { user, loading } = useAuth();

  return (
    <Layout>
      <Container
        size="lg"
        sx={(theme) => ({
          '@media (max-width: 755px)': {
            padding: theme.spacing.sm,
          },
        })}
      >
        {!loading && (
          <FullProgramForm program={p} programID={programID} user={user} programAuthor={p.author} />
        )}

        {!loading && user && (
          <CommentSection
            programID={programID}
            user={user}
            programAuthor={p.email}
            commentCount={p.commentCount}
          />
        )}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  const id = params.id;
  const docRef = doc(db, 'programs', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      props: {
        programProps: JSON.parse(JSON.stringify(docSnap.data())) || null,
        programID: id,
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
