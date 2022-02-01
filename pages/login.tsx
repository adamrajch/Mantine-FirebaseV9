import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import React from 'react';
import Login from '../components/auth/login';
import BasicShell from '../components/dashboard/BasicShell';
import { verifyIdToken } from '../firebaseAdmin';
export default function LoginPage(): JSX.Element {
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
