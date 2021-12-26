import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import GlobalStyle from '../components/GlobalStyles';
import Loader from '../components/Loader';
import { AuthProvider } from '../context/auth';
export default function App(props: AppProps) {
  const [loading, setLoading] = useState(false);
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });
  const matches = useMediaQuery('(min-width: 900px)');
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
            colorScheme: colorScheme,
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
            Title: {
              root: {
                color: colorScheme === 'dark' ? 'white' : 'black',
              },
            },
            Button: {
              // root: { color: colorScheme === 'dark' ? 'white' : 'black' },
              oultine: {
                color: colorScheme === 'dark' ? 'cyan' : 'black',
              },
            },
            Container: {
              root: {
                paddingRight: matches ? 'md' : 6,
                paddingLeft: matches ? 'md' : 6,
              },
            },
          }}
          withNormalizeCSS
        >
          <ModalsProvider>
            <GlobalStyle />
            <NotificationsProvider>
              <AuthProvider>{loading ? <Loader /> : <Component {...pageProps} />}</AuthProvider>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
