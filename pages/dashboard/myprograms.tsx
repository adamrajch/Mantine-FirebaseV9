import { Container, Title } from '@mantine/core';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/AppShell';
import ProgramList from '../../components/programs/ProgramList';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
export default function MyPrograms({ programsProps }: any): JSX.Element {
  const [programs, setPrograms] = useState<Array<any>>([]);
  const [programLoading, setProgramLoading] = useState<boolean>(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log(user?.uid);
    getPrograms();
  }, [user]);

  useEffect(() => {
    console.log(programs);
  }, [programs]);

  async function getPrograms() {
    if (!user) {
      return;
    }
    console.log(user);
    const collectionRef = collection(db, 'programs');
    const q = query(
      collectionRef,
      where('author.uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    // const querySnapshot = await getDocs(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPrograms(
        querySnapshot.docs.map((d) => {
          const docObj = {
            id: d.id,
            ...d.data(),
            created: d.data().createdAt.toDate().getTime(),
            updated: d.data().updatedAt.toDate().getTime(),
          };
          return docObj;
        })
      );
      console.log(querySnapshot.docs);
    });
    setProgramLoading(false);
    return unsubscribe;
  }

  // console.log('serverside props: ', JSON.parse(programsProps));
  // const programs = JSON.parse(programsProps);

  return (
    <Layout>
      <Container size="md" style={{ padding: 0 }}>
        <Title order={2} align="center" my={22}>
          My Programs
        </Title>

        {user && programs.length > 0 && <ProgramList programsProps={programs} />}
      </Container>
    </Layout>
  );
}
// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   try {
//     const collectionRef = collection(db, 'programs');
//     const q = query(
//       collectionRef,
//       where('author.uid', '==', user_id),
//       orderBy('createdDate', 'desc')
//     );
//     const querySnapshot = await getDocs(q);
//     let programs: any = [];
//     querySnapshot.forEach((doc) => {
//       programs.push({
//         ...doc.data(),
//         id: doc.id,
//         created: doc.data().createdDate.toDate().getTime(),
//         updated: doc.data().updatedDate.toDate().getTime(),
//       });
//     });

//     return {
//       props: {
//         programsProps: JSON.stringify(programs) || [],
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     context.res.writeHead(302, {
//       Location: `/refresh`,
//     });
//     context.res.end();
//     return {
//       props: {} as never,
//     };
//     // return {
//     //   redirect: {
//     //     destination: '/login',
//     //     permanent: false,
//     //   },
//     // };
//   }
// };
