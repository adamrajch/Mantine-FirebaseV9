import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect } from 'react';
import Login from '../components/auth/login';
import BasicShell from '../components/dashboard/BasicShell';
import { useAuth } from '../context/auth';
import { verifyIdToken } from '../firebaseAdmin';
export default function LoginPage(): JSX.Element {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading]);
  return (
    <BasicShell>
      <Login />
    </BasicShell>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  } catch (error) {
    return {
      props: {} as never,
    };
  }
};
