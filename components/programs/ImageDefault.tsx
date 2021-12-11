import { Image } from '@mantine/core';
import React, { useState } from 'react';
interface Props {}

export const ImageDefault = ({ src, alt, height, width, fallback }: any) => {
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };

  return (
    <Image
      src={
        error
          ? 'https://www.muscleandfitness.com/wp-content/uploads/2019/07/Arnold-Showing-Forearms.jpg?w=1109&quality=86&strip=all'
          : src
      }
      height={height}
      width={width}
      //   alt={alt}
      onError={onError}
    />
  );
};
