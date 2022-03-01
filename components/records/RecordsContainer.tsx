import { Container, Table } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
export default function RecordsContainer({ records }: any) {
  const [date, setDate] = useState<boolean>(false);
  dayjs.extend(relativeTime);

  return (
    <Container size="lg" my={25}>
      {records.length > 0 ? (
        <Table highlightOnHover striped>
          <thead>
            <tr>
              <th>Lift</th>
              <th onClick={() => setDate(!date)}>Date</th>
              <th>Weight </th>
              <th>Sets</th>
              <th>Reps</th>
              <th>RPE</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r: any, ri: number) => (
              <tr key={r.rid}>
                <td>{r.name}</td>
                <td>
                  {date
                    ? dayjs(new Date(r.date.toDate())).fromNow()
                    : dayjs(r.date.toDate()).format('MM/DD/YYYY')}
                </td>

                <td>{r.records.load || '-'}</td>
                <td>{r.records.sets}</td>
                <td>{r.records.reps}</td>
                <td>{r.records.rpe || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        'none!'
      )}
    </Container>
  );
}
