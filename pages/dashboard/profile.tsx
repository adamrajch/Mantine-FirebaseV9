import { doc, getDoc } from '@firebase/firestore';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import React from 'react';
import Layout from '../../components/dashboard/AppShell';
import { db } from '../../firebase';
import { verifyIdToken } from '../../firebaseAdmin';
export default function profile({ user }): JSX.Element {
  console.log('user', JSON.parse(user));
  return (
    <Layout>
      <div>profile page</div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);

    const { user_id } = token;

    const docRef = doc(db, 'users', user_id);
    const profile = await getDoc(docRef);

    return {
      props: {
        user: JSON.stringify(profile.data()) || null,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};
