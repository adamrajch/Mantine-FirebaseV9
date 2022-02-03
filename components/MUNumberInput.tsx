import { createStyles, NumberInput } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: 7,
    paddingLeft: 4,
    paddingRight: 4,
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
    background: 'transparent',
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
  name: string;
  value: number | undefined;

  min: number;
  step: number;
  max: number;
}
export default function MUNumberInput({
  placeholder,
  label,
  name,
  value,
  min,
  max,
  step,
}: MInputProps) {
  const [focused, setFocused] = useState(false);

  const float = value !== null && value !== undefined;

  const { classes } = useStyles({
    floating: float || focused,
  });
  const { setFieldValue } = useFormikContext();
  const { values }: { values: any } = useFormikContext();
  useEffect(() => {
    console.log(value?.toString().trim().length);
    console.log(value);
  }, [value]);

  return (
    <NumberInput
      label={label}
      placeholder={placeholder}
      classNames={classes}
      value={value}
      name={name}
      onChange={(value) => setFieldValue(name, value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      variant="filled"
      min={min}
      step={step}
      max={max}
    />
  );
}
