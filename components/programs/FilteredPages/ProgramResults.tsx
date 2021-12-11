import { SimpleGrid } from '@mantine/core';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import ProgramCard from '../ProgramCard';

interface Props {
  field: string;
  search: string;
}

export default function ProgramResults({ field, search }: Props): JSX.Element {
  const [programs, setPrograms] = useState<any>([]);
  useEffect(() => {
    const q = query(collection(db, 'programs'), where(field, 'array-contains', search));
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

  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: 'sm', cols: 1, spacing: 'sm' },
        { minWidth: 'md', cols: 2, spacing: 'lg' },
        { minWidth: 1200, cols: 3, spacing: 'lg' },
      ]}
    >
      {programs.length > 0 && programs.map((p: any) => <ProgramCard program={p} key={p.id} />)}
    </SimpleGrid>
  );
}
