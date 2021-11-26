import { collection, getDocs, orderBy, query, where } from '@firebase/firestore';
import { Container, Title } from '@mantine/core';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import React from 'react';
import Layout from '../../components/dashboard/AppShell';
import ProgramList from '../../components/programs/ProgramList';
import { db } from '../../firebase';
import { verifyIdToken } from '../../firebaseAdmin';

export default function MyPrograms({ programsProps }): JSX.Element {
  console.log('serverside props: ', JSON.parse(programsProps));
  const programs = JSON.parse(programsProps);

  return (
    <Layout>
      <Container>
        <Title order={2} align="center">
          My Programs
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProgramList programsProps={programsProps} />
        </div>
      </Container>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);

    const { email } = token;
    console.log('email : ', email);
    const collectionRef = collection(db, 'programs');
    const q = query(collectionRef, where('email', '==', email), orderBy('createdDate', 'desc'));
    const querySnapshot = await getDocs(q);
    let programs = [];
    querySnapshot.forEach((doc) => {
      programs.push({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data().createdDate.toDate().getTime(),
      });
    });

    return {
      props: {
        programsProps: JSON.stringify(programs) || [],
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};
