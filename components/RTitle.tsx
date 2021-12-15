import { Title } from '@mantine/core';
import React, { ReactElement } from 'react';

interface Props {
  text: string;
  sizes: any;
  props: any;
}

export default function RTitle({ text, sizes, ...props }: Props): ReactElement {
  return (
    <Title
      sx={(theme) => ({
        fontSize: 64,
        letterSpacing: 2,
        [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
          fontSize: 42,
        },
        [`@media (max-width:  ${theme.breakpoints.md}px)`]: {
          fontSize: 42,
        },
        [`@media (max-width:  ${theme.breakpoints.lg}px)`]: {
          fontSize: 42,
        },
        [`@media (max-width:  ${theme.breakpoints.xl}px)`]: {
          fontSize: 42,
        },
      })}
      {...props}
    >
      {text}
    </Title>
  );
}
