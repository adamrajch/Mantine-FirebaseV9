import { Button, Group, Modal, SimpleGrid, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useAuth } from '../../context/auth';
import { auth } from '../../firebase';

const AuthContent = ({ form, type, onSubmit, ...rest }: any) => {
  const { signInWithGoogle } = useAuth();
  return (
    <Group direction="column" position="center" grow {...rest}>
      {/* <Title>Periodize</Title> */}
      <form onSubmit={onSubmit}>
        <div
          style={{
            borderRadius: 10,
          }}
        >
          <SimpleGrid cols={1}>
            <Title align="center">Login</Title>
            <TextInput
              type="email"
              label="email"
              required
              name="email"
              value={form.values.email}
              onChange={(e) => form.setFieldValue('email', e.target.value)}
            />
            <TextInput
              type="password"
              label="password"
              required
              name="pass"
              value={form.values.pass}
              onChange={(e) => form.setFieldValue('pass', e.target.value)}
            />
            <Group position="apart">
              <Link href="/signup">
                <Text size="sm" style={{ cursor: 'pointer' }}>
                  Create an account
                </Text>
              </Link>
              <Link href="/forgot-password">
                <Text size="sm" style={{ cursor: 'pointer' }}>
                  Forgot Password?
                </Text>
              </Link>
            </Group>
            <Button variant="outline" type="submit">
              Submit
            </Button>
            <Group>
              <Button
                variant="outline"
                leftIcon={<AiOutlineGoogle />}
                onClick={() => signInWithGoogle('/dashboard')}
              >
                Google
              </Button>
            </Group>
          </SimpleGrid>
        </div>
      </form>
    </Group>
  );
};

const FullScreenAuth = ({ type, onSubmit }: any) => {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  return (
    <Group direction="column" style={{ height: '100vh' }}>
      <AuthContent
        as="form"
        form={form}
        onSubmit={() => onSubmit(form.values)}
        type={type}
        w="100%"
      />
    </Group>
  );
};

const AuthModal = ({ isOpen, onClose, type, onSubmit }: any) => {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  return (
    <>
      <Modal opened={isOpen} onClose={onClose}>
        <AuthContent form={form} onSubmit={() => onSubmit(form.values)} />
      </Modal>
    </>
  );
};

export const WithAuthModal = (Component: any) => (props: any) => {
  const [opened, setOpened] = useState(false);
  const { signInWithEmail } = useAuth();
  const notifications = useNotifications();
  type SignUpProps = {
    email: string;
    pass: string;
  };
  const signUp = ({ email, pass }: SignUpProps) => {
    signInWithEmail(auth, email, pass)
      .then(() => {
        notifications.showNotification({
          title: 'Login Successfully',
          message: 'Hey there, you are now logged in!',
        });
        setOpened(false);
      })
      .catch((error: any) => {
        notifications.showNotification({
          title: 'An error occured',
          message: error.message,
        });

        console.log(error);
      });
  };

  return (
    <>
      <AuthModal
        isOpen={opened}
        onClose={() => setOpened(false)}
        type="Sign Up"
        onSubmit={signUp}
      />
      <Component openAuthModal={setOpened} {...props} />
    </>
  );
};
//route after login
export const withSignInRedirect = (Component: any) => (props: any) => {
  const notifications = useNotifications();
  const [opened, setOpened] = useState(false);
  const auth = useAuth();
  type SignUpProps = {
    email: string;
    pass: string;
  };
  const router = useRouter();

  const signIn = ({ email, pass }: SignUpProps) => {
    auth
      .signin(email, pass)
      .then(() => {
        router.push('/dashboard');
      })
      .catch((error: any) => {
        notifications.showNotification({
          title: 'An error occured',
          message: error.message,
        });
      });
  };

  return (
    <>
      <AuthModal isOpen={opened} onClose={setOpened} type="Sign In" onSubmit={signIn} />
      <Component onSignIn={setOpened(true)} {...props} />
    </>
  );
};

export default FullScreenAuth;
