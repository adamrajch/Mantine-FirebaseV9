import { Box, Group, Title } from '@mantine/core';
import React, { ReactElement, useEffect, useState } from 'react';

interface Props {
  user: any;
}

export default function HistoryList({ user }: Props): ReactElement {
  const [workouts, setWorkous] = useState<any>([]);
  useEffect(() => {}, []);
  return (
    <Box
      sx={(theme) => ({
        flexGrow: 1,
        padding: 8,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
        boxShadow: '16px 16px 22px  #0f0f0f, -4px -4px 6px #1b3742',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.dark[1],
          boxShadow: '16px 16px 22px  #0f0f0f, -4px -4px 6px #1b3742',
        },
      })}
    >
      <Title order={2} align="center">
        Workouts
      </Title>
      <Group direction="column" grow>
        {workouts.map((w: any) => (
          <div>{w.name}</div>
        ))}
      </Group>
    </Box>
  );
}
