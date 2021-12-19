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
          borderRadius: theme.radius.sm,
          cursor: 'pointer',
          width: '100%',
          borderColor: theme.colors.dark[8],
          backgroundColor: theme.colors.dark[8],
          boxShadow: '12px 12px 24px  #0a0d0f, ',
          '&:hover': {
            // borderColor: '#F08C00',
            // ' -webkit-box-shadow': '6px 6px 12px #b2b8c9, -6px -6px 12px #f0f8ff',
            boxShadow: '12px 12px 24px  #0a0d0f, -2px -2px 6px #174e68 ',
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
