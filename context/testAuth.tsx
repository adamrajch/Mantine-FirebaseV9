import { doc } from '@firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getDoc, onSnapshot } from 'firebase/firestore';
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
  const [profile, setProfile] = useState<any>(null);

  const createUserWithEmail = (email: string, password: string) => {
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

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      const formattedUser = await formatUser(rawUser);
      const { token, ...userWithoutToken } = formattedUser;
      const docRef = doc(db, 'users', formattedUser.uid);
      const docSnap = await getDoc(docRef);
      //check if user exists, set the user or if it doesnt create one
      if (!docSnap.exists()) {
        createUser(formattedUser.uid, userWithoutToken);
      }

      setProfile(formattedUser);
      nookies.set(undefined, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
    } else {
      setProfile(null);
      nookies.set(undefined, 'token', '', { path: '/' });
    }
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (authUser) => {
      handleUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsub;
    if (profile) {
      unsub = onSnapshot(doc(db, 'users', profile.uid), (doc) => {
        setUser(doc.data());
      });
    } else {
      setUser(null);
    }
    setLoading(false);
    return unsub;
  }, [profile]);

  //refrsh firebase token
  useEffect(() => {
    const handle = setInterval(async () => {
      const tokenUser = auth.currentUser;
      if (tokenUser) await tokenUser.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return {
    user,
    profile,
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
