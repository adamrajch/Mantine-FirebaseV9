import { Button, Center, Container, Group, Text, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import React from 'react';

export default function HomePage(): JSX.Element {
  const { height, width } = useViewportSize();
  const headerHeight = 60;
  const mainHeight = height - headerHeight;
  return (
    <Group direction="column" position="center" grow>
      <Container size="lg">
        <Center style={{ width: '100%', height: mainHeight }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 44,
            }}
          >
            <Title
              order={1}
              align="center"
              sx={(theme) => ({
                fontSize: 64,
                letterSpacing: 2,
                [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
                  fontSize: 42,
                },
              })}
            >
              Perfect Fitness and Strength Training for All Athletes
            </Title>
            <Text
              align="center"
              sx={(theme) => ({
                fontSize: 22,
                letterSpacing: 2,
                [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
                  fontSize: 14,
                },
              })}
            >
              No more Excel, PDFs, and composition notebooks. Periodize allows you to browse and
              dynamically create training programs with a set of features to customize and track
              your performance.
            </Text>

            <Group
              position="center"
              sx={(theme) => ({
                flexDirection: 'column',
                width: '90%',
                margin: 'auto',
                [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                  flexDirection: 'row',
                },
              })}
              grow
            >
              <Button variant="outline" style={{ width: '100%' }} component="a" href="/programs">
                Find Programs
              </Button>

              <Button
                variant="gradient"
                color="cyan"
                style={{ width: '100%' }}
                component="a"
                href="/dashboard/create"
              >
                Create
              </Button>
            </Group>
          </div>
        </Center>
      </Container>
    </Group>
  );
}
