import { Container } from '@mantine/core';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import Layout from '../../components/dashboard/AppShell';
import CommentSection from '../../components/programs/Comments/CommentSection';
import FullProgramForm from '../../components/programs/FullProgramForm';
import ViewProgramPage from '../../components/programs/ViewProgramPage';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
export default function Program({ programProps, programID }: any): ReactElement {
  const p = JSON.parse(programProps);
  console.log(p);
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!user && !loading) {
      Router.push('/login');
    }
  }, [user, loading]);
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
        {!loading && user && (
          <>
            {user.uid === p.author.uid ? (
              <FullProgramForm
                program={p}
                programID={programID}
                user={user}
                programAuthor={p.author}
              />
            ) : (
              <ViewProgramPage
                program={p}
                programID={programID}
                user={user}
                programAuthor={p.author}
              />
            )}
          </>
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
        // programProps: JSON.stringify(docSnap.data()) || null,
        programProps: JSON.stringify(docSnap.data()) || null,
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
