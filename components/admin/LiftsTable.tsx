import { Table } from '@mantine/core';
import React from 'react';
import LiftRow from './LiftRow';

type Props = {
  lifts: any;
  search: string;
};

interface DBLift {
  id: string;
  value: string;
  name: string;
  label: string;
}
export default function LiftsTable({ lifts, search }: Props) {
  const filtered = lifts
    .sort((a: DBLift, b: DBLift) => {
      return a.value.localeCompare(b.value);
    })
    .filter((l: DBLift) => l.value.includes(search));
  return (
    <Table highlightOnHover striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((l: any, li: number) => (
          <LiftRow key={l.id} id={l.id} value={l.value} lifts={lifts} />
        ))}
      </tbody>
    </Table>
  );
}
