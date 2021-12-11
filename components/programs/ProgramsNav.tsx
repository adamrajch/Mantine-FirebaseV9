import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
const links = [
  {
    href: '/programs/category/featured',
    title: 'Featured',
  },
  {
    href: '/programs/category/powerlifting',
    title: 'Powerlifting',
  },
  {
    href: '/programs/category/bodybuilding',
    title: 'Bodybuilding',
  },
  {
    href: '/programs/category/olylifting',
    title: 'Olympic Weightlifters',
  },
  {
    href: '/programs/category/sport',
    title: 'Sport',
  },
  {
    href: '/programs/category/mobility',
    title: 'Mobility',
  },
];

export default function ProgramsNav(): JSX.Element {
  return (
    <Group position="center" my={20}>
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          <Text
            component="a"
            style={{ cursor: 'pointer' }}
            sx={(theme) => ({
              borderBottom: '1px solid transparent',
              padding: '4px 8px',

              '&:hover': {
                borderColor: theme.colors.gray[6],
              },
            })}
          >
            {link.title}
          </Text>
        </Link>
      ))}
    </Group>
  );
}
