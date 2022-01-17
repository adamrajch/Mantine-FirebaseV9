import { ActionIcon, Box, Group, Text, Title } from '@mantine/core';
import { ExternalLinkIcon } from '@modulz/radix-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import React, { ReactElement } from 'react';
interface Props {
  user: any;
}

export default function HistoryList({ user }: Props): ReactElement {
  dayjs.extend(relativeTime);

  return (
    <Box
      sx={(theme) => ({
        padding: 16,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
        boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
        '&:hover': {
          boxShadow: '8px 8px 18px  #0f0f0f, -2px -2px 6px #14698b',
        },
      })}
    >
      <Group position="apart">
        <Title order={2} align="center">
          Recent Workouts
        </Title>
        <Link href={`/dashboard/workouts/`}>
          <Group
            spacing={0}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: '#14b8f8',
                textDecoration: 'underline',
              },
            }}
          >
            <Text
              size="xs"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: '#14b8f8',
                  textDecoration: 'underline',
                },
              }}
            >
              See all{' '}
            </Text>
            <ActionIcon>
              <ExternalLinkIcon />
            </ActionIcon>
          </Group>
        </Link>
      </Group>

      <Group direction="column" grow my={12}>
        {user.recentWorkouts.map((w: any) => (
          <Box>
            <Group position="apart">
              <Link href={`/dashboard/workouts/${w.id}`}>
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
                  {`${w.name} `}
                  {w.programTitle ? `(${w.programTitle})` : ''}
                </Text>
              </Link>

              <Text color="dimmed" size="sm">
                {dayjs(w.date.toDate()).fromNow()}
              </Text>
            </Group>
          </Box>
        ))}
      </Group>
    </Box>
  );
}
