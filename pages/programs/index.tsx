import { Group, Title } from '@mantine/core';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import { db } from '../../firebase';
export default function ProgramFeed(): ReactElement {
  const [programs, setPrograms] = useState<any>([]);
  useEffect(() => {
    const q = query(collection(db, `programs`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setPrograms(
        querySnapshot.docs.map((d) => {
          //   const docObj = {
          //     id: d.id,
          //     title: d.data().title,
          //     data: d.data(),
          //   };
          return d.data();
        })
      );
    });
    return unsub;
  }, []);

  useEffect(() => {
    console.log(programs);
  }, [programs]);
  return (
    <Group direction="column" spacing={2}>
      {programs.map((program: any) => (
        <Group key={program.id}>
          <Title order={4}>{program.title}</Title>
        </Group>
      ))}
    </Group>
  );
}
