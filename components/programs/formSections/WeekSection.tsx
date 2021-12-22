import {
  ActionIcon,
  Button,
  Collapse,
  Group,
  Menu,
  Modal,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiFillFileAdd, AiFillSetting, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import { FaRegStickyNote, FaStickyNote } from 'react-icons/fa';
import { Program } from '../../../types/types';
import DaySection from './DaySection';
import GenerateForm from './GenerateForm';

export default function WeekSection({
  weekIndex,
  blockIndex,
  weekHelpers,
  blockHelpers,
}: any): ReactElement {
  const { handleChange, setFieldValue } = useFormikContext();
  const { values }: { values: Program } = useFormikContext();
  const [open, setOpen] = useState<boolean>(false);
  const [openGen, setOpenGen] = useState<boolean>(false);
  const modals = useModals();

  const freshBlock = {
    name: `Block 1`,
    summary: '',
    weeks: [
      {
        name: 'Week 1',
        summary: '',
        days: [
          {
            name: 'Day 1',
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
          },
          {
            name: 'Day 2',
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
          },
          {
            name: 'Day 3',
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
          },
          {
            name: 'Day 4',
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
          },
          {
            name: 'Day 5',
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
          },
          {
            name: 'Day 6',
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
          },
          {
            name: 'Day 7',
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
          },
        ],
      },
    ],
  };

  function handleAddWeek(weekHelpers: any, blockIndex: number) {
    weekHelpers.push({
      name: `Week ${values.blocks[blockIndex].weeks?.length + 1}`,
      summary: '',
      days: [
        {
          name: 'Day 1',
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
        },
        {
          name: 'Day 2',
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
        },
        {
          name: 'Day 3',
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
        },
        {
          name: 'Day 4',
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
        },
        {
          name: 'Day 5',
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
        },
        {
          name: 'Day 6',
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
        },
        {
          name: 'Day 7',
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
        },
      ],
    });
  }
  const openEditBlockModal = () => {
    const id = modals.openModal({
      title: 'Edit Block',
      children: (
        <Group direction="column" grow>
          <TextInput
            label="Block Name"
            name={`blocks[${blockIndex}].name`}
            value={values.blocks[blockIndex].name}
            onChange={handleChange}
          />
          <Textarea
            label="Summary"
            name={`blocks[${blockIndex}].summary`}
            // value={values.blocks[blockIndex].summary}
            onChange={(e) => setFieldValue(blockIndex, e.target.value)}
          />
          <Button fullWidth onClick={() => modals.closeModal(id)}>
            Save
          </Button>
        </Group>
      ),
    });
  };
  return (
    <div>
      <FieldArray
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days`}
        render={(dayHelpers) => (
          <div>
            <>
              <Modal opened={openGen} onClose={() => setOpenGen(false)} size="lg">
                <GenerateForm
                  blockIndex={blockIndex}
                  weekHelpers={weekHelpers}
                  currentWeek={weekIndex}
                  onClose={() => setOpenGen(false)}
                />
              </Modal>
            </>
            <Group position="apart">
              <TextInput
                label="Week Name"
                placeholder="week name"
                name={`blocks[${blockIndex}].weeks[${weekIndex}].name`}
                value={values.blocks[blockIndex].weeks[weekIndex].name}
                onChange={(e: any) => handleChange(e)}
                styles={{
                  input: { borderLeft: '2px solid cyan' },
                }}
              />
              <Group position="right">
                <Tooltip label="Edit Summary" color="cyan" withArrow>
                  <ActionIcon size="lg" color="cyan" onClick={() => setOpen((o) => !o)}>
                    {values.blocks[blockIndex].weeks[weekIndex].summary.length ? (
                      <FaStickyNote />
                    ) : (
                      <FaRegStickyNote />
                    )}
                  </ActionIcon>
                </Tooltip>
                {values.blocks[blockIndex].weeks[weekIndex].days.length < 7 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (values.blocks[blockIndex].weeks[weekIndex].days.length < 7) {
                        dayHelpers.push({
                          name: `Day ${
                            values.blocks[blockIndex].weeks[weekIndex]?.days.length + 1
                          }`,
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
                        });
                      }
                    }}
                    leftIcon={<AiFillFileAdd />}
                    size="xs"
                  >
                    Day
                  </Button>
                )}

                <Menu
                  control={
                    <Button
                      variant="outline"
                      onClick={() => handleAddWeek(weekHelpers, blockIndex)}
                      leftIcon={<AiFillSetting />}
                      size="xs"
                    >
                      Week
                    </Button>
                  }
                  zIndex={1200}
                >
                  <Menu.Item icon={<BiDuplicate color="cyan" />} onClick={() => setOpenGen(true)}>
                    Duplicate Weeks
                  </Menu.Item>

                  <Menu.Item
                    color="red"
                    icon={<AiOutlineDelete />}
                    onClick={() => {
                      weekHelpers.remove(weekIndex);
                    }}
                  >
                    Delete Week
                  </Menu.Item>
                </Menu>
                <Menu
                  control={
                    <Button variant="outline" leftIcon={<AiFillSetting />} size="xs">
                      Block
                    </Button>
                  }
                  zIndex={1200}
                >
                  <Menu.Item
                    icon={<BiDuplicate color="cyan" />}
                    onClick={() =>
                      blockHelpers.insert(values.blocks.length, values.blocks[blockIndex])
                    }
                  >
                    Duplicate Block
                  </Menu.Item>

                  <Menu.Item
                    icon={<AiOutlineEdit color="cyan" />}
                    onClick={() => openEditBlockModal()}
                  >
                    Edit Block
                  </Menu.Item>

                  <Menu.Item
                    icon={<AiOutlineDelete />}
                    onClick={() => {
                      blockIndex === 0
                        ? blockHelpers.replace(blockIndex, freshBlock)
                        : blockHelpers.remove(blockIndex);
                    }}
                    color="red"
                  >
                    {blockIndex === 0 ? 'Reset Block' : 'Delete Block'}
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
