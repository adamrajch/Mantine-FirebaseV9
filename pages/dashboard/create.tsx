import { Container, Title } from '@mantine/core';
import React, { ReactElement } from 'react';
import Layout from '../../components/dashboard/AppShell';
import FullProgramForm from '../../components/programs/FullProgramForm';

export default function Create(): ReactElement {
  return (
    <Layout>
      <Container>
        <Title align="center">Create Your Program</Title>
      </Container>

      <FullProgramForm />
    </Layout>
  );
}
