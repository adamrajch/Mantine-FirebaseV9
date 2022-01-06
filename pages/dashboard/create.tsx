import { Container } from '@mantine/core';
import router from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import Layout from '../../components/dashboard/AppShell';
import FullProgramForm from '../../components/programs/FullProgramForm';
import { useAuth } from '../../context/auth';
export default function Create(): ReactElement {
  const { user, loading } = useAuth();
  useEffect(() => {
    console.log(user);
    if (!(user || loading)) {
      router.push('/login');
    }
  }, [user, loading]);
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
// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   try {
//     const cookies = nookies.get(context);
//     const token = await verifyIdToken(cookies.token);
//     return {
//       props: { user: 'nani' },
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
// };
