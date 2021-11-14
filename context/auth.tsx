import React, { createContext, useContext, useEffect, useState } from 'react';
import Login from '../components/auth/login';
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
      if (!user) {
        console.log('no user');
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      setCurrentUser(user);
      setLoading(false);
      console.log(token);
      console.log(user);
    });
  }, []);
  if (loading) {
    return <div>loading</div>;
  }

  if (!currentUser) {
    return <Login />;
  } else {
    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
  }
};

export const useAuth = () => useContext(AuthContext);
