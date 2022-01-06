import { ActionIcon, Box, Button, Group, Title } from '@mantine/core';
import router from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { BiLinkExternal } from 'react-icons/bi';

export default function ActiveProgramList({ user }: any): ReactElement {
  useEffect(() => {}, []);

  async function fetchActivePrograms() {}
  return (
    <Box>
      <Title order={2}>Active Programs</Title>
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
