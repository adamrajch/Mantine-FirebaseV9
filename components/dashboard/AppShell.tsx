import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Divider,
  Group,
  Header,
  Menu,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillEdit, AiOutlineLogout } from 'react-icons/ai';
import { MdSettings } from 'react-icons/md';
import { useAuth } from '../../context/auth';
import NavBarLink from '../NavBarLink';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};
const generalLinks = [
  { href: '/programs', title: 'Programs' },
  // {
  //   href: '/library',
  //   title: 'Library',
  // },
  { href: '/basics', title: 'Learn Basics' },
];
const userLinks = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/dashboard/post', title: 'Add Workout' },
  { href: '/dashboard/create', title: 'Create Program' },
  { href: '/dashboard/myprograms', title: 'My Programs' },
  // { href: '/dashboard/journal', title: 'Journal' },
];

export default function Layout({ children }: Props) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { user, signout } = useAuth();
  const { height, width } = useViewportSize();
  const headerHeight = 60;
  const mainHeight = height - headerHeight;
  const router = useRouter();
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
          width={{ sm: 200, lg: 240 }}
          sx={(theme) => ({
            borderRight: '1px solid',
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[5],
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
          <Divider my="sm" />
          {user ? (
            <Navbar.Section grow>
              <Group position="left" direction="column" spacing={0}>
                {userLinks.map((g) => (
                  <NavBarLink key={g.href} href={g.href} title={g.title} />
                ))}
              </Group>
            </Navbar.Section>
          ) : (
            <Navbar.Section grow>
              <div></div>
            </Navbar.Section>
          )}

          <Navbar.Section>
            {user ? (
              <div>
                <Divider my="sm" />
                <Group position="apart" noWrap spacing={1}>
                  <Avatar size="sm" src={user.photoUrl} alt="user" />
                  <Link href="/dashboard/profile">
                    <Text
                      size="sm"
                      style={{
                        cursor: 'pointer',
                        flex: 1,
                        overflowX: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {user.name ? user.name : user.email}
                    </Text>
                  </Link>
                  <Menu
                    control={
                      <ActionIcon>
                        <MdSettings />
                      </ActionIcon>
                    }
                  >
                    <Menu.Item
                      icon={<AiFillEdit />}
                      onClick={() => {
                        router.push('/dashboard/profile');
                      }}
                      sx={(theme) => ({
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: theme.colors.gray[6],
                          color: theme.colors.cyan[6],
                        },
                      })}
                    >
                      Edit Profile
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      icon={<AiOutlineLogout />}
                      onClick={() => {
                        signout(), router.push('/');
                      }}
                    >
                      Logout
                    </Menu.Item>
                  </Menu>
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
          height={headerHeight}
          padding="md"
          sx={(theme) => ({
            borderBottom: '1px solid',
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5],
          })}
        >
          <Group position="center" style={{ height: '100%' }} my={0} noWrap>
            {/* <MediaQuery smallerThan="sm" styles={{ display: 'none' }}> */}
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
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            minHeight: mainHeight,
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
