import { ActionIcon, Box, Collapse, Group, Select, Textarea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { FieldArray, useFormikContext } from 'formik';
import { nanoid } from 'nanoid';
import React, { ReactElement, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { FaRegStickyNote, FaStickyNote } from 'react-icons/fa';
import { useAuth } from '../../../context/auth';
import { useLiftLibrary } from '../../../context/LiftsListContext';
import { db } from '../../../firebase';
import { Program } from '../../../types/types';
import RecordSection from './RecordSection';

export default function LiftSection({
  blockIndex,
  weekIndex,
  dayIndex,
  liftHelpers,
  liftIndex,
}: any): ReactElement {
  // const [hits, setHits] = useState<any>([]);
  // const [list, setList] = useState<any>([]);
  const { handleChange, setFieldValue } = useFormikContext();
  const { values }: { values: Program } = useFormikContext();
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const unsub = onSnapshot(doc(db, `users/${user.uid}/lifts`, user.uid), (doc) => {
  //     console.log('Current data: ', doc.data());
  //     const data = doc.data();
  //     if (data) {
  //       setList(
  //         data?.lifts.map((l: any) => {
  //           console.log('individual ', l);

  //           return {
  //             label: l.name,
  //             value: l.name,
  //             id: l.id,
  //           };
  //         })
  //       );
  //     }
  //   });

  //   return unsub;
  // }, []);
  const matches = useMediaQuery('(min-width: 900px)');
  const emptyRecord = {
    sets: 5,
    reps: 5,
    unit: 'lbs',
    rpe: null,
    percent: null,
  };
  const { lifts, userLifts } = useLiftLibrary();
  const { user } = useAuth();

  async function CreateLiftData(q: string | null) {
    const newId = nanoid();
    await setDoc(
      doc(db, `users/${user.uid}/lifts`, user.uid),
      {
        lifts: arrayUnion({
          name: q,
          id: newId,
        }),
      },
      { merge: true }
    );

    setFieldValue(
      `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}]`,
      {
        name: q,
        id: newId,
        note: values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].note,
        records: values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records,
      }
    );
  }

  let dataList = [...lifts, ...userLifts];
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
              })}
            >
              <Group position="apart" noWrap>
                <Select
                  placeholder="Select Lift"
                  searchable
                  clearable
                  creatable
                  getCreateLabel={(query) => `+ Create ${query}`}
                  allowDeselect
                  data={dataList}
                  maxDropdownHeight={200}
                  icon={<BiSearch />}
                  value={
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].name
                  }
                  onChange={(q) => {
                    let selected = lifts.find((item: any) => item.value === q);

                    if (q === null) {
                      setFieldValue(
                        `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}]`,
                        {
                          name: null,
                          id: null,
                          note: values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[
                            liftIndex
                          ].note,
                          records:
                            values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[
                              liftIndex
                            ].records,
                        }
                      );
                      return;
                    }

                    if (selected?.id) {
                      setFieldValue(
                        `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}]`,
                        {
                          name: q,
                          id: selected.id,
                          note: values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[
                            liftIndex
                          ].note,
                          records:
                            values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[
                              liftIndex
                            ].records,
                        }
                      );
                    } else {
                      CreateLiftData(q);
                    }
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
