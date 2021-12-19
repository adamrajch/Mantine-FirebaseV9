import { Container } from '@mantine/core';
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/dashboard/AppShell';
import CommentSection from '../../components/programs/Comments/CommentSection';
import FullProgramForm from '../../components/programs/FullProgramForm';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
export default function Program({ programProps, programID }: any): ReactElement {
  const p = JSON.parse(programProps);
  console.log('individual program: ', p);
  const { user, loading } = useAuth();
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    getComments();
    return;
  }, []);

  useEffect(() => {
    console.log('comments : ', comments);
  }, [comments]);

  async function getComments() {
    const q = query(
      collection(db, 'comments'),
      where('programID', '==', programID),
      orderBy('createdDate', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setComments(
        querySnapshot.docs.map((d) => {
          const docObj = {
            id: d.id,
            data: d.data(),
          };
          return docObj;
        })
      );
    });

    return unsubscribe;
  }
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
          <FullProgramForm
            program={JSON.parse(programProps)}
            programID={programID}
            user={user}
            programAuthor={p.author}
            comments={comments}
          />
        )}

        {!loading && user && (
          <CommentSection
            programID={programID}
            user={user}
            programAuthor={p.email}
            comments={comments}
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
