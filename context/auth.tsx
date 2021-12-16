import { doc } from '@firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import router from 'next/router';
import nookies from 'nookies';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { createUser } from '../hooks/createUser';

type Props = {
  children?: React.ReactNode;
};

const AuthContext = createContext<any>({});

export function AuthProvider({ children }: Props) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      //check if user exists, set the user or if it doesnt create one
      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data());
        setUser(docSnap.data());
      } else {
        createUser(user.uid, userWithoutToken);
        setUser(user);
      }

      nookies.set(undefined, 'token', user.token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      setLoading(false);
      return user;
    } else {
      setUser(false);
      nookies.set(undefined, 'token', '', { path: '/' });

      setLoading(false);
      return false;
    }
  };

  const createUserWithEmail = (email: string, password: string) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        handleUser(userCredential.user);
        router.push('/dashboard');
        return user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        return errorMessage;
        // ..
      });
  };

  const signinWithEmail = (email: string, password: string) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        handleUser(userCredential.user);
        router.push('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage, errorCode);
      });
  };

  const signinWithGoogle = (redirect: any) => {
    setLoading(true);

    return signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          router.push(redirect);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  };

  const signout = () => {
    router.push('/');

    return signOut(auth)
      .then(() => {
        console.log('sucessfully logged out');
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      handleUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);

      //   .then(function (idToken) {
      //   console.log('refreshed');
      //   nookies.set(undefined, 'token', idToken, { maxAge: 30 * 24 * 60 * 60, path: '/' });
      // });
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return {
    user,
    loading,
    signinWithEmail,
    signinWithGoogle,
    createUserWithEmail,
    signout,
  };
}
const formatUser = async (user: any) => {
  const token = await user.getIdToken(true);
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  };
};
