import { Box, Button, Container, Group, Title } from '@mantine/core';
import React from 'react';
import Layout from '../../components/dashboard/AppShell';
import GenModalButton from '../../components/programs/forms/GenFormModal';

type Props = {};

export default function Generate({}: Props) {
  const arr = [];
  return (
    <Layout>
      <Container size="md">
        Generate Page
        <GenModalButton />
        <Box>
          <Title>Generate A Program</Title>
        </Box>
        <Box>
          <Title>Default Variants</Title>
          <Button variant="outline">Powerlifting</Button>
          <Group position="apart">
            <Button variant="outline">Weightlifting</Button>
            <Button variant="outline">Bodybuilding</Button>
          </Group>
        </Box>
        <Box>
          <Group position="apart">
            <Title>Main Movements</Title>
            <Button variant="outline">Add</Button>
          </Group>
        </Box>
        <Box>
          <Group position="apart">
            <Title>Auxillary</Title>
            <Button variant="outline">Add</Button>
          </Group>
        </Box>
      </Container>
    </Layout>
  );
}
