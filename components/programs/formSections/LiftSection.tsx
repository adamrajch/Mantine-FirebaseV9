import { ActionIcon, Box, Collapse, Group, Select, Textarea, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { FaRegStickyNote, FaStickyNote } from 'react-icons/fa';
import { Program } from '../../../types/types';
import RecordSection from './RecordSection';

export default function LiftSection({
  blockIndex,
  weekIndex,
  dayIndex,
  liftHelpers,
  liftIndex,
}: any): ReactElement {
  const { handleChange } = useFormikContext();
  const { values }: { values: Program } = useFormikContext();
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery('(min-width: 900px)');
  const emptyRecord = {
    sets: 5,
    reps: 5,
    unit: 'lbs',
    rpe: null,
    percent: null,
  };

  const handleCreateLift = async (event) => {
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    console.log(formData);

    const res = await fetch('/api/lifts', {
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json',
        method: 'POST',
      },
    });
  };
  return (
    <div>
      <FieldArray
        name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.lifts[${liftIndex}].records`}
      >
        {(recordHelpers) => {
          return (
            <Box
              sx={(theme) => ({
                width: '100%',
                marginTop: 2,
                marginBottom: 2,
                borderRadius: 8,
                // borderColor: theme.colors.gray[9],
                // border: '2px solid transparent',
                // '&:hover': {
                //   border: '2px solid',
                //   borderColor: theme.colors.gray[7],
                //   backgroundColor: theme.colors.dark[7],
                // },
              })}
            >
              <Group position="apart" noWrap>
                <TextInput
                  autoComplete="false"
                  required
                  value={
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].name
                  }
                  name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.lifts[${liftIndex}].name`}
                  onChange={handleChange}
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    minWidth: 0,
                  }}
                  size={matches ? 'sm' : 'xs'}
                />
                <Select
                  placeholder="Select Lift"
                  searchable
                  data={[{ value: 'hehe', label: 'hehe' }]}
                  nothingFound="No Lifts"
                  maxDropdownHeight={200}
                  icon={<BiSearch />}
                  creatable
                  getCreateLabel={(query) => `+ Add ${query}`}
                  value={
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].name
                  }
                  // onChange={(q) => {
                  //   let selected = list.find((item: any) => item.value === q);
                  //   if (selected?.id) {
                  //     setFieldValue(`lifts[${li}]`, {
                  //       name: q,
                  //       id: selected.id,
                  //       note: values.lifts[li].note,
                  //       records: values.lifts[li].records,
                  //     });
                  //   } else {
                  //     CreateLiftData(q);
                  //   }
                  // }}
                />
                <Group position="right" spacing={matches ? 6 : 0} noWrap>
                  <ActionIcon size="lg" color="cyan" onClick={() => setOpen((o) => !o)}>
                    {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].note
                      .length ? (
                      <FaStickyNote />
                    ) : (
                      <FaRegStickyNote />
                    )}
                  </ActionIcon>

                  <ActionIcon color="cyan" onClick={() => recordHelpers.push(emptyRecord)}>
                    <AiOutlinePlusCircle />
                  </ActionIcon>

                  {/* {!matches && <RecordModal />} */}

                  <ActionIcon
                    size="lg"
                    color="cyan"
                    onClick={() => {
                      liftHelpers.remove(liftIndex);
                    }}
                  >
                    <AiOutlineDelete />
                  </ActionIcon>
                </Group>
              </Group>
              <Collapse in={open} my={8}>
                <Textarea
                  placeholder="Add description for lift"
                  name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].note`}
                  value={
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].note
                  }
                  onChange={handleChange}
                />
              </Collapse>

              <Group direction="column" mt="md">
                {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex]
                  .records &&
                  values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records
                    .length > 0 &&
                  values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[
                    liftIndex
                  ].records.map((r, recordIndex: number) => (
                    <div
                      key={recordIndex}
                      style={{
                        paddingLeft: matches ? 8 : 0,
                      }}
                    >
                      <RecordSection
                        blockIndex={blockIndex}
                        weekIndex={weekIndex}
                        dayIndex={dayIndex}
                        liftHelpers={liftHelpers}
                        liftIndex={liftIndex}
                        recordIndex={recordIndex}
                        recordHelpers={recordHelpers}
                        key={liftIndex}
                      />
                    </div>
                  ))}
              </Group>
            </Box>
          );
        }}
      </FieldArray>
    </div>
  );
}
