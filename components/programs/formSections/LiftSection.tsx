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
  const [hits, setHits] = useState<any>([]);
  const { handleChange, setFieldValue } = useFormikContext();
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

  const searchLifts = async (q) => {
    if (q.length > 2) {
      const params = new URLSearchParams({ q });

      const res = await fetch('/api/search?' + params);
      console.log(q);
      const result = await res.json();
      console.log(result);
      setHits(result.lifts);
    }
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
                  onChange={(e) => {
                    console.log(e.target.value);
                    searchLifts(e.target.value);
                  }}
                />
                <Select
                  placeholder="Select Lift"
                  searchable
                  data={hits}
                  maxDropdownHeight={200}
                  icon={<BiSearch />}
                  value={
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].name
                  }
                  onSearchChange={(q) => {
                    searchLifts(q);
                  }}
                  onChange={(q) => {
                    let selected = hits.find((item: any) => item.value === q);

                    setFieldValue(
                      `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}]`,
                      {
                        name: q,
                        id: selected.entityId,
                        note: values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[
                          liftIndex
                        ].note,
                        records:
                          values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex]
                            .records,
                      }
                    );
                  }}
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
