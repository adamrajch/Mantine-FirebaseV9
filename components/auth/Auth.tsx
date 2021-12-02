import { Button, Group, Modal, SimpleGrid, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useAuth } from '../../context/auth';
import { NextLink } from '../NextLink';

const AuthContent = ({ register, errors, type, ...rest }) => (
  <Group direction="column" {...rest}>
    <Title>Periodize</Title>
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
            <Button
              variant="outline"
              leftIcon={<AiOutlineGoogle />}
              onClick={() => signinWithGoogle('/dashboard')}
            >
              Google
            </Button>
          </Group>
        </SimpleGrid>
      </div>
    </form>
  </Group>
);

const FullScreenAuth = ({ type, onSubmit }) => {
  const { colorMode } = useColorMode();
  const { handleSubmit, register, errors } = useForm();

  return (
    <Group direction="column" style={{ height: '100vh' }}>
      <AuthContent
        as="form"
        backgroundColor={['none', colorMode === 'light' ? 'gray.100' : 'gray.900']}
        borderRadius={8}
        errors={errors}
        maxWidth="400px"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        px={8}
        py={12}
        register={register}
        shadow={[null, 'md']}
        spacing={3}
        type={type}
        w="100%"
      />
    </Group>
  );
};

const AuthModal = ({ isOpen, onClose, type, onSubmit }) => {
  const { handleSubmit, register, errors } = useForm();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="400px">
      <ModalOverlay />
      <ModalContent borderRadius={4}>
        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" justify="center">
            <AuthContent
              as="form"
              errors={errors}
              onSubmit={handleSubmit((data) => onSubmit(data))}
              px={8}
              py={12}
              register={register}
              spacing={3}
              type={type}
              w="100%"
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const withAuthModal = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();
  const toast = useToast();

  const signUp = ({ email, pass }) => {
    auth
      .signup(email, pass)
      .then(() => {
        toast({
          title: 'Success! 🍻',
          description: 'Your account has been created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <AuthModal isOpen={isOpen} onClose={onClose} type="Sign Up" onSubmit={signUp} />
      <Component openAuthModal={onOpen} {...props} />
    </>
  );
};

export const withSignInRedirect = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();

  const signIn = ({ email, pass }) => {
    auth
      .signin(email, pass)
      .then(() => {
        router.push('/deals');
      })
      .catch((error) => {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <AuthModal isOpen={isOpen} onClose={onClose} type="Sign In" onSubmit={signIn} />
      <Component onSignIn={onOpen} {...props} />
    </>
  );
};

export default FullScreenAuth;
