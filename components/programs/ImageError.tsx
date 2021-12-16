import { Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';

export const ErrorImage = ({ src, alt, fallback, height, width, ...props }: any) => {
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };

  const matches = useMediaQuery('(min-width:800px)');
  return error ? (
    <>
      {fallback ? (
        fallback
      ) : (
        <Image
          src="https://sound.peal.io/soundboards/covers/000/000/001/large/Arnold-schwarzenegger-smile-photos.jpg?1469743363"
          height={matches ? height : 80}
          width={width}
          fit="contain"
          alt="invalid pic"
          {...props}
          styles={{
            root: {
              height: matches ? height : 80,
            },
          }}
        />
      )}
    </>
  ) : (
    <Image
      src={src}
      height={matches ? height : 80}
      width={width}
      alt={alt}
      onError={onError}
      {...props}
      fit="contain"
      styles={{
        root: {
          height: matches ? height : 80,
        },
      }}
      // style={{ objectPosition: 'center' }}
    />
  );
};
