import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import router from 'next/router';
import nookies from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { createUser } from '../hooks/createUser';
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
  const [authUser, authLoading] = useAuthState(auth);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  useEffect(() => {
    async function handleUser() {
      let unsubscribe: any;
      if (authLoading) {
        return;
      }

      if (authUser) {
        const formattedUser = await formatUser(authUser);
        const { token, ...userWithoutToken } = formattedUser;

        const ref = doc(db, 'users', authUser.uid);

        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          setUser(docSnap.data());
        } else {
          console.log(authUser);
          createUser(authUser.uid, userWithoutToken);

          // setUser(user);
        }

        unsubscribe = onSnapshot(ref, (doc) => {
          console.log('sets user, ', doc.data());
          setUser(doc.data());
          setLoading(false);
        });

        nookies.set(undefined, 'token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
        setLoading(false);
        return unsubscribe;
      } else {
        nookies.set(undefined, 'token', '', { path: '/' });
        setUser(false);
        setLoading(false);
      }

      return unsubscribe;
    }

    handleUser();
    setLoading(false);
    return () => {
      setLoading({});
    };
  }, [authUser, authLoading]);

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
    return signOut(auth)
      .then(() => {
        console.log('sucessfully logged out');
        // Sign-out successful.
        router.push('/');
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
    photoUrl: user.photoURL,
    provider: user.providerData[0].providerId,
  };
}
