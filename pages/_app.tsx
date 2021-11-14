import { ColorScheme, ColorSchemeProvider, MantineProvider, NormalizeCSS } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import GlobalStyle from '../components/GlobalStyles';
import { AuthProvider } from '../context/auth';
export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <>
      <Head>
        <title>Periodize</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          emotionOptions={{ key: 'mantine', prepend: false }}
          theme={{
            colorScheme: 'dark',
            primaryColor: 'cyan',
            fontFamily: 'Verdana, sans-serif',
            fontFamilyMonospace: 'Monaco, Courier, monospace',
            headings: { fontFamily: 'Greycliff CF, sans-serif' },
          }}
          styles={{
            Box: {
              root: {
                width: '100%',
              },
            },
            Group: {
              root: {
                padding: 0,
                margin: 0,
              },
            },
          }}
        >
          <NormalizeCSS />
          <GlobalStyle />
          <NotificationsProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
