import { Box, Group, Title } from '@mantine/core';
import React, { ReactElement, useEffect } from 'react';

export default function ActiveProgramList({ user }: any): ReactElement {
  useEffect(() => {}, []);
  return (
    <Box>
      <Title>Active Programs</Title>
      <Group direction="column"></Group>
    </Box>
  );
}
