import Head from 'next/head';
import BasicShell from '../components/dashboard/BasicShell';
import HomePage from '../components/HomePage';
import About from '../components/homePages/About';
import HomePageContainter from '../components/homePages/HomePageContainter';
export default function Home() {
  // const { user, loading } = useAuth();

  return (
    <>
      <Head>
        <title>Periodize</title>
        <meta name="description" content="Periodize Home" />
      </Head>
      <BasicShell>
        <HomePageContainter>
          <HomePage />
        </HomePageContainter>
        <HomePageContainter>
          <About />
        </HomePageContainter>
      </BasicShell>
    </>
  );
}
