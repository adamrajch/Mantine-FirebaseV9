import { Title } from '@mantine/core';
import React, { ReactElement } from 'react';

interface Props {
  text: string;
}

export default function RText({ text }: Props): ReactElement {
  return <Title>{text}</Title>;
}
