import {
  Box,
  Button,
  Col,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  foot: {
    // position: 'fixed',
    borderTop: '1px solid gray',
    flexShrink: 0,
    width: '100%',
    padding: `${theme.spacing.xl}px 0px`,
    backgroundColor: theme.colors.dark[8],
  },
}));
export default function Footer(): JSX.Element {
  const { classes } = useStyles();
  return (
    <Box className={classes.foot}>
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
                  <Text>
                    What features can be improved and what are you looking forward to see?
                  </Text>
                  <Button variant="outline">Leave Feedback</Button>
                </Group>
              </Col>
            </Grid>

            <div style={{ width: '100%' }}>
              <Divider />
            </div>
            <Group position="left">
              <Text size="xs" align="left">
                Built different by Adam Rajchwald
              </Text>
            </Group>
          </Group>
        </Container>
      </Group>
    </Box>
  );
}
