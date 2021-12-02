import Head from 'next/head';
import ColorModeSwitch from '../components/ColorModeSwitch';
import Layout from '../components/dashboard/AppShell';
import { useAuth } from '../context/auth';

export default function Home() {
  const { user, loading } = useAuth();
  console.log(user);
  console.log(loading);
  return (
    <>
      <Head>
        <title>Periodize</title>
        <meta name="description" content="PReriodize Mantine w/ Firebase" />
      </Head>
      <Layout>
        <ColorModeSwitch />
      </Layout>
    </>
  );
}
