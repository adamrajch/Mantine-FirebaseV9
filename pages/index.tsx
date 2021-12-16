import Head from 'next/head';
import BasicShell from '../components/dashboard/BasicShell';
import HomePage from '../components/HomePage';

export default function Home() {
  // const { user, loading } = useAuth();

  return (
    <>
      <Head>
        <title>Periodize</title>
        <meta name="description" content="PReriodize Mantine w/ Firebase" />
      </Head>
      <BasicShell>
        <HomePage />
      </BasicShell>
    </>
  );
}
