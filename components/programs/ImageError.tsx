import { Image } from '@mantine/core';
import React, { useState } from 'react';
interface Props {}

export const ErrorImage = ({ src, alt, fallback, height, width }: any) => {
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };

  return error ? (
    fallback
  ) : (
    <Image src={src} height={280} width={280} alt={alt} onError={onError} />
  );
};
