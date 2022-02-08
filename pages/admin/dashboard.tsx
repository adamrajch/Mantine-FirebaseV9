import { Container, Group, TextInput, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import AddLiftForm from '../../components/admin/AddLiftForm';
import LiftsTable from '../../components/admin/LiftsTable';
import Layout from '../../components/dashboard/AppShell';
import { useLiftsData } from '../../context/LiftsListContext';

export default function AdminDashboard() {
  const { lifts, loading } = useLiftsData();
  const [search, setSearch] = useState<string>('');
  useEffect(() => {
    console.log('global lifts: ', lifts);
  }, [lifts]);

  return (
    <Layout>
      <Container>
        <Group direction="column" position="center">
          <Title>Admin Dashboard</Title>

          <TextInput
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />

          <AddLiftForm />

          {lifts && lifts?.length > 0 && <LiftsTable search={search} lifts={lifts} />}
        </Group>
      </Container>
    </Layout>
  );
}
