import { Button, Group, Select } from '@mantine/core';
import { default as router, default as Router } from 'next/router';
import React, { ReactElement, useState } from 'react';

export default function WorkoutContainer({ user, program }: any): ReactElement {
  const [sesh, setSesh] = useState<any>(null);
  const [text, setText] = useState<any>(null);
  const data = user.subscribedPrograms.map((p: any) => {
    return { value: p.programTitle, label: p.programTitle, ...p };
  });

  return (
    <div>
      <Group grow direction="column">
        <Select
          data={data}
          placeholder="Select Program"
          value={text}
          nothingFound="No programs"
          onChange={(q) => {
            let selected = data.filter((p: any) => p.value === q);
            const subbedId = `${selected[0].userId}-${selected[0].programId}`;
            Router.push(`/dashboard/activity/${subbedId}`);
          }}
        />
        <Button variant="outline" onClick={() => router.push('/dashboard/post')}>
          Custom Workout
        </Button>
      </Group>
    </div>
  );
}
