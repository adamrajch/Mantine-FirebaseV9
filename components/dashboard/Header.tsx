import { Box, Burger, Group, Header, MediaQuery, Text, useMantineTheme } from '@mantine/core';
import React, { ReactElement, useState } from 'react';
import { useAuth } from '../../context/auth';
import ColorModeSwitch from '../ColorModeSwitch';
import NavBarLink from '../NavBarLink';

interface Props {}
const headerLinks = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/about', title: 'About' },
];
export default function HeaderComponent(): ReactElement {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();
  const theme = useMantineTheme();
  return (
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
            component="a"
            href="/"
          >
            Periodize
          </Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {headerLinks.map((g) => (
              <NavBarLink key={g.href} href={g.href} title={g.title} />
            ))}

            <ColorModeSwitch />
          </div>
        </Box>
      </Group>
    </Header>
  );
}
