import { Center, Loader } from '@mantine/core';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import AuthService from '../service/AuthService';
import AuthStateChanged from './AuthStateChanged';

type Props = {
  children?: React.ReactNode;
};

const AuthContext = createContext<any>({});
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    // return auth.onIdTokenChanged(async (user) => {
    //   if (!user) {
    //     console.log('no user');
    //     setUser(null);
    //     setLoading(false);
    //     // nookies.destroy(undefined, 'token');
    //     return;
    //   }

    //   const token = await user.getIdToken();
    //   setUser(user);
    //   setLoading(false);
    //   nookies.set(undefined, 'token', token, { maxAge: 30 * 24 * 60 * 60 });
    //   console.log(user);
    // });
    AuthService.waitForUser((userCred: any) => {
      setUser(userCred);
      setLoading(false);
    });
  }, []);

  const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user ?? null);
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
        setError(error.message);
        // ...
      });
  };
  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  if (loading) {
    return (
      <Center style={{ height: '100%' }}>
        <Loader color="cyan" variant="bars" />
      </Center>
    );
  }
  const value = { user, error, loginWithGoogle, logout, setUser };

  return (
    <AuthContext.Provider value={value}>
      <AuthStateChanged>{children}</AuthStateChanged>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
