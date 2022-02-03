import { createStyles, TextInput } from '@mantine/core';
import React, { useState } from 'react';

const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: 7,
    paddingLeft: 5,
    paddingRight: 5,
    left: 15,
    pointerEvents: 'none',
    color: floating
      ? theme.colorScheme === 'dark'
        ? theme.white
        : theme.black
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(${0}px, -17px)` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
    background: 'white',
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },
}));

interface MInputProps {
  placeholder: string;
  label: string;
}
export default function FloatingLabelInput({ placeholder, label }: MInputProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      required
      classNames={classes}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="xl"
      autoComplete="off"
    />
  );
}
