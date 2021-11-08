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
  const [blockIndex, setBlockIndex] = useState<string | null | number>(0);
  const [dayIndex, setDayIndex] = useState<string | number | null>(0);
  useEffect(() => {
    setDayIndex(0);
  }, [weekIndex]);
  // useEffect(() => {
  //   console.log('Block: ', blockIndex);
  //   console.log('Week: ', weekIndex);
  //   console.log('Day: ', dayIndex);
  // }, [dayIndex, weekIndex, blockIndex]);
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
  return (
    <div>
      <Group position="left" spacing="lg" grow>
        <div>
          {values.blocks && values.blocks.length > 0 && (
            <BlockSelect setBlockIndex={setBlockIndex} blockIndex={blockIndex} />
          )}
        </div>
        <div>
          {values.blocks[blockIndex].weeks && values.blocks[blockIndex].weeks.length > 0 && (
            <WeekSelect setWeekIndex={setWeekIndex} blockIndex={blockIndex} />
          )}
        </div>
        <div>
          {values.blocks[blockIndex].weeks && values.blocks[blockIndex].weeks.length > 0 && (
            <DaySelect setDayIndex={setDayIndex} weekIndex={weekIndex} blockIndex={blockIndex} />
          )}
        </div>
        <Group position="right">
          <ActionIcon onClick={() => blockHelpers.push(newBlock)}>
            <CgFolderAdd />
          </ActionIcon>
        </Group>
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
                          name={`blocks[${blockIndex}].name`}
                          value={values.blocks[blockIndex].name}
                          onChange={(e: any) => handleChange(e)}
                        />

                        <Group position="right">
                          <ActionIcon
                            onClick={() =>
                              weekHelpers.push({
                                name: `Week ${values.blocks[blockIndex].weeks.length + 1}`,
                                summary: undefined,
                                days: [],
                              })
                            }
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
                              onClick={() => blockHelpers.remove(blockIndex)}
                              color="red"
                            >
                              Delete
                            </Menu.Item>
                          </Menu>
                        </Group>
                      </Group>
                      {values.blocks[blockIndex].weeks &&
                        values.blocks[blockIndex].weeks.length > 0 && (
                          <WeekSection
                            weekHelpers={weekHelpers}
                            blockIndex={blockIndex}
                            weekIndex={weekIndex}
                            dayIndex={dayIndex}
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
