import { ActionIcon, Group, Menu, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import { AiFillSetting, AiOutlineDelete, AiOutlineFolderAdd, AiOutlineSave } from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import { CgFolderAdd } from 'react-icons/cg';
import BlockSelect from './formSections/BlockSelect';
import DaySelect from './formSections/DaySelect';
import WeekSection from './formSections/WeekSection';
import WeekSelect from './formSections/WeekSelect';

export default function DynamicTemplateForm({ blockHelpers }: any): ReactElement {
  const { values, handleChange } = useFormikContext();
  const [weekIndex, setWeekIndex] = useState<string | number | null>(0);
  const [blockIndex, setBlockIndex] = useState<null | string | number>(0);
  const [dayIndex, setDayIndex] = useState<string | number | null>(0);
  useEffect(() => {
    if (weekIndex == 0) {
      setDayIndex(0);
    }
  }, [weekIndex]);
  useEffect(() => {
    console.log('reset indexes');
    if (!values.blocks.length || values.blocks.length == 0) {
      setBlockIndex(null);
      setWeekIndex(null);
      setDayIndex(null);
    }
  }, [values.blocks.length]);

  useEffect(() => {
    console.log('change in block');
    if (blockIndex) {
      if (!values.blocks[blockIndex].weeks.length || values.blocks[blockIndex].weeks.length == 0) {
        setWeekIndex(null);
        setDayIndex(null);
      }
    }
    if (blockIndex && values.blocks[blockIndex].weeks.length && !weekIndex) {
      setWeekIndex(0);
    }
  }, [values.blocks]);
  const newBlock = {
    name: `Block ${values.blocks.length + 1}`,
    summary: '',
    weeks: [
      {
        name: 'Week 1',
        summary: '',
        days: [
          {
            name: 'Day 1',
            summary: '',
            workouts: [],
          },
        ],
      },
    ],
  };
  function handleAddBlock() {
    if (!values.blocks.length) {
      setBlockIndex(0);
    }
    blockHelpers.push(newBlock);
  }
  return (
    <div>
      <Group position="left" spacing="lg" grow>
        <div>
          {values.blocks && values.blocks.length > 0 && (
            <BlockSelect setBlockIndex={setBlockIndex} blockIndex={blockIndex} />
          )}
        </div>
        <div>
          {blockIndex !== null &&
            values.blocks.length > 0 &&
            values.blocks[blockIndex].weeks &&
            values.blocks[blockIndex].weeks.length > 0 && (
              <WeekSelect
                setWeekIndex={setWeekIndex}
                blockIndex={blockIndex}
                setDayIndex={setDayIndex}
                dayIndex={dayIndex}
              />
            )}
        </div>
        <div>
          {blockIndex !== null &&
            weekIndex !== null &&
            values.blocks &&
            values.blocks.length > 0 &&
            values.blocks[blockIndex].weeks &&
            values.blocks[blockIndex].weeks[weekIndex].days &&
            values.blocks[blockIndex].weeks[weekIndex].days.length > 0 && (
              <DaySelect setDayIndex={setDayIndex} weekIndex={weekIndex} blockIndex={blockIndex} />
            )}
        </div>
        <Group position="right">
          <ActionIcon onClick={() => handleAddBlock()}>
            <CgFolderAdd />
          </ActionIcon>
        </Group>
      </Group>
      <Group>
        <div>{blockIndex == null && <div>No blocks index</div>}</div>
        <div>{weekIndex == null && <div>No week index</div>}</div>
        <div>{dayIndex == null && <div>No day index</div>}</div>
      </Group>
      {values.blocks[blockIndex] && (
        <div>
          <FieldArray
            name="blocks"
            render={(blockHelpers) => (
              <div>
                <FieldArray
                  name={`blocks[${blockIndex}].weeks`}
                  render={(weekHelpers) => (
                    <div>
                      <Group position="apart">
                        <TextInput
                          label="Block Name"
                          // placeholder="Block Name"
                          name={`blocks[${blockIndex}].name`}
                          value={values.blocks[blockIndex].name}
                          onChange={(e: any) => handleChange(e)}
                        />

                        <Group position="right">
                          <ActionIcon
                            onClick={() => {
                              weekHelpers.push({
                                name: `Week ${values.blocks[blockIndex].weeks.length + 1}`,
                                summary: undefined,
                                days: [
                                  {
                                    name: 'Day 1',
                                    summary: '',
                                    workouts: [
                                      {
                                        name: 'New Lift',
                                        type: 'single',
                                        note: undefined,
                                        lifts: [
                                          {
                                            name: 'New Lift',
                                            records: [
                                              {
                                                type: 'working',
                                                load: undefined,
                                                sets: 5,
                                                reps: 5,
                                                unit: 'lbs',
                                                rpe: undefined,
                                                percent: undefined,
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              });
                              if (weekIndex == null) {
                                setWeekIndex(0);
                              }
                            }}
                          >
                            <AiOutlineFolderAdd />
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
                              icon={<AiOutlineSave color="cyan" />}
                              onClick={() =>
                                blockHelpers.insert(values.blocks.length, values.blocks[blockIndex])
                              }
                            >
                              Save block
                            </Menu.Item>
                            <Menu.Item
                              icon={<BiDuplicate color="cyan" />}
                              onClick={() =>
                                blockHelpers.insert(values.blocks.length, values.blocks[blockIndex])
                              }
                            >
                              Duplicate Block
                            </Menu.Item>
                            <Menu.Item
                              icon={<AiOutlineDelete />}
                              onClick={() => {
                                blockHelpers.remove(blockIndex);
                                if (!values.blocks.length) {
                                  setBlockIndex(null);
                                  setWeekIndex(null);
                                  setDayIndex(null);
                                } else {
                                  setBlockIndex(0);
                                  setWeekIndex(null);
                                  setDayIndex(null);
                                }
                              }}
                              color="red"
                            >
                              Delete
                            </Menu.Item>
                          </Menu>
                        </Group>
                      </Group>

                      {blockIndex !== null &&
                        weekIndex == null &&
                        values.blocks[blockIndex].weeks.length && (
                          <div>
                            Select Week
                            {values.blocks[blockIndex].weeks.map((w) => (
                              <div>{w.name}</div>
                            ))}
                          </div>
                        )}
                      {blockIndex !== null &&
                        weekIndex !== null &&
                        values.blocks[blockIndex].weeks &&
                        values.blocks[blockIndex].weeks.length > 0 && (
                          <WeekSection
                            weekHelpers={weekHelpers}
                            blockIndex={blockIndex}
                            weekIndex={weekIndex}
                            dayIndex={dayIndex}
                            setWeekIndex={setWeekIndex}
                            setDayIndex={setDayIndex}
                          />
                        )}
                    </div>
                  )}
                />
              </div>
            )}
          />
        </div>
      )}
      {/* <div>
        Block:{blockIndex} week:{weekIndex} day:{dayIndex}
      </div> */}
    </div>
  );
}
