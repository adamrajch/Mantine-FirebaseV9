import { signInWithPopup } from '@firebase/auth';
import { Button, Center, Group, SimpleGrid, TextInput, Title } from '@mantine/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { Formik } from 'formik';
import React, { ReactElement } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import * as Yup from 'yup';
import { auth, provider } from '../../firebase';

const SignUpSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(20, 'Too Long!').required('Required'),
});
export default function SignUp({}: any): ReactElement {
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const initialValues = {
    username: '',
    password: '',
  };
  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
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
                width: '30vw',
                padding: 25,
                borderRadius: 10,
                minHeight: '40vh',
              }}
            >
              <SimpleGrid cols={1}>
                <Title align="center">Sign Up</Title>
                <TextInput
                  type="email"
                  label="email"
                  required
                  name="username"
                  onChange={handleChange}
                  error={errors.username}
                />
                <TextInput
                  type="password"
                  label="password"
                  required
                  name="password"
                  onChange={handleChange}
                  error={errors.password}
                />
                <Button variant="outline" type="submit">
                  Submit
                </Button>
                <Group>
                  <Button
                    variant="outline"
                    leftIcon={<AiOutlineGoogle />}
                    onClick={loginWithGoogle}
                  >
                    Google
                  </Button>
                </Group>
              </SimpleGrid>
            </div>
          </form>
        )}
      </Formik>
    </Center>
  );
}
