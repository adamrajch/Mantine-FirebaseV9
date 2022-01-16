import { Button, Group, Select } from '@mantine/core';
import React, { ReactElement, useEffect, useState } from 'react';
import CreateWorkoutForm from './CreateWorkoutForm';

export default function WorkoutContainer({ user }: any): ReactElement {
  const [sesh, setSesh] = useState<any>(null);
  const [text, setText] = useState<any>(null);
  const data = user.subscribedPrograms.map((p) => {
    return { value: p.programTitle, label: p.programTitle, ...p };
  });
  useEffect(() => {
    console.log(sesh);
  }, [sesh]);
  console.log(text);
  return (
    <div>
      <Group grow>
        <Select
          data={data}
          placeholder="Select Program"
          value={text}
          onChange={(q) => {
            let selected = data.filter((p: any) => p.value === q);
            setText(selected[0].value);
            setSesh(selected[0]);
          }}
        />
        <Button variant="outline" onClick={() => setSesh('custom')}>
          Custom Workout
        </Button>
      </Group>
      <pre>{JSON.stringify(sesh)}</pre>

      <CreateWorkoutForm user={user} />
    </div>
  );
}
