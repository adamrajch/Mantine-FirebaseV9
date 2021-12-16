import { Container, Paper, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { AiOutlineTrophy } from 'react-icons/ai';
import Layout from '../../components/dashboard/AppShell';
export default function ProgramFeed(): ReactElement {
  // const [programs, setPrograms] = useState<any>([]);
  // useEffect(() => {
  //   const q = query(collection(db, `programs`));
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     setPrograms(
  //       querySnapshot.docs.map((d) => {
  //         const docObj = {
  //           id: d.id,
  //           data: d.data(),
  //         };
  //         return docObj;
  //       })
  //     );
  //   });
  //   return unsub;
  // }, []);

  // useEffect(() => {
  //   if (programs.length) {
  //     console.log('home programs', programs);
  //   }
  // }, [programs]);

  const pages = [
    {
      title: 'Featured',
      href: '/programs/category/featured',
      text: "The community's finest",
      color: '#0B7285',
    },
    {
      title: 'Powerlifting',
      href: '/programs/category/powerlifting',
      text: 'Squat Bench Deadlift Specific programs.  Heavier loads, lesser volume, with an emphasis on the main movements',
      color: '#E03131',
    },
    {
      title: 'Bodybuilding',
      href: '/programs/category/bodybuilding',
      text: 'Aesthetics first. Lots of volume and exercise variation. Effective at adding muscle mass ',
      color: '#2F9E44',
    },
    {
      title: 'Weightlifting',
      href: '/programs/category/weightlifting',
      text: 'Clean and Jerk and Snatch. Highly technical, expect many squats, overhead pressing movements, and singles of the main lifts',
      color: '#1971C2',
    },
    {
      title: 'Sport',
      href: '/programs/category/sport',
      text: 'Specific programs for various athletes. Power, speed, endurance, coordination, and sport specific drills',
      color: '#C2255C',
    },
    {
      title: 'Mobility',
      href: '/programs/category/mobility',
      text: ' Emphasis on strength and ability to move through a given range of motion. Mobility has huge benefit and carryover to performance in various activities',
      color: '#6741D9',
    },
  ];
  return (
    <Layout>
      <Container size="lg" padding={0}>
        <Title order={1} align="center" mb={20}>
          Find Programs
        </Title>
        {/* <ProgramsNav /> */}
        {/* <TextInput icon={<BiSearch />} placeholder="Search by title" /> */}

        <SimpleGrid
          breakpoints={[
            { minWidth: 'sm', cols: 1, spacing: 'sm' },
            { minWidth: 'md', cols: 2, spacing: 'lg' },
            { minWidth: 1200, cols: 2, spacing: 'lg' },
          ]}
        >
          {pages.map((page) => {
            return (
              <Link href={page.href}>
                <Paper
                  key={page.href}
                  padding="md"
                  shadow="md"
                  withBorder
                  component="a"
                  sx={(theme) => ({
                    border: '2px solid',
                    borderRadius: theme.radius.sm,
                    cursor: 'pointer',
                    width: '100%',
                    borderColor: page.color,
                    backgroundColor: theme.colors.dark[9],
                    '&:hover': {
                      borderColor: '#F08C00',
                      shadow: 'lg',
                    },
                  })}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Title order={2}>{page.title}</Title>
                    {page.title === 'Featured' ? (
                      <ThemeIcon variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                        <AiOutlineTrophy />
                      </ThemeIcon>
                    ) : null}
                  </div>
                  <Text size="sm" my={8}>
                    {page.text}
                  </Text>
                </Paper>
              </Link>
            );
          })}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
