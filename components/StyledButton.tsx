import { Button, useMantineColorScheme, ButtonProps } from '@mantine/core';
import React, { FC } from 'react';

interface Props<> {
  props: any;
}

const CButton: FC<Props> = ({ children, ...props }) => {
  const colorScheme = useMantineColorScheme();

  if (colorScheme.colorScheme == 'dark') {
    return (
      <Button variant="outline" {...props}>
        {children}
      </Button>
    );
  }
  return (
    <Button variant="filled" {...props}>
      {children}
    </Button>
  );
};

export default CButton;
