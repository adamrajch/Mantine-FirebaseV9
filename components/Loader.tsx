import { Center, Loader } from '@mantine/core';
import React, { ReactElement } from 'react';

export default function LoaderPage(): ReactElement {
  return (
    <Center style={{ height: '100vh' }}>
      <Loader variant="dots" size="xl" />
    </Center>
  );
}
