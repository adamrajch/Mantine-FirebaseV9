import React from 'react';
import SignUp from '../components/auth/signup';
import BasicShell from '../components/dashboard/BasicShell';

export default function SignUpPage(): JSX.Element {
  return (
    <BasicShell>
      <SignUp />
    </BasicShell>
  );
}
