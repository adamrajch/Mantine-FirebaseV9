import { ActionIcon, Box, Group, Select } from '@mantine/core';
import { ExternalLinkIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import LiftGraph from './LiftGraph';

export default function GraphContainer({ lifts, userId }: any) {
  const initial = { value: lifts[0].name, label: lifts[0].name, id: lifts[0].id };
  const [val, setVal] = useState<any>(initial.label);
  const [lift, setLift] = useState<any>(initial);
  const router = useRouter();
  let data = lifts.map((l: any) => {
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

  useEffect(() => {
    console.log('change of lift : ', lift);
  }, [lift]);
  console.log(data);
  return (
    <Box
      sx={(theme) => ({
        padding: 16,
        borderRadius: theme.radius.md,

        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
        boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
        '&:hover': {
          boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
        },
      })}
    >
      <Group my={12} position="apart">
        <Select
          placeholder="Select Lift"
          data={data}
          nothingFound="No Lifts"
          maxDropdownHeight={250}
          icon={<BiSearch />}
          value={val}
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
        <ActionIcon
          onClick={() => {
            router.push('/dashboard/lifts');
          }}
        >
          <ExternalLinkIcon />
        </ActionIcon>
      </Group>

      {lift !== null && <LiftGraph lift={lift} userId={userId} />}
    </Box>
  );
}
