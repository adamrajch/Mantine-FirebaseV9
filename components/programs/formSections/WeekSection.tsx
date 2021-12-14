import {
  ActionIcon,
  Button,
  Collapse,
  Group,
  Menu,
  Modal,
  Textarea,
  TextInput,
} from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiFillSetting, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import { FaRegStickyNote } from 'react-icons/fa';
import { Program } from '../../../types/types';
import DaySection from './DaySection';
import GenerateForm from './GenerateForm';

export default function WeekSection({ weekIndex, blockIndex, weekHelpers }: any): ReactElement {
  const { handleChange, setFieldValue } = useFormikContext();
  const { values }: { values: Program } = useFormikContext();
  const [open, setOpen] = useState<boolean>(false);
  const [openGen, setOpenGen] = useState<boolean>(false);
  return (
    <div>
      <FieldArray
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days`}
        render={(dayHelpers) => (
          <div>
            <Group position="apart">
              <TextInput
                label="Week Name"
                placeholder="week name"
                name={`blocks[${blockIndex}].weeks[${weekIndex}].name`}
                value={values.blocks[blockIndex].weeks[weekIndex].name}
                onChange={(e: any) => handleChange(e)}
                styles={{
                  input: { borderLeft: '2px solid yellow' },
                }}
              />
              <Group position="right">
                <>
                  <Modal opened={openGen} onClose={() => setOpenGen(false)} size="xl">
                    <GenerateForm
                      blockIndex={blockIndex}
                      weekIndex={weekIndex}
                      weekHelpers={weekHelpers}
                      currentWeek={values.blocks[blockIndex].weeks[weekIndex]}
                      onClose={setOpenGen}
                    />
                  </Modal>

                  <Group position="center">
                    <Button size="xs" variant="outline" onClick={() => setOpenGen(true)}>
                      Generate
                    </Button>
                  </Group>
                </>
                <Button
                  variant="outline"
                  onClick={() =>
                    dayHelpers.push({
                      name: `Day ${values.blocks[blockIndex].weeks[weekIndex]?.days.length + 1}`,
                      summary: '',
                      lifts: [
                        {
                          name: 'New Lift',
                          type: 'single',
                          note: '',
                          records: [
                            {
                              type: 'working',
                              load: null,
                              sets: 5,
                              reps: 5,
                              unit: 'lbs',
                              rpe: null,
                              percent: null,
                            },
                          ],
                        },
                      ],
                    })
                  }
                  leftIcon={<AiOutlinePlus />}
                  size="xs"
                >
                  Day
                </Button>

                <ActionIcon size="lg" color="cyan" onClick={() => setOpen((o) => !o)}>
                  <FaRegStickyNote />
                </ActionIcon>
                <Menu
                  control={
                    <ActionIcon size="lg" color="cyan">
                      <AiFillSetting />
                    </ActionIcon>
                  }
                  zIndex={1200}
                >
                  <Menu.Item
                    icon={<BiDuplicate color="cyan" />}
                    onClick={() =>
                      weekHelpers.insert(
                        values.blocks[blockIndex].weeks.length,
                        values.blocks[blockIndex].weeks[weekIndex]
                      )
                    }
                  >
                    Duplicate Week
                  </Menu.Item>
                  <Menu.Item
                    icon={<AiOutlineDelete />}
                    onClick={() => {
                      console.log(values);
                      weekHelpers.remove(weekIndex);
                    }}
                  >
                    Delete
                  </Menu.Item>
                </Menu>
              </Group>
            </Group>
            <Collapse in={open} my={8}>
              <Textarea
                placeholder="Add summary for week"
                name={`blocks[${blockIndex}].weeks[${weekIndex}].summary`}
                value={values.blocks[blockIndex].weeks[weekIndex].summary}
                onChange={handleChange}
              />
            </Collapse>

            <Group direction="column" mt="md" grow>
              {values.blocks[blockIndex].weeks[weekIndex].days != undefined &&
                values.blocks[blockIndex].weeks[weekIndex].days.length > 0 &&
                values.blocks[blockIndex].weeks[weekIndex].days.map((d, dayIndex: number) => (
                  <DaySection
                    blockIndex={blockIndex}
                    weekIndex={weekIndex}
                    dayIndex={dayIndex}
                    dayHelpers={dayHelpers}
                    key={dayIndex}
                  />
                ))}
            </Group>
          </div>
        )}
      />
    </div>
  );
}
