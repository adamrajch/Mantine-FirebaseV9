import { NativeSelect } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';

export default function DaySelect({ blockIndex, weekIndex, setDayIndex }: any): ReactElement {
  const { values } = useFormikContext();
  const [label, setLabel] = useState('');

  return (
    <div>
      <NativeSelect
        value={label}
        data={values.blocks[blockIndex].weeks[weekIndex].days.map((day, i: number) => ({
          value: i,
          label: day.name,
        }))}
        onChange={(e) => {
          setDayIndex(parseInt(e.target.value));
          setLabel(e.target.value);
          console.log(
            `Block Index:${blockIndex}, Week Index:${weekIndex}, Day Index:${e.target.value}`
          );
        }}
      />
    </div>
  );
}
