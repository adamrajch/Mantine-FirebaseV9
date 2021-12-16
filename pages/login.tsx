import React from 'react';
import Login from '../components/auth/login';
import BasicShell from '../components/dashboard/BasicShell';

export default function LoginPage(): JSX.Element {
  return (
    <BasicShell>
      <Login />
    </BasicShell>
  );
}
