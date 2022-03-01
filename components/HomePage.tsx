import { Button, Grid, Group, Image, Text, Title } from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import React from 'react';

export default function HomePage(): JSX.Element {
  const { height, width } = useViewportSize();
  const headerHeight = 60;
  const mainHeight = height - headerHeight;
  const matches = useMediaQuery('(min-width: 1200px)');
  return (
    <Grid justify="center" align="center" style={{ height: '100%' }} gutter={0}>
      <Grid.Col span={10} lg={6}>
        <Group direction="column" position="left" grow>
          <Title
            order={2}
            sx={(theme) => ({
              fontSize: 54,
              letterSpacing: 2,
              [`@media (max-width:  ${theme.breakpoints.md}px)`]: {
                fontSize: 44,
              },
              [`@media (max-width:  ${theme.breakpoints.sm}px)`]: {
                fontSize: 30,
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
                fontSize: 12,
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
              Programs
            </Button>

            <Button variant="gradient" color="cyan" component="a" href="/dashboard/create">
              Create
            </Button>
          </Group>
        </Group>
      </Grid.Col>
      <Grid.Col span={10} lg={6}>
        <Image
          src="/fitnessapp.svg"
          height={matches ? 600 : 300}
          fit="contain"
          alt="fitness girl"
          // sx={(theme) => ({
          //   '@media (mmin-width: 1200px)': {
          //     height: '100px',
          //   },
          // })}
        />
      </Grid.Col>
    </Grid>
  );
}
