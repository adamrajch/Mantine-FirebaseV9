import { ActionIcon, Collapse, Group, Menu, Textarea, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  AiFillSetting,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiOutlineDelete,
  AiOutlineFolderAdd,
  AiOutlineSave,
} from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import { CgFolderAdd } from 'react-icons/cg';
import { FaRegStickyNote } from 'react-icons/fa';
import BlockSelect from './formSections/BlockSelect';
import DaySelect from './formSections/DaySelect';
import WeekSection from './formSections/WeekSection';
import WeekSelect from './formSections/WeekSelect';

export default function DynamicTemplateForm({ blockHelpers }: any): ReactElement {
  const { values, handleChange } = useFormikContext();
  const [weekIndex, setWeekIndex] = useState<string | number | null>(0);
  const [blockIndex, setBlockIndex] = useState<string | number | null>(0);
  const [dayIndex, setDayIndex] = useState<string | number | null>(0);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (weekIndex == 0) {
      setDayIndex(0);
    }
  }, [weekIndex]);
  useEffect(() => {
    if (!values.blocks.length || values.blocks.length == 0) {
      setBlockIndex(null);
      setWeekIndex(null);
      setDayIndex(null);
    }
  }, [values.blocks.length]);

  useEffect(() => {
    if (blockIndex) {
      if (
        !values.blocks[blockIndex].weeks.length ||
        values.blocks[blockIndex].weeks.length == 0 ||
        values.blocks[blockIndex].weeks.length == undefined
      ) {
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
            lifts: [],
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
    <Group position="left" direction="column" grow>
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

      {values.blocks && values.blocks.length > 0 && blockIndex !== null && (
        <Group direction="row">
          {values.blocks.length >= 2 && blockIndex > 0 && (
            <ActionIcon>
              <AiOutlineCaretLeft
                onClick={() => {
                  console.log(blockIndex);
                  setBlockIndex((curr) => curr - 1);
                }}
              />
            </ActionIcon>
          )}
          <TextInput
            variant="default"
            name={`values.blocks[${blockIndex}].name`}
            value={values.blocks[blockIndex].name}
            onChange={() => console.log('hi')}
          />
          {blockIndex < values.blocks.length - 1 && (
            <ActionIcon>
              <AiOutlineCaretRight
                onClick={() => {
                  console.log(blockIndex);

                  setBlockIndex((curr) => curr + 1);
                  if (!values.blocks[blockIndex].weeks.length) {
                    setWeekIndex(null);
                  } else {
                  }
                }}
              />
            </ActionIcon>
          )}
        </Group>
      )}

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
                      <Group position="apart" mb="md">
                        <TextInput
                          label="Block Name"
                          placeholder="Block Name"
                          name={`blocks[${blockIndex}].name`}
                          value={values.blocks[blockIndex].name}
                          onChange={(e: any) => handleChange(e)}
                          styles={{
                            input: { borderLeft: '2px solid blue' },
                          }}
                        />

                        <Group position="right">
                          <ActionIcon
                            onClick={() => {
                              weekHelpers.push({
                                name: `Week ${values.blocks[blockIndex].weeks.length + 1}`,
                                summary: '',
                                days: [
                                  {
                                    name: 'Day 1',
                                    summary: '',
                                    lifts: [
                                      {
                                        name: 'Lift',
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
                              if (weekIndex == null) {
                                setWeekIndex(0);
                              }
                            }}
                          >
                            <AiOutlineFolderAdd />
                          </ActionIcon>
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
                      <Collapse in={open} my={8}>
                        <Textarea
                          placeholder="Add summary for block"
                          name={`blocks[${blockIndex}].summary`}
                          value={values.blocks[blockIndex].summary}
                          onChange={handleChange}
                        />
                      </Collapse>
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
    </Group>
  );
}
