import { NativeSelect } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';

export default function DaySelect({ blockIndex, weekIndex, setDayIndex }: any): ReactElement {
  const { values } = useFormikContext();
  const [label, setLabel] = useState('');
  useEffect(() => {
    // setLabel('');
    console.log('Day Label: ', label);
  }, [weekIndex]);
  return (
    <div>
      {values.blocks[blockIndex].weeks[weekIndex].days &&
      values.blocks[blockIndex].weeks[weekIndex].days.length > 0 ? (
        <NativeSelect
          value={label}
          placeholder="Pick one"
          data={values.blocks[blockIndex].weeks[weekIndex].days.map((day, i: number) => ({
            value: i.toString(),
            label: day.name,
          }))}
          onChange={(e) => {
            setDayIndex(e.target.value);
            setLabel(e.target.value);
          }}
        />
      ) : (
        <div>No Days</div>
      )}
    </div>
  );
}
