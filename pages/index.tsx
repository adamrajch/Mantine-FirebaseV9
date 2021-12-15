import Head from 'next/head';
import BasicShell from '../components/dashboard/BasicShell';
import HomePage from '../components/HomePage';
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
      <BasicShell>
        <HomePage />
      </BasicShell>
    </>
  );
}
