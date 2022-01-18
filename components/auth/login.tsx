import { Button, Center, Group, SimpleGrid, Text, TextInput, Title } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { GoogleAuthProvider, signInAnonymously, signInWithPopup } from 'firebase/auth';
import { Formik } from 'formik';
import NextLink from 'next/link';
import Router from 'next/router';
import React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import * as Yup from 'yup';
import { useAuth } from '../../context/auth';
import { auth } from '../../firebase';
const provider = new GoogleAuthProvider();
const SignUpSchema = Yup.object().shape({
  email: Yup.string().min(2, 'Too Short!').max(40, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(40, 'Too Long!').required('Required'),
});
export default function Login(): JSX.Element {
  const { user } = useAuth();

  // const loginWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       // const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // ...
  //       setUser(user);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       setError(errorMessage);
  //       // ...
  //     });
  // };
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
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // setError(errorMessage);
          // // ...
        });
    };

    return (
      <>
        <Button variant="outline" leftIcon={<AiOutlineGoogle />} onClick={signInWithGoogle}>
          Google
        </Button>

        <Button variant="outline" onClick={() => signInAnonymously(auth)}>
          Sign in Anonymously
        </Button>
      </>
    );
  }
  const initialValues = {
    email: '',
    password: '',
  };
  const notifications = useNotifications();
  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          // signinWithEmail(values.email, values.password);
        }}
        enableReinitialize={false}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SignUpSchema}
      >
        {({ handleSubmit, handleChange, errors }) => (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                border: '1px solid white',

                padding: 25,
                borderRadius: 10,
                minHeight: '40vh',
              }}
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
            </div>
          </form>
        )}
      </Formik>
    </Center>
  );
}
