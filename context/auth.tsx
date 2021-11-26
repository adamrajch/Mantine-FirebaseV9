import nookies from 'nookies';
import React, { createContext, useContext, useEffect, useState } from 'react';
import SignUp from '../components/auth/signup';
import { auth } from '../firebase';

type Props = {
  children?: React.ReactNode;
};

const AuthContext = createContext({});
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log('no user');
        setCurrentUser(null);
        setLoading(false);
        // nookies.destroy(undefined, 'token');
        return;
      }

      const token = await user.getIdToken();
      setCurrentUser(user);
      setLoading(false);
      nookies.set(undefined, 'token', token, { maxAge: 30 * 24 * 60 * 60 });
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
