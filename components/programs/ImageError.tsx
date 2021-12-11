import { Image } from '@mantine/core';
import React, { useState } from 'react';

export const ErrorImage = ({ src, alt, fallback, height, width }: any) => {
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };

  return error ? (
    <>
      {fallback ? (
        fallback
      ) : (
        <Image
          src="https://sound.peal.io/soundboards/covers/000/000/001/large/Arnold-schwarzenegger-smile-photos.jpg?1469743363"
          height={height}
          width={width}
          fit="contain"
          alt="invalid pic"
          // onError={onError}
        />
      )}
    </>
  ) : (
    <Image src={src} height={height} width={width} alt={alt} onError={onError} />
  );
};
