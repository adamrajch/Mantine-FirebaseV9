import { Container } from '@mantine/core';
import React, { ReactElement } from 'react';
import Layout from '../../components/dashboard/AppShell';
import FullProgramForm from '../../components/programs/FullProgramForm';

export default function Create(): ReactElement {
  return (
    <Layout>
      <Container></Container>

      <FullProgramForm />
    </Layout>
  );
}
