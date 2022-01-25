import { Box, Select } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import LiftGraph from './LiftGraph';

type Props = {
  user: any;
};

export default function GraphContainer({ user }: Props) {
  const [val, setVal] = useState<any>(null);
  const [lift, setLift] = useState<any>(null);
  let data = user.trackedLifts.map((l: any) => {
    return {
      value: l.name,
      label: l.name,
      id: l.id,
    };
  });

  useEffect(() => {
    if (val) {
      let selected = data.find((item: any) => item.value === val);
      setLift(selected);
    }
  }, [val]);
  console.log(data);
  return (
    <Box>
      <Select
        placeholder="Select Lift"
        searchable
        data={data}
        nothingFound="No Lifts"
        maxDropdownHeight={200}
        icon={<BiSearch />}
        creatable
        getCreateLabel={(query) => `+ Add ${query}`}
        value={val}
        clearable
        onChange={(q) => {
          let selected = data.find((item: any) => item.value === q);
          if (q) {
            console.log(selected);
            setVal(selected.value), setLift(selected);
          } else {
            setVal(null), setLift(null);
          }
        }}
      />

      {lift !== null && <LiftGraph lift={lift} userId={user.uid} />}
    </Box>
  );
}
