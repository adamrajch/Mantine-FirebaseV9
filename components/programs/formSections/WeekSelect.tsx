import { NativeSelect } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';

export default function WeekSelect({ setWeekIndex, blockIndex, weekIndex }: any): ReactElement {
  const { values } = useFormikContext();
  const [label, setLabel] = useState('');

  useEffect(() => {
    //   setLabel('');
    console.log(label);
  }, [weekIndex]);
  return (
    <NativeSelect
      value={label}
      data={values.blocks[blockIndex].weeks.map((week, i: number) => ({
        value: i.toString(),
        label: week.name,
      }))}
      onChange={(e) => {
        setWeekIndex(e.target.value);
        setLabel(e.target.value);
      }}
    />
  );
}
