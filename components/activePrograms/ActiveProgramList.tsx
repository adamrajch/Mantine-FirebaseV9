import { Box, Button, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import router from 'next/router';
import React, { ReactElement } from 'react';

export default function ActiveProgramList({ user }: any): ReactElement {
  return (
    <Box
      sx={(theme) => ({
        padding: 16,
        borderRadius: theme.radius.md,

        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
        boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
        '&:hover': {
          boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
        },
        height: 300,
      })}
    >
      <Title order={3} align="center">
        Active Programs
      </Title>
      <Group direction="column" grow>
        {user.subscribedPrograms.length > 0 ? (
          user.subscribedPrograms.map((p: any) => (
            <Group position="apart" grow key={p.programId} my={12}>
              <Link href={`/dashboard/activity/${user.uid}-${p.programId}`}>
                <Text
                  weight={500}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#14b8f8',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {p.programTitle}
                </Text>
              </Link>
            </Group>
          ))
        ) : (
          <Group direction="column" grow>
            <Text>You are not subscribed to any programs</Text>
            <Group position="center">
              <Button variant="outline" onClick={() => router.push('/programs')}>
                Search Programs
              </Button>
            </Group>
          </Group>
        )}
      </Group>
    </Box>
  );
}
