import { doc, onSnapshot } from 'firebase/firestore';
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

  return { user, loading };
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
