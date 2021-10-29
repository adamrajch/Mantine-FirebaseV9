import { useNotifications } from '@mantine/notifications';
import Head from 'next/head';
import ColorModeSwitch from '../components/ColorModeSwitch';
import Layout from '../components/dashboard/AppShell';

export default function Home() {
  const notifications = useNotifications();
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
