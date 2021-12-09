import React, { ReactElement } from 'react';
import Layout from '../../components/dashboard/AppShell';
import FullProgramForm from '../../components/programs/FullProgramForm';
import { useAuth } from '../../context/auth';

export default function Create(): ReactElement {
  const { user, loading } = useAuth();
  return <Layout>{user && !loading ? <FullProgramForm user={user} /> : null}</Layout>;
}
