// /pages/refresh.js

import Router from 'next/router';
import nookies from 'nookies';
import React from 'react';
import Loader from '../components/Loader';
import { useAuth } from '../context/auth';
import { auth } from '../firebase';
const Refresh = () => {
  // This hook is something like https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/utils/auth/useUser.js
  const { user } = useAuth();
  React.useEffect(
    function forceTokenRefresh() {
      // You should also handle the case where currentUser is still being loaded
      if (auth.currentUser) {
        auth.currentUser
          .getIdToken(true) // true will force token refresh
          .then(() => {
            // Updates user cookie
            // setUserCookie(currentUser);
            nookies.set(undefined, 'token', user.token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
            // Redirect back to where it was
            console.log('refreshed token');
            Router.back();
          })
          .catch(() => {
            // If any error happens on refresh, redirect to home
            console.log('no refresh');
            Router.replace('/');
          });
      } else {
        Router.replace('/');
      }
    },
    [user]
  );

  return (
    // Show a simple loading while refreshing token?
    <Loader />
  );
};

export default Refresh;
