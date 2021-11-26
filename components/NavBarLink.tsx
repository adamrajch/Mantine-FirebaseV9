import { Box } from '@mantine/core';
import React, { ReactElement } from 'react';

type Props = {
  href: string;
  title: string;
};

export default function NavBarLink({ href, title }: Props): ReactElement {
  return (
    <Box
      component="a"
      href={href}
      sx={(theme) => ({
        width: '100%',

        padding: 12,
        borderRadius: 8,
        borderColor: theme.colors.gray[8],
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[5],
        },
      })}
    >
      {title}
    </Box>
  );
}
