import { NativeSelect } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';

export default function BlockSelect({
  setWeekIndex,
  setBlockIndex,
  blockIndex,
  weekIndex,
  setDayIndex,
}: any): ReactElement {
  const { values } = useFormikContext();
  const [label, setLabel] = useState('');

  return (
    <NativeSelect
      value={label}
      data={values.blocks.map((block, i: number) => ({
        value: i.toString(),
        label: block.name,
      }))}
      onChange={(e) => {
        setBlockIndex(e.target.value);
        setLabel(e.target.value);
      }}
    />
  );
}
