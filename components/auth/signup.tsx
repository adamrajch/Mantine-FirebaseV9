import { Button, Center, Group, Text, TextInput, Title } from '@mantine/core';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Formik } from 'formik';
import NextLink from 'next/link';
import Router from 'next/router';
import React, { ReactElement } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import * as Yup from 'yup';
import { useAuth } from '../../context/auth';
import { auth } from '../../firebase';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().min(2, 'Too Short!').max(40, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(40, 'Too Long!').required('Required'),
});
export default function SignUp({}: any): ReactElement {
  const { signinWithGoogle } = useAuth();
  const provider = new GoogleAuthProvider();

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

        {/* <Button variant="outline" onClick={() => signInAnonymously(auth)}>
          Sign in Anonymously
        </Button> */}
      </>
    );
  }

  return (
    <Center style={{ height: '100%', width: '100%' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              Router.push('/dashboard');
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage, errorCode);
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
                minWidth: 500,
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
                boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #02455f',
                '&:hover': {
                  boxShadow: '12px 12px 16px  #0f0f0f, -2px -2px 6px #14698b',
                },

                '@media (max-width: 755px)': {
                  minWidth: 380,
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
  );
}
