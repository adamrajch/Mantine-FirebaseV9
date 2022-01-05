import { doc, onSnapshot } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import ActivityDash from '../../../components/activePrograms/ActivityDash';
import Layout from '../../../components/dashboard/AppShell';
import { db } from '../../../firebase';

export default function ProgramActivityPage({ id }: { id: string }): JSX.Element {
  const [program, setProgram] = useState<any>(null);
  console.log(id);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'subscribed', id), (doc) => {
      console.log('Current data: ', doc.data());
      setProgram(doc.data());
    });

    return unsub;
  }, []);
  return <Layout>{program && <ActivityDash program={program} />}</Layout>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  const id = params.id;
  return {
    props: {
      id: id,
    },
  };
};
