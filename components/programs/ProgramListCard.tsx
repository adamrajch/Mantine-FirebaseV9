import { Paper, Text, ThemeIcon, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { AiOutlineTrophy } from 'react-icons/ai';

export default function ProgramListCard({ page }: any): JSX.Element {
  return (
    <Link href={page.href} key={page.href}>
      <Paper
        key={page.href}
        padding="md"
        withBorder
        component="a"
        sx={(theme) => ({
          border: '2px solid ',
          cursor: 'pointer',
          width: '100%',
          borderColor: theme.colors.dark[8],
          borderRadius: theme.radius.md,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
          boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
          '&:hover': {
            boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
          },
        })}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title order={2} style={{ color: page.color }}>
            {page.title}
          </Title>
          {page.title === 'Featured' ? (
            <ThemeIcon variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              <AiOutlineTrophy />
            </ThemeIcon>
          ) : null}
        </div>
        <Text size="sm" my={8}>
          {page.text}
        </Text>
      </Paper>
    </Link>
  );
}
