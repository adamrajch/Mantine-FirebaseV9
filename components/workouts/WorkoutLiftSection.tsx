import { ActionIcon, Box, Grid, Group, NumberInput, Select, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { FieldArray, useFormikContext } from 'formik';
import { nanoid } from 'nanoid';
import React, { ReactElement } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { MdAdd, MdDelete } from 'react-icons/md';
import { useLiftLibrary } from '../../context/LiftsListContext';
import { db } from '../../firebase';
export default function WorkoutLiftSection({
  li,
  lift,
  liftHelpers,
  user,
  list,
  hits,
}: any): ReactElement {
  const { values, setFieldValue }: any = useFormikContext();
  const { lifts } = useLiftLibrary();
  const matches = useMediaQuery('(min-width: 900px)');
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
    setFieldValue(`lifts[${li}]`, {
      name: q,
      id: newId,
      note: values.lifts[li].note,
      records: values.lifts[li].records,
    });
  }

  let dataList = [...lifts, ...list];
  return (
    <Box
      key={li}
      sx={(theme) => ({
        width: '100%',
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 8,
        padding: matches ? '12px' : '6px',
        border: '2px solid',
        borderColor: theme.colors.gray[7],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[5],
      })}
    >
      <FieldArray name={`lifts[${li}].records`}>
        {(recordHelpers) => (
          <Box>
            <Group direction="column" grow>
              <Group position="apart">
                <Select
                  placeholder="Select Lift"
                  searchable
                  data={dataList}
                  nothingFound="No Lifts"
                  maxDropdownHeight={200}
                  icon={<BiSearch />}
                  creatable
                  getCreateLabel={(query) => `+ Add ${query}`}
                  value={values.lifts[li].name}
                  clearable
                  onChange={(q) => {
                    let selected = dataList.find((item: any) => item.value === q);
                    if (q === null) {
                      setFieldValue(`lifts[${li}]`, {
                        name: q,
                        id: null,
                        note: values.lifts[li].note,
                        records: values.lifts[li].records,
                      });

                      return;
                    }

                    if (selected?.id) {
                      setFieldValue(`lifts[${li}]`, {
                        name: q,
                        id: selected.id,
                        note: values.lifts[li].note,
                        records: values.lifts[li].records,
                      });
                    } else {
                      CreateLiftData(q);
                    }
                  }}
                />
                <ActionIcon
                  color="cyan"
                  onClick={() =>
                    recordHelpers.push({
                      sets: 3,
                      reps: 5,
                      rpe: 8,
                      load: 135,
                    })
                  }
                >
                  <MdAdd size={26} />
                </ActionIcon>
                <ActionIcon onClick={() => liftHelpers.remove(li)}>
                  <MdDelete size={26} />
                </ActionIcon>
              </Group>
              {lift.records.length > 0 && (
                <Grid columns={13} style={{ textAlign: 'center' }}>
                  <Grid.Col span={3}>
                    <Text>Sets</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text>Reps</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text>Load</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text>RPE</Text>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <Text>{` `}</Text>
                  </Grid.Col>
                </Grid>
              )}

              <Group direction="column" grow>
                {lift.records.map((r: any, ri: number) => (
                  <Grid columns={13} style={{ textAlign: 'center' }} key={ri}>
                    {/* <Group key={ri} position="apart" grow> */}
                    <Grid.Col span={3}>
                      <NumberInput
                        placeholder={r.sets}
                        size="md"
                        value={values.lifts[li].records[ri].sets}
                        onChange={(value) =>
                          setFieldValue(`lifts[${li}].records[${ri}].sets`, value)
                        }
                        min={0}
                        max={100}
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <NumberInput
                        placeholder={r.reps}
                        size="md"
                        value={values.lifts[li].records[ri].reps}
                        onChange={(value) =>
                          setFieldValue(`lifts[${li}].records[${ri}].reps`, value)
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <NumberInput
                        placeholder="135"
                        size="md"
                        value={values.lifts[li].records[ri].load}
                        onChange={(value) =>
                          setFieldValue(`lifts[${li}].records[${ri}].load`, value)
                        }
                        step={45}
                        min={0}
                        max={9999}
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <NumberInput
                        size="md"
                        placeholder={r.rpe ? r.rpe : ''}
                        value={values.lifts[li].records[ri].rpe}
                        onChange={(value) =>
                          setFieldValue(`lifts[${li}].records[${ri}].rpe`, value)
                        }
                        step={1}
                        min={0}
                        max={10}
                      />
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <Group position="center">
                        <ActionIcon onClick={() => recordHelpers.remove(ri)}>
                          <IoMdClose />
                        </ActionIcon>
                      </Group>
                    </Grid.Col>

                    {/* </Group> */}
                  </Grid>
                ))}
              </Group>
            </Group>
          </Box>
        )}
      </FieldArray>
    </Box>
  );
}
