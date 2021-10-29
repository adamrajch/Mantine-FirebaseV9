import {
  AppShell,
  Box,
  Burger,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import React, { useState } from 'react';
import ColorModeSwitch from '../ColorModeSwitch';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ base: 250, breakpoints: { sm: '100%', lg: 300 } }}
        >
          <Group position="center" direction="column">
            <Text component="a" href="/programs">
              Programs
            </Text>
          </Group>
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
      {children}
    </AppShell>
  );
}
