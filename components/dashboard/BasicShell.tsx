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
import { useViewportSize } from '@mantine/hooks';
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
const headerLinks = [{ href: '/dashboard', title: 'Dashboard' }];
const generalLinks = [
  { href: '/programs', title: 'Programs' },
  { href: '/basics', title: 'Learn Basics' },
];
const userLinks = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/dashboard/create', title: 'Create Program' },
  { href: '/dashboard/myprograms', title: 'My Programs' },
];

export default function BasicShell({ children }: Props) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { user, signout } = useAuth();
  const { height, width } = useViewportSize();
  const mainHeight = height - 60;
  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint={10000}
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint={10000000}
          hidden={!opened}
          width={{ sm: 200, lg: 230 }}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
          })}
        >
          <Navbar.Section>
            <Group position="left" direction="column" spacing={0}>
              {generalLinks.map((g) => (
                <NavBarLink key={g.href} href={g.href} title={g.title} />
              ))}
            </Group>
          </Navbar.Section>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Divider my="sm" />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Navbar.Section>
              <Group position="left" direction="column" spacing={0}>
                {headerLinks.map((g) => (
                  <NavBarLink key={g.href} href={g.href} title={g.title} />
                ))}
              </Group>
            </Navbar.Section>
          </MediaQuery>

          {/* <Divider my="sm" /> */}
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
                  <Avatar size="md" src={user.photoUrl} alt="user" />
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
        <Header
          height={60}
          padding="md"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
          })}
        >
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
                component="a"
                href="/"
              >
                Periodize
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Group noWrap>
                    {headerLinks.map((g) => (
                      <NavBarLink key={g.href} href={g.href} title={g.title} />
                    ))}
                  </Group>
                </MediaQuery>
                <ColorModeSwitch />
              </div>
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
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
            borderTop: '1px solid  ',
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
            padding: '5px 10px 50px 10px',
            flex: '1 0 auto',
            minHeight: mainHeight,
          })}
        >
          {children}
        </Box>
        <Footer />
      </div>
    </AppShell>
  );
}
