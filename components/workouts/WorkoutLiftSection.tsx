import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Group,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdAdd, MdDelete } from 'react-icons/md';
import { LiftsData } from './LiftData';

export default function WorkoutLiftSection({ li, lift, liftHelpers }: any): ReactElement {
  const { values, handleChange, setFieldValue }: any = useFormikContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalInput, setModalInput] = useState<any>('');
  const [modalLift, setModalLift] = useState<any>(null);
  const [opened, setOpened] = useState(false);
  const [openedNewLift, setOpenedNewLift] = useState(false);
  const [list, setList] = useState<any>(LiftsData);
  const matches = useMediaQuery('(min-width: 900px)');
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
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[5],
      })}
    >
      <FieldArray name={`lifts[${li}].records`}>
        {(recordHelpers) => (
          <Box>
            <>
              <Modal opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!">
                <TextInput placeholder="Search Lifts" icon={<BiSearch />} />

                <Group direction="column"></Group>
              </Modal>

              <Group position="center">
                <Button onClick={() => setOpened(true)}>Open Modal</Button>
              </Group>
            </>
            <>
              <Modal
                opened={openedNewLift}
                onClose={() => setOpenedNewLift(false)}
                title="Track New Lift"
              >
                <Button>Track this lift</Button>
              </Modal>
            </>
            <Group direction="column" grow>
              <Group position="apart">
                <Select
                  label="Select Lift"
                  placeholder="Pick one"
                  searchable
                  data={list}
                  nothingFound="No Lifts"
                  maxDropdownHeight={200}
                  icon={<BiSearch />}
                  creatable
                  getCreateLabel={(query) => `+ Add ${query}`}
                  onCreate={(query) => {
                    //   setList((current: any) => [...current, query]),
                    setOpenedNewLift(true);
                  }}
                  onChange={(q) => {
                    let selected = list.find((item: any) => item.value === q);
                    setFieldValue(`lifts[${li}]`, {
                      name: q,
                      id: selected.id,
                      note: values.lifts[li].note,
                      records: values.lifts[li].records,
                    });
                  }}
                />
                <ActionIcon
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
              <Grid columns={15} style={{ textAlign: 'center' }}>
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
                <Grid.Col span={3}>
                  <Text>{` `}</Text>
                </Grid.Col>
              </Grid>

              <Group direction="column" grow>
                {lift.records.map((r: any, ri: number) => (
                  <Group key={ri} position="apart" grow>
                    <NumberInput
                      placeholder={r.sets}
                      size="md"
                      value={values.lifts[li].records[ri].sets}
                      onChange={(value) => setFieldValue(`lifts[${li}].records[${ri}].sets`, value)}
                      min={0}
                      max={100}
                    />
                    <NumberInput
                      placeholder={r.reps}
                      size="md"
                      value={values.lifts[li].records[ri].reps}
                      onChange={(value) => setFieldValue(`lifts[${li}].records[${ri}].reps`, value)}
                    />
                    <NumberInput
                      placeholder="135"
                      size="md"
                      value={values.lifts[li].records[ri].load}
                      onChange={(value) => setFieldValue(`lifts[${li}].records[${ri}].load`, value)}
                      step={45}
                      min={0}
                      max={9999}
                    />
                    <NumberInput
                      size="md"
                      placeholder={r.rpe ? r.rpe : ''}
                      value={values.lifts[li].records[ri].rpe}
                      onChange={(value) => setFieldValue(`lifts[${li}].records[${ri}].rpe`, value)}
                      step={1}
                      min={0}
                      max={10}
                    />
                    <Group position="center">
                      <ActionIcon onClick={() => recordHelpers.remove(ri)}>
                        <MdDelete />
                      </ActionIcon>
                    </Group>
                  </Group>
                ))}
              </Group>
            </Group>
          </Box>
        )}
      </FieldArray>
    </Box>
  );
}
