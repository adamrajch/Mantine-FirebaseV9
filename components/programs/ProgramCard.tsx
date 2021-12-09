import {
  Badge,
  Box,
  Card,
  Group,
  Image,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { AiOutlineTrophy } from 'react-icons/ai';
import { handleCatColor, handleExpColor, handlePColor } from '../../utils/ColorHelper';

export default function ProgramCard({ program }: any): ReactElement {
  const theme = useMantineTheme();
  const { data, id } = program;
  console.log('picture ', data.template.photoUrl);
  //   const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
        // width: 320,
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
        padding="md"
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
            src={
              data.template.photoUrl
                ? data.photoUrl
                : 'https://www.azquotes.com/public/pictures/authors/0e/f4/0ef4077945e46669c370cf432451c563/547c4207ef872_ronnie_coleman.jpg'
            }
            height={280}
            alt="program picture"
          />
        </Card.Section>
        <Group direction="column" spacing={1} key={id} grow style={{ height: 200, marginTop: 10 }}>
          <Group position="apart">
            <Link href={`programs/${id}`}>
              <Title order={2} style={{ cursor: 'pointer' }}>
                {data.template.title}
              </Title>
            </Link>
            <ThemeIcon variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              <AiOutlineTrophy />
            </ThemeIcon>
          </Group>

          <Link href={`/dashboard/users/${data.author?.uid}`}>
            <Text size="sm" color="cyan" style={{ cursor: 'pointer' }}>
              {data.author?.name}
            </Text>
          </Link>

          <Group position="left" noWrap spacing={4}>
            {data.template.experience.map((e: string, i: number) => {
              return (
                <Badge color={handleExpColor(e)} size="md" key={e}>
                  {e}
                </Badge>
              );
            })}
          </Group>

          <Group position="left" spacing={2}>
            {data.template.category.map((e: string, i: number) => {
              return (
                <Badge variant="filled" color={handleCatColor(e)} size="md" radius={2} key={e}>
                  {e}
                </Badge>
              );
            })}
          </Group>
          <Group position="left" noWrap>
            {data.template.periodization.map((e: string, i: number) => (
              <Badge variant="outline" color={handlePColor(e)} size="md" radius={2} key={e}>
                {e}
              </Badge>
            ))}
          </Group>
          <Group position="left" style={{ flex: '1 0 auto' }}>
            <Text size="xs">Likes</Text>
            <Text size="xs">Comments</Text>
          </Group>
        </Group>
      </Card>
    </Box>
  );
}
