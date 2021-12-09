import { Tabs, Title } from '@mantine/core';
import { ChatBubbleIcon, ImageIcon, MixerVerticalIcon } from '@modulz/radix-icons';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/dashboard/AppShell';
import FeaturedPrograms from '../../components/programs/FilteredPages/FeaturedPrograms';
import { db } from '../../firebase';
export default function ProgramFeed(): ReactElement {
  const [programs, setPrograms] = useState<any>([]);
  useEffect(() => {
    const q = query(collection(db, `programs`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setPrograms(
        querySnapshot.docs.map((d) => {
          const docObj = {
            id: d.id,
            data: d.data(),
          };
          return docObj;
        })
      );
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (programs.length) {
      console.log('home programs', programs);
    }
  }, [programs]);
  return (
    <Layout>
      <Title order={1} align="center" mb={20}>
        Programs
      </Title>
      <Tabs position="center" variant="pills" color="cyan" tabPadding="xl">
        <Tabs.Tab label="Featured" icon={<ImageIcon />}>
          <FeaturedPrograms />
        </Tabs.Tab>
        <Tabs.Tab label="Hot" icon={<ImageIcon />}>
          {/* <SimpleGrid
            breakpoints={[
              { minWidth: 'sm', cols: 1, spacing: 'sm' },
              { minWidth: 'md', cols: 2, spacing: 'lg' },
              { minWidth: 1200, cols: 3, spacing: 'lg' },
            ]}
          >
            {programs.length > 0 && programs.map((p: any) => <ProgramCard program={p} />)}
          </SimpleGrid> */}
        </Tabs.Tab>
        <Tabs.Tab label="Powerlifting" icon={<ChatBubbleIcon />}>
          Messages tab content
        </Tabs.Tab>
        <Tabs.Tab label="Bodybuilding" icon={<MixerVerticalIcon />}>
          Settings tab content
        </Tabs.Tab>
      </Tabs>
      {/* <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 1, spacing: 'sm' },
          { minWidth: 'md', cols: 2, spacing: 'lg' },
          { minWidth: 1200, cols: 3, spacing: 'lg' },
        ]}
      >
        {programs.length > 0 && programs.map((p: any) => <ProgramCard program={p} />)}
      </SimpleGrid> */}
    </Layout>
  );
}
