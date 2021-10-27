import { Group, Text, Title } from '@mantine/core';
import { collection, onSnapshot, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
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
      console.log(programs);
    }
  }, [programs]);
  return (
    <Group direction="column" spacing={2}>
      {programs.length > 0 &&
        programs.map((p: any) => (
          <Group direction="column" key={p.id} spacing={0}>
            <Link href={`programs/${p.id}`}>
              <Title order={1}>{p.data.title}</Title>
            </Link>
            <Text>Created {new Date(p.data.createdDate * 1000).toLocaleDateString()}</Text>

            <Text mx={0}>
              {`Level: `}
              {p.data.experience.map((e: string, i: number) => (
                <Text key={e} component="span" mx={2}>
                  {e}
                  {i < p.data.experience.length - 1 && ','}
                </Text>
              ))}
            </Text>
            <Text mx={0}>
              {`Discipline: `}
              {p.data.category.map((e: string, i: number) => (
                <Text key={e} component="span" mx={2}>
                  {e}
                  {i < p.data.category.length - 1 && ','}
                </Text>
              ))}
            </Text>
            {p.data.periodization.length > 0 && (
              <Text>
                {`Periodization: `}
                {p.data.periodization.map((x: string, i: number) => (
                  <Text component="span" mx={2} key={x}>
                    {x}
                    {i < p.data.periodization.length - 1 && ','}
                  </Text>
                ))}
              </Text>
            )}
          </Group>
        ))}
    </Group>
  );
}
