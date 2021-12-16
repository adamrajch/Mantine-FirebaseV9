import { collection, getDocs, orderBy, query, where } from '@firebase/firestore';
import { Button, Center, Container, Group, Title } from '@mantine/core';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import nookies from 'nookies';
import React from 'react';
import Layout from '../../components/dashboard/AppShell';
import ProgramList from '../../components/programs/ProgramList';
import { db } from '../../firebase';
import { verifyIdToken } from '../../firebaseAdmin';
export default function MyPrograms({ programsProps }: any): JSX.Element {
  // const [programs, setPrograms] = useState<Array<any>>([]);
  // const [programLoading, setProgramLoading] = useState<boolean>(true);
  // const { user, loading } = useAuth();

  // useEffect(() => {
  //   getPrograms();

  //   console.log(user);
  // }, [user, loading]);

  // async function getPrograms() {
  //   if (!user) {
  //     return;
  //   }

  //   const q = query(
  //     collection(db, 'programs'),
  //     where('author.uid', '==', user.uid),
  //     orderBy('updatedDate', 'desc')
  //   );

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     setPrograms(
  //       querySnapshot.docs.map((d) => {
  //         const docObj = {
  //           id: d.id,
  //           data: d.data(),
  //           created: d.data().createdDate.toDate().getTime(),
  //           updated: d.data().updatedDate.toDate().getTime(),
  //         };
  //         return docObj;
  //       })
  //     );
  //   });
  //   setProgramLoading(false);
  //   return unsubscribe;
  // }

  // console.log('serverside props: ', JSON.parse(programsProps));
  const programs = JSON.parse(programsProps);

  return (
    <Layout>
      <Container size="md" style={{ padding: 0 }}>
        <Title order={2} align="center" my={22}>
          My Programs
        </Title>
        <Group position="center" direction="column" grow>
          {programs.length > 0 ? <ProgramList programsProps={programs} /> : null}
          {programs.length < 1 ? (
            <Center style={{ height: '60vh', width: '100%' }}>
              <Group direction="column" grow>
                <Title order={3} align="center" my={20}>
                  You haven't made any programs yet!
                </Title>
                <Link href="/basics">
                  <Button variant="outline" fullWidth>
                    Learn
                  </Button>
                </Link>

                <Link href="/dashboard/create">
                  <Button variant="filled" fullWidth color="cyan">
                    Create A Program
                  </Button>
                </Link>
              </Group>
            </Center>
          ) : null}
        </Group>
      </Container>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);

    const { uid } = token;

    const collectionRef = collection(db, 'programs');
    const q = query(collectionRef, where('author.uid', '==', uid), orderBy('createdDate', 'desc'));
    const querySnapshot = await getDocs(q);
    let programs: any = [];
    querySnapshot.forEach((doc) => {
      programs.push({
        ...doc.data(),
        id: doc.id,
        created: doc.data().createdDate.toDate().getTime(),
        updated: doc.data().updatedDate.toDate().getTime(),
      });
    });

    return {
      props: {
        programsProps: JSON.stringify(programs) || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
