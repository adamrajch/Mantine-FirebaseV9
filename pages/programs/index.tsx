import { Group, Text, Title } from '@mantine/core';
import { collection, onSnapshot, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/dashboard/AppShell';
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
      <Group direction="column" spacing={2}>
        {programs.length > 0 &&
          programs.map((p: any) => (
            <Group direction="column" key={p.id} spacing={0}>
              <Link href={`programs/${p.id}`}>
                <Title order={1}>{p.data.template.title}</Title>
              </Link>

              <Text mx={0}>
                {`Level: `}
                {p.data.template.experience.map((e: string, i: number) => (
                  <Text key={e} component="span" mx={2}>
                    {e}
                    {i < p.data.template.experience.length - 1 && ','}
                  </Text>
                ))}
              </Text>
              <Text mx={0}>
                {`Discipline: `}
                {p.data.template.category.map((e: string, i: number) => (
                  <Text key={e} component="span" mx={2}>
                    {e}
                    {i < p.data.template.category.length - 1 && ','}
                  </Text>
                ))}
              </Text>
              {p.data.template.periodization.length > 0 && (
                <Text>
                  {`Periodization: `}
                  {p.data.template.periodization.map((x: string, i: number) => (
                    <Text component="span" mx={2} key={x}>
                      {x}
                      {i < p.data.template.periodization.length - 1 && ','}
                    </Text>
                  ))}
                </Text>
              )}
            </Group>
          ))}
      </Group>
    </Layout>
  );
}
