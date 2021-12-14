import { doc, getDoc } from '@firebase/firestore';
import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../../components/dashboard/AppShell';
import { db } from '../../../firebase';

export default function profile({ user }: any): JSX.Element {
  console.log(user);
  return (
    <Layout>
      <div>profile page</div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  try {
    const id = params.id;

    const docRef = doc(db, 'users', id);
    const user = await getDoc(docRef);

    return {
      props: {
        user: JSON.stringify(user.data) || null,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};
