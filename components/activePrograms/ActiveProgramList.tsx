import { ActionIcon, Box, Button, Group, Title } from '@mantine/core';
import router from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { BiLinkExternal } from 'react-icons/bi';

export default function ActiveProgramList({ user }: any): ReactElement {
  useEffect(() => {}, []);

  async function fetchActivePrograms() {}
  return (
    <Box
      sx={(theme) => ({
        flexGrow: 1,
        padding: 8,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
        boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
        '&:hover': {
          boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
        },
      })}
    >
      <Title order={2} align="center">
        Active Programs
      </Title>
      <Group direction="column" grow>
        {user.subscribedPrograms.map((p: any) => (
          <Group position="apart" grow key={p.programId}>
            <Title order={4}>{p.programTitle}</Title>
            <Group>
              <Button>UnSub</Button>
              <ActionIcon
                onClick={() => router.push(`/dashboard/activity/${user.uid}-${p.programId}`)}
              >
                <BiLinkExternal />
              </ActionIcon>
            </Group>
          </Group>
        ))}
      </Group>
    </Box>
  );
}
