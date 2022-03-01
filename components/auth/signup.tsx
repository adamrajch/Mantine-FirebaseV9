import { Button, Center, Group, Text, TextInput, Title } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Formik } from 'formik';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import * as Yup from 'yup';
import { auth } from '../../firebase';
import HomePageContainter from '../homePages/HomePageContainter';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().min(2, 'Too Short!').max(40, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(40, 'Too Long!').required('Required'),
});
export default function SignUp({}: any): ReactElement {
  const notifications = useNotifications();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };
  function SignInButton() {
    const signInWithGoogle = async () => {
      await signInWithPopup(auth, provider)
        .then((result) => {
          Router.push('/dashboard');
        })
        .catch((error) => {
          console.log(error.message);
          notifications.showNotification({
            title: 'Registration Error',
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

  return (
    <HomePageContainter>
      <Center style={{ height: '100%', width: '100%' }}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
              .then((userCredential) => {
                router.push('/dashboard');
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
                notifications.showNotification({
                  title: 'Registration Error',
                  message: `${error.message}🤥`,
                });
                return errorMessage;
                // ..
              });
          }}
          enableReinitialize={false}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={SignUpSchema}
        >
          {({ handleSubmit, handleChange, errors }) => (
            <form onSubmit={handleSubmit}>
              <Group
                grow
                position="center"
                direction="column"
                sx={(theme) => ({
                  padding: 16,
                  borderRadius: theme.radius.md,
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
                  boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #02455f',
                  '&:hover': {
                    boxShadow: '12px 12px 16px  #0f0f0f, -2px -2px 6px #14698b',
                  },
                })}
              >
                <Title align="center">Sign Up</Title>
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
                  <NextLink href="/login">
                    <Text size="sm" style={{ cursor: 'pointer' }}>
                      Have account? Login
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
              </Group>
            </form>
          )}
        </Formik>
      </Center>
    </HomePageContainter>
  );
}
