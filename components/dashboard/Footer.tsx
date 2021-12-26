import { Box, Button, Col, Container, Divider, Grid, Group, Text, Title } from '@mantine/core';
import React from 'react';

export default function Footer(): JSX.Element {
  return (
    <Box
      sx={(theme) => ({
        borderTop: '1px solid  ',
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[5],
        flexShrink: 0,
        width: '100%',
        padding: `${theme.spacing.xl}px 0px`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
      })}
    >
      <Group position="center">
        <Container size="md">
          <Group direction="column" align="apart" grow>
            <Grid>
              <Col span={12} md={6}>
                <Group direction="column">
                  <Title order={3}>Periodize</Title>
                  <Text>The perfect training program awaits you</Text>
                </Group>
              </Col>
              <Col span={6} md={3}>
                <Group direction="column" align="left">
                  <Title order={3}>Project</Title>
                  <Text>About</Text>
                  <Text>Creator</Text>
                </Group>
              </Col>

              <Col span={6} md={3}>
                <Group direction="column" align="left">
                  <Title order={3}>Feedback</Title>
                  <Text>What features do you want to see?</Text>
                  <Button variant="outline">Leave Feedback</Button>
                </Group>
              </Col>
            </Grid>

            <div style={{ width: '100%' }}>
              <Divider />
            </div>
            <Group position="left">
              <Text
                size="xs"
                align="left"
                variant="gradient"
                gradient={{ from: 'cyan', to: 'blue', deg: 45 }}
              >
                🔨 Built different by Adam Rajchwald
              </Text>
            </Group>
          </Group>
        </Container>
      </Group>
    </Box>
  );
}
