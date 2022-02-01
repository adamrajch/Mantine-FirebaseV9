import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import React from 'react';
import SignUp from '../components/auth/signup';
import BasicShell from '../components/dashboard/BasicShell';
import { verifyIdToken } from '../firebaseAdmin';
export default function SignUpPage(): JSX.Element {
  return (
    <BasicShell>
      <SignUp />
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
