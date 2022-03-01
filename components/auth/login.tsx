import { Button, Center, Group, SimpleGrid, Text, TextInput, Title } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Formik } from 'formik';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import * as Yup from 'yup';
import { auth } from '../../firebase';
import HomePageContainter from '../homePages/HomePageContainter';
const provider = new GoogleAuthProvider();
const SignUpSchema = Yup.object().shape({
  email: Yup.string().min(2, 'Too Short!').max(40, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(40, 'Too Long!').required('Required'),
});
export default function Login(): JSX.Element {
  const notifications = useNotifications();

  const router = useRouter();
  function SignInButton() {
    const signInWithGoogle = async () => {
      await signInWithPopup(auth, provider)
        .then((result) => {
          Router.push('/dashboard');
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error.message);

          notifications.showNotification({
            title: 'Login Error',
            message: `${error.message}🤥`,
          });
        });
    };

    return (
      <>
        <Button variant="outline" leftIcon={<AiOutlineGoogle />} onClick={signInWithGoogle}>
          Google
        </Button>

        {/* <Button variant="outline" onClick={() => signInAnonymously(auth)}>
          Sign in Anonymously
        </Button> */}
      </>
    );
  }

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <HomePageContainter>
      <Center style={{ width: '100%', height: '100%' }}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            // signinWithEmail(values.email, values.password);
            signInWithEmailAndPassword(auth, values.email, values.password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                router.push('/dashboard');
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                notifications.showNotification({
                  title: 'Login Error',
                  message: `${error.message}🤥`,
                });
              });
          }}
          enableReinitialize={false}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={SignUpSchema}
        >
          {({ handleSubmit, handleChange, errors }) => (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Group
                grow
                position="center"
                direction="column"
                sx={(theme) => ({
                  padding: 16,
                  borderRadius: theme.radius.md,

                  // minWidth: 500,
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
                  boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #02455f',
                  '&:hover': {
                    boxShadow: '12px 12px 16px  #0f0f0f, -2px -2px 6px #14698b',
                  },

                  // '@media (max-width: 755px)': {
                  //   minWidth: 380,
                  // },
                })}
              >
                <SimpleGrid cols={1}>
                  <Title align="center">Login</Title>
                  <TextInput
                    type="email"
                    label="email"
                    required
                    name="email"
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <TextInput
                    type="password"
                    label="password"
                    required
                    name="password"
                    onChange={handleChange}
                    error={errors.password}
                  />
                  <Group position="apart">
                    <NextLink href="/signup">
                      <Text size="sm" style={{ cursor: 'pointer' }}>
                        Create an account
                      </Text>
                    </NextLink>
                    <NextLink href="/forgot-password">
                      <Text size="sm" style={{ cursor: 'pointer' }}>
                        Forgot Password?
                      </Text>
                    </NextLink>
                  </Group>
                  <Button variant="outline" type="submit">
                    Submit
                  </Button>
                  <Group>
                    <SignInButton />
                  </Group>
                </SimpleGrid>
              </Group>
            </form>
          )}
        </Formik>
      </Center>
    </HomePageContainter>
  );
}
