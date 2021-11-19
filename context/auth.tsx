import nookies from 'nookies';
import React, { createContext, useContext, useEffect, useState } from 'react';
import SignUp from '../components/auth/signup';
import { auth } from '../firebase';
const AuthContext = createContext({});
type Props = {
  children?: React.ReactNode;
};
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      const token = await user.getIdToken();
      if (!user) {
        console.log('no user');
        setCurrentUser(null);
        setLoading(false);
        nookies.set(undefined, '', token, {});
        return;
      }

      setCurrentUser(user);
      setLoading(false);
      nookies.set(undefined, 'token', token, {});
      console.log(user);
    });
  }, []);
  if (loading) {
    return <div>loading</div>;
  }

  if (!currentUser) {
    return <SignUp />;
  } else {
    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
  }
};

export const useAuth = () => useContext(AuthContext);
