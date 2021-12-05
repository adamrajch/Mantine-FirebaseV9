import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Divider,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useAuth } from '../../context/auth';
import ColorModeSwitch from '../ColorModeSwitch';
import NavBarLink from '../NavBarLink';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};
const generalLinks = [
  { href: '/programs', title: 'Programs' },
  { href: '/basics', title: 'Learn Basics' },
  { href: '/faq', title: 'FAQ' },
  { href: '/about', title: 'About' },
];
const userLinks = [
  { href: '/dashboard/create', title: 'Create Program' },
  { href: '/dashboard/myprograms', title: 'My Programs' },
  { href: '/dashboard/schedule', title: 'Schedule' },
  { href: '/dashboard/journal', title: 'Journal' },
];

export default function Layout({ children }: Props) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { user, signout } = useAuth();

  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 250 }}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[7],
          })}
        >
          <Navbar.Section>
            <Group position="left" direction="column" spacing={0}>
              {generalLinks.map((g) => (
                <NavBarLink key={g.href} href={g.href} title={g.title} />
              ))}
            </Group>
          </Navbar.Section>
          <Divider my="sm" />
          <Navbar.Section grow>
            {user ? (
              <Group position="left" direction="column" spacing={0}>
                {userLinks.map((g) => (
                  <NavBarLink key={g.href} href={g.href} title={g.title} />
                ))}
              </Group>
            ) : null}
          </Navbar.Section>
          <Navbar.Section>
            {user ? (
              <div>
                <Divider my="sm" />
                <Group position="center" noWrap>
                  <Avatar size="md" src={user.photoURL} alt="user" />
                  <Link href="/dashboard/profile">
                    <Text size="sm" style={{ cursor: 'pointer' }}>
                      {user.name ? user.name : user.email}
                    </Text>
                  </Link>

                  <ActionIcon onClick={() => signout()}>
                    <AiOutlineLogout />
                  </ActionIcon>
                </Group>
              </div>
            ) : (
              <Group position="apart" noWrap>
                <NavBarLink
                  key="afk"
                  href="/signup"
                  title="Login"
                  Component={
                    <ActionIcon>
                      <AiOutlineLogout />
                    </ActionIcon>
                  }
                />
              </Group>
            )}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} padding="md">
          <Group position="center" style={{ height: '100%' }} my={0} noWrap>
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Box
              sx={() => ({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              })}
            >
              <Text
                size="xl"
                weight={700}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              >
                Periodize
              </Text>
              <Group>
                <ColorModeSwitch />
              </Group>
            </Box>
          </Group>
        </Header>
      }
    >
      <div
        className="app-wrap"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.dark[7],

            padding: '20px 10px 200px 10px',
            flex: '1 0 auto',
          })}
        >
          {children}
        </Box>
        <Footer />
      </div>
    </AppShell>
  );
}
