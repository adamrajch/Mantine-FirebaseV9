import { NativeSelect } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';

export default function WeekSelect({
  setWeekIndex,
  blockIndex,
  weekIndex,
  setDayIndex,
  dayIndex,
}: any): ReactElement {
  const { values } = useFormikContext();
  const [label, setLabel] = useState('');
  useEffect(() => {
    // setLabel(values.blocks[blockIndex].weeks[weekIndex].name);
  }, [weekIndex]);
  return (
    <NativeSelect
      value={label}
      data={values.blocks[blockIndex].weeks.map((week, i: number) => ({
        value: i,
        label: week.name,
      }))}
      onChange={(e) => {
        setWeekIndex(parseInt(e.target.value));
        setDayIndex(0);
        setLabel(e.target.value);
        console.log(
          `Block Index:${blockIndex}, Week Index:${e.target.value}, Day Index:${dayIndex}`
        );
      }}
    />
  );
}
