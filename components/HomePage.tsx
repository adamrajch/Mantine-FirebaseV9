import { Box, Button, Group, Text, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import React from 'react';

export default function HomePage(): JSX.Element {
  const { height, width } = useViewportSize();
  const headerHeight = 60;
  const mainHeight = height - headerHeight;
  return (
    <Group direction="column" position="left" grow>
      <Box
        sx={(theme) => ({
          width: 550,
          marginRight: 62,
          marginLeft: 62,
          marginTop: 160,
          [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
            width: 370,
            marginRight: 16,
            marginLeft: 16,
          },
        })}
      >
        <Group direction="column" position="left" grow>
          <Title
            order={2}
            sx={(theme) => ({
              fontSize: 54,
              letterSpacing: 2,
              [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
                fontSize: 36,
              },
            })}
          >
            Perfect Training For All Athletes
          </Title>
          <Text
            sx={(theme) => ({
              fontSize: 18,
              letterSpacing: 2,
              [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
                fontSize: 14,
              },
            })}
          >
            No more Excel, PDFs, and composition notebooks.
            <br /> <br />
            Browse programs or create your own. Subscribe to various programs to organize your
            training and log progress
          </Text>

          <Group position="left" noWrap grow>
            <Button variant="outline" component="a" href="/programs">
              Find Programs
            </Button>

            <Button variant="gradient" color="cyan" component="a" href="/dashboard/create">
              Create
            </Button>
          </Group>
        </Group>
      </Box>
    </Group>
  );
}
