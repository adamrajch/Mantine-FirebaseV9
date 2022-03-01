import { Global } from '@mantine/core';
import React, { ReactElement } from 'react';

export default function GlobalStyle(): ReactElement {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          minHeight: '100vh',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight,
          '::-webkit-scrollbar': {
            width: 6,
          },

          /* Track */
          '::-webkit-scrollbar-track': {
            background: theme.colors.dark[8],
          },

          /* Handle */
          '::-webkit-scrollbar-thumb': {
            background: '#0f8bb1 ',
            borderRadius: '20',
          },

          /* Handle on hover */
          '::-webkit-scrollbar-thumb:hover': {
            background: '#10dbf6 ',
          },
        },

        div: {
          //   height: '100%',
        },
        [`#__next`]: {
          minHeight: '100vh',
          height: '100%',
        },
        [`.full`]: {
          height: '100%',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      })}
    />
  );
}
