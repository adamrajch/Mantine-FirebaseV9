import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import router from 'next/router';
import nookies from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
// Custom hook to read  auth record and user profile doc
type Props = {
  children?: React.ReactNode;
};
const AuthContext = createContext<any>({});

export function AuthProvider({ children }: Props) {
  const auth = useUserData();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

export function useUserData() {
  const [authUser] = useAuthState(auth);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  useEffect(() => {
    async function handleUser() {
      let unsubscribe: any;
      if (authUser) {
        const formattedUser = await formatUser(authUser);
        const { token } = formattedUser;

        const ref = doc(db, 'users', authUser.uid);
        unsubscribe = onSnapshot(ref, (doc) => {
          console.log('sets user, ', doc.data());
          setUser(doc.data());
        });

        nookies.set(undefined, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
        setLoading(false);
        return unsubscribe;
      } else {
        nookies.set(undefined, 'token', '', { path: '/' });
        setUser(null);
        setLoading(false);
      }

      return unsubscribe;
    }

    handleUser();

    return;
  }, [authUser]);

  const signinWithGoogle = (redirect: any) => {
    setLoading(true);

    return signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
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

  return { user, loading, signinWithGoogle, signout };
}

async function formatUser(user: any) {
  const token = await user.getIdToken(true);
  return {
    token: token,
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoUrl,
    provider: user.providerData[0].providerId,
  };
}
