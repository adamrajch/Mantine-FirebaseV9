import { Center, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import AuthService from '../service/AuthService';
import { useAuth } from './auth';
export default function AuthStateChanged({ children }: any) {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.waitForUser((userCred: any) => {
      setUser(userCred);
      //   const token = userCred.getIdToken();
      //   setUser(user);
      //   setLoading(false);
      //   nookies.set(undefined, 'token', token, { maxAge: 30 * 24 * 60 * 60 });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Center style={{ height: '100%' }}>
        <Loader color="cyan" variant="bars" />
      </Center>
    );
  }

  return children;
}
