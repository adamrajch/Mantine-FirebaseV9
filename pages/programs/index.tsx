import { Container, Group, SimpleGrid, Title } from '@mantine/core';
import React, { ReactElement } from 'react';
import Layout from '../../components/dashboard/AppShell';
import ProgramListCard from '../../components/programs/ProgramListCard';
export default function ProgramFeed(): ReactElement {
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
      color: '#4b3097',
    },
  ];
  const expPages = [
    {
      title: 'Beginner',
      href: '/programs/exp/beginner',
      text: '< 1 year experience, a noob',
      color: '#3a6972',
    },
    {
      title: 'Intermediate',
      href: '/programs/exp/intermediate',
      text: 'Ready for more intensity and volume and has a decent foundation',
      color: '#2c7988',
    },
    {
      title: 'Advanced',
      href: '/programs/exp/advanced',
      text: '5+ years training, not as easy to progress linearly',
      color: '#058ca7',
    },
  ];

  return (
    <Layout>
      <Container size="lg" padding={0}>
        <Title order={1} align="center" mb={20}>
          Find Programs
        </Title>
        {/* <ProgramsNav /> */}
        <Group direction="column">
          <Title order={2}>Category</Title>
          <SimpleGrid
            spacing="lg"
            breakpoints={[
              { minWidth: 'sm', cols: 1, spacing: 'sm' },
              { minWidth: 'md', cols: 2, spacing: 'lg' },
              { minWidth: 1200, cols: 3, spacing: 'lg' },
            ]}
          >
            {pages.map((page) => {
              return <ProgramListCard page={page} key={page.href} />;
            })}
          </SimpleGrid>

          <Title order={2}>Experience</Title>
          <SimpleGrid
            breakpoints={[
              { minWidth: 'sm', cols: 1, spacing: 'sm' },
              { minWidth: 'md', cols: 2, spacing: 'lg' },
              { minWidth: 1200, cols: 3, spacing: 'lg' },
            ]}
          >
            {expPages.map((page) => {
              return <ProgramListCard page={page} key={page.href} />;
            })}
          </SimpleGrid>
        </Group>
      </Container>
    </Layout>
  );
}
