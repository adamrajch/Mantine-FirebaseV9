import { Container } from '@mantine/core';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import router from 'next/router';
import nookies from 'nookies';
import React, { ReactElement, useEffect } from 'react';
import Layout from '../../components/dashboard/AppShell';
import FullProgramForm from '../../components/programs/FullProgramForm';
import { useAuth } from '../../context/auth';
import { verifyIdToken } from '../../firebaseAdmin';
export default function Create(): ReactElement {
  const { user, profile, loading } = useAuth();
  useEffect(() => {
    console.log('from create ', user);
    console.log('from create loading: ', loading);
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user]);
  return (
    <Layout>
      {user && !loading ? (
        <Container size="lg">
          <FullProgramForm user={user} />
        </Container>
      ) : null}
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return {
      props: { user: 'nani' },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
