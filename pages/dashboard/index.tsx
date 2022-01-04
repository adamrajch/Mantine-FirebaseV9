import React from 'react';
import ActiveProgramList from '../../components/activePrograms/ActiveProgramList';
import Layout from '../../components/dashboard/AppShell';
import { useAuth } from '../../context/auth';

export default function DashboardHome(): JSX.Element {
  const { user, loading } = useAuth();
  return (
    <Layout>
      Dahboard Home
      {user && <ActiveProgramList />}
    </Layout>
  );
}
