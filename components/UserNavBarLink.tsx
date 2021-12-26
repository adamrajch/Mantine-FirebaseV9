import { Box, Group, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { WithAuthModal } from './auth/Auth';

type Props = {
  href: string;
  title: string;
  Component?: any;
};

function UserNavBarLink({ href, title, Component }: Props): ReactElement {
  const router = useRouter();
  return (
    <Box
      component="a"
      href={href}
      sx={(theme) => ({
        width: '100%',
        backgroundColor: router.pathname === href ? theme.colors.dark[6] : '',
        backgroundImage:
          router.pathname === href ? 'linear-gradient(to right, #2896aa , #064862)' : '',
        padding: 12,
        borderRadius: 8,
        borderColor: theme.colors.gray[8],
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[3],
        },
      })}
    >
      <Group position="apart">
        <Text>{title}</Text>
        {Component}
      </Group>
    </Box>
  );
}
export default WithAuthModal(UserNavBarLink);
