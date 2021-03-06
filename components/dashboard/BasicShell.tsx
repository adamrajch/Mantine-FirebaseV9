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
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useAuth } from '../../context/auth';
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
  const router = useRouter();
  const mainHeight = height - 60;
  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint={10000}
      fixed
      navbar={
        <Navbar
          // padding="md"
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
          {/* <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Navbar.Section>
              <Group position="left" direction="column" spacing={0}>
                {headerLinks.map((g) => (
                  <NavBarLink key={g.href} href={g.href} title={g.title} />
                ))}
              </Group>
            </Navbar.Section>
          </MediaQuery> */}

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
                  <Avatar size="sm" src={user.photoUrl} alt="user" />
                  <Link href="/dashboard/profile">
                    <Text
                      size="sm"
                      style={{
                        flex: 1,
                        overflowX: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {user.name ? user.name : user.email}
                    </Text>
                  </Link>

                  <ActionIcon
                    onClick={() => {
                      signout(), router.push('/');
                    }}
                  >
                    <AiOutlineLogout />
                  </ActionIcon>
                </Group>
              </div>
            ) : (
              <Group position="apart" noWrap>
                <NavBarLink
                  key="afk"
                  href="/login"
                  title="Login"
                  Component={
                    user ? (
                      <ActionIcon>
                        <AiOutlineLogout />
                      </ActionIcon>
                    ) : null
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
          // padding={12}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
          })}
        >
          <Group position="center" style={{ height: '100%' }} my={0} noWrap>
            {/* <MediaQuery smallerThan="md" styles={{ display: 'none' }}> */}
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
            {/* </MediaQuery> */}
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
              {/* <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Group noWrap>
                    {headerLinks.map((g) => (
                      <NavBarLink key={g.href} href={g.href} title={g.title} />
                    ))}
                  </Group>
                </MediaQuery>
              </div> */}
            </Box>
          </Group>
        </Header>
      }
    >
      <div
        // className="app-wrap"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {children}
        <Footer />
      </div>
    </AppShell>
  );
}
