import {
  Badge,
  Box,
  Card,
  Group,
  Text,
  ThemeIcon,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { AiOutlineTrophy } from 'react-icons/ai';
import { handleCatColor, handleExpColor, handlePColor } from '../../utils/ColorHelper';

export default function ProgramCard({ program, id }: any): ReactElement {
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const p = program;

  const colors = colorScheme.colorScheme;
  const isDark = colors === 'dark';
  // console.log('program card data ', program);
  //   const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <Box
      sx={(theme) => ({
        border: '1px solid cyan',
        borderRadius: theme.radius.md,
        backgroundImage: `url(${p.photoUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',

        shadow: 'sm',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.cyan[8] : theme.colors.cyan[1],
        },
      })}
    >
      <Card
        padding="md"
        shadow="md"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
          borderRadius: theme.radius.md,
          opacity: 0.95,
          background: 'rgba( 3, 3, 3, 0.9 )',
          boxShadow: '0 3px 14px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: ' blur( 8px )',
          '-webkit-backdrop-filter': 'blur( 4px )',
          height: '100%',
          border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
          },
        })}
      >
        {/* <Card.Section>
          <ErrorImage src={p.photoUrl} height={180} />
        </Card.Section> */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 5 }}>
          <Group position="apart" noWrap spacing={0} style={{ padding: 0 }}>
            <Link href={`/programs/${id}`}>
              <Text style={{ cursor: 'pointer', color: 'white', fontSize: 20 }} my={0}>
                {p.title}
              </Text>
            </Link>
            {p.featured ? (
              <ThemeIcon variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                <AiOutlineTrophy />
              </ThemeIcon>
            ) : null}
          </Group>

          <Link href={`/dashboard/users/${p.author?.uid}`}>
            <Text size="sm" color="cyan" style={{ cursor: 'pointer' }}>
              <Text component="span" style={{ color: 'white' }}>
                Author:{' '}
              </Text>
              {p.author?.name}
            </Text>
          </Link>

          <Group position="left" noWrap spacing={4}>
            {p.template.experience.map((e: string, i: number) => {
              return (
                <Badge color={handleExpColor(e)} size="sm" key={e}>
                  {e}
                </Badge>
              );
            })}
          </Group>

          <Group position="left" spacing={4}>
            {p.template.category.sort().map((e: string, i: number) => {
              return (
                <Badge variant="filled" color={handleCatColor(e)} size="md" radius={2} key={e}>
                  {e}
                </Badge>
              );
            })}
          </Group>
          <Group position="left" noWrap spacing={4}>
            {p.template.periodization.sort().map((e: string, i: number) => (
              <Badge variant="outline" color={handlePColor(e)} size="md" radius={2} key={e}>
                {e}
              </Badge>
            ))}
          </Group>
          {/* <Group position="left" style={{ flex: '1 0 auto' }}>
            <Text size="xs">Likes</Text>
            <Text size="xs">Comments</Text>
          </Group> */}
        </div>
      </Card>
    </Box>
  );
}
