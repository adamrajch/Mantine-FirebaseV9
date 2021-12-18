import { ActionIcon, Group, Menu, Text } from '@mantine/core';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
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
    href: '/programs/category/weightlifting',
    title: 'Weightlifting',
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
const expLinks = [
  {
    href: '/programs/exp/beginner',
    title: 'Beginner',
  },
  {
    href: '/programs/exp/intermediate',
    title: 'Intermediate',
  },
  {
    href: '/programs/exp/advanced',
    title: 'Advanced',
  },
];
export default function ProgramsNav(): JSX.Element {
  return (
    <Group position="center" my={20} spacing={2}>
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          <Text
            component="a"
            sx={(theme) => ({
              borderBottom: '1px solid transparent',
              padding: '4px 8px',
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.colors.gray[6],
                color: theme.colors.cyan[6],
              },
            })}
          >
            {link.title}
          </Text>
        </Link>
      ))}
      <Menu
        control={
          <Text
            sx={(theme) => ({
              borderBottom: '1px solid transparent',
              padding: '4px 8px',
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.colors.gray[6],
                color: theme.colors.cyan[6],
              },
            })}
          >
            Experience{' '}
          </Text>
        }
      >
        {expLinks.map((exp) => (
          <Menu.Item
            key={exp.href}
            onClick={() => router.push(exp.href)}
            sx={(theme) => ({
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.colors.gray[6],
                color: theme.colors.cyan[6],
              },
            })}
          >
            {exp.title}
          </Menu.Item>
        ))}
      </Menu>
      <ActionIcon>
        <AiOutlineSearch />
      </ActionIcon>
    </Group>
  );
}
