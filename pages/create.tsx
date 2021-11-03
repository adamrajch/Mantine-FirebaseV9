import React, { ReactElement } from 'react';
import Layout from '../components/dashboard/AppShell';
import FullProgramForm from '../components/programs/FullProgramForm';

export default function ProgramFeed(): ReactElement {
  return (
    <Layout>
      <FullProgramForm />
    </Layout>
  );
}
