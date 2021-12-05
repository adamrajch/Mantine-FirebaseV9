import { Badge, Box, Card, Group, Image, Text, Title, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function ProgramCard({ program }: any): ReactElement {
  const theme = useMantineTheme();
  const { data, id } = program;
  console.log(data);
  //   const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
        width: 320,
        border: '3px solid transparent',
        borderRadius: theme.radius.md,
        // cursor: 'pointer',
        shadow: 'sm',
        // '&:hover': {
        //   backgroundColor:
        //     theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
        // },
      })}
    >
      <Card
        padding="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
          borderRadius: theme.radius.md,

          // '&:hover': {
          //   backgroundColor:
          //     theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
          // },
        })}
      >
        <Card.Section>
          <Image
            src="https://www.azquotes.com/public/pictures/authors/0e/f4/0ef4077945e46669c370cf432451c563/547c4207ef872_ronnie_coleman.jpg"
            // height={160}
            alt="Norway"
          />
        </Card.Section>
        <Group direction="column" spacing={2} key={id}>
          <Link href={`programs/${id}`}>
            <Title order={3} style={{ cursor: 'pointer' }}>
              {data.template.title}
            </Title>
          </Link>
          <Link href={`/dashboard/users/${data.author?.uid}`}>
            <Text size="sm" color="cyan" style={{ cursor: 'pointer' }}>
              {data.author?.name}
            </Text>
          </Link>

          <Group position="left" noWrap spacing={4}>
            {data.template.experience.map((e: string, i: number) => (
              <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size="xs">
                {e}
              </Badge>
            ))}
          </Group>

          <Group position="left" spacing={2}>
            {data.template.category.map((e: string, i: number) => (
              <Badge
                variant="outline"
                gradient={{ from: 'indigo', to: 'cyan' }}
                size="xs"
                radius={2}
              >
                {e}
              </Badge>
            ))}
          </Group>
          <Group position="left" noWrap>
            {data.template.periodization.map((e: string, i: number) => (
              <Badge
                variant="outline"
                gradient={{ from: 'indigo', to: 'cyan' }}
                size="xs"
                radius={2}
              >
                {e}
              </Badge>
            ))}
          </Group>
          <Group position="left" style={{ flex: '1 0 auto' }}>
            <Text size="xs">Likes</Text>
            <Text size="xs">Comments</Text>
            <Text size="xs">Save</Text>
            <Text size="xs">Report</Text>
          </Group>
        </Group>
      </Card>
    </Box>
  );
}
