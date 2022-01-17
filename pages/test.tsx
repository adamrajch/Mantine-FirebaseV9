import React, { ReactElement } from 'react';
import { useAuth } from '../context/auth';

interface Props {}

export default function test(): ReactElement {
  const { user } = useAuth();
  if (user) {
    return <div>{user.name}</div>;
  } else {
    return <div>no user</div>;
  }
}
