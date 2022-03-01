import { Container } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function HomePageContainter({ children }: Props) {
  const { height, width } = useViewportSize();
  const headerHeight = 60;
  const mainHeight = height - headerHeight;
  return (
    <Container size="xl" style={{ minHeight: mainHeight }}>
      {children}
    </Container>
  );
}
