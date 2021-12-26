import { collection, orderBy, query, where } from '@firebase/firestore';
import { Container, Group, Title } from '@mantine/core';
import { onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/dashboard/AppShell';
import Loader from '../../components/Loader';
import ProgramList from '../../components/programs/ProgramList';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
export default function MyPrograms({ programsProps }: any): JSX.Element {
  const [programs, setPrograms] = useState<Array<any>>([]);
  const [programLoading, setProgramLoading] = useState<boolean>(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    getPrograms();

    console.log(user);
  }, [user, loading]);

  async function getPrograms() {
    if (!user) {
      return;
    }

    const collectionRef = collection(db, 'programs');
    const q = query(
      collectionRef,
      where('author.uid', '==', user.uid),
      orderBy('createdDate', 'desc')
    );
    // const querySnapshot = await getDocs(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPrograms(
        querySnapshot.docs.map((d) => {
          const docObj = {
            id: d.id,
            ...d.data(),
            created: d.data().createdDate.toDate().getTime(),
            updated: d.data().updatedDate.toDate().getTime(),
          };
          return docObj;
        })
      );
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
        <Group position="center" direction="column" grow>
          {loading && <Loader />}
          {!loading && programs.length > 0 && <ProgramList programsProps={programs} />}
          {!loading && !programs.length && <div>No programs! </div>}
        </Group>
      </Container>
    </Layout>
  );
}
// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   try {
//     const cookies = nookies.get(context);
//     const token = await verifyIdToken(cookies.token);

//     const { user_id } = token;

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
