import { Button } from '@mantine/core';
import React, { ReactElement } from 'react';
import { withAuthModal } from '../components/auth/Auth';
import { useAuth } from '../context/auth';

function AuthButton({ openAuthModal }: any): ReactElement {
  const { user } = useAuth();
  const handleClick = () => {
    if (!user) {
      openAuthModal(true);
    } else {
      alert('allowed');
    }
  };

  return <Button onClick={() => handleClick()}>Auth Button</Button>;
}

export default withAuthModal(AuthButton);
