import { ActionIcon, Button, Group, Menu, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import { AiFillSetting, AiOutlineDelete, AiOutlineFolderAdd, AiOutlineSave } from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import DaySelect from './formSections/DaySelect';
import WeekSection from './formSections/WeekSection';
import WeekSelect from './formSections/WeekSelect';

export default function DynamicTemplateForm(): ReactElement {
  const { values, handleChange } = useFormikContext();
  const [weekIndex, setWeekIndex] = useState<string | number | null>(0);
  const [blockIndex, setBlockIndex] = useState<number>(0);
  const [dayIndex, setDayIndex] = useState<string | number | null>(0);
  useEffect(() => {
    setDayIndex(0);
  }, [weekIndex]);
  useEffect(() => {
    console.log('Block: ', blockIndex);
    console.log('Week: ', weekIndex);
    console.log('Day: ', dayIndex);
  }, [dayIndex, weekIndex, blockIndex]);
  return (
    <div>
      {/* {blockIndex == null && 'Select Block'} */}
      <div style={{ display: 'flex' }}>
        {values.blocks.map((block, i: number) => {
          return (
            <Button
              variant="outline"
              key={i}
              onClick={() => setBlockIndex(i)}
              style={{
                borderColor: blockIndex === i ? 'gold' : '',
              }}
            >
              {block.name}
            </Button>
          );
        })}
      </div>
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
                      <Group position="apart" style={{ marginBottom: 20 }}>
                        <TextInput
                          name={`blocks[${blockIndex}].name`}
                          value={values.blocks[blockIndex].name}
                          onChange={(e: any) => handleChange(e)}
                        />
                        {values.blocks[blockIndex].weeks &&
                          values.blocks[blockIndex].weeks.length > 0 && (
                            <WeekSelect setWeekIndex={setWeekIndex} blockIndex={blockIndex} />
                          )}

                        <DaySelect
                          setDayIndex={setDayIndex}
                          weekIndex={weekIndex}
                          blockIndex={blockIndex}
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
                      <div>
                        <WeekSection
                          weekHelpers={weekHelpers}
                          blockIndex={blockIndex}
                          weekIndex={weekIndex}
                          dayIndex={dayIndex}
                        />
                      </div>
                    </div>
                  )}
                />
              </div>
            )}
          />
        </div>
      )}
      <div>
        Block:{blockIndex} week:{weekIndex} day:{dayIndex}
      </div>
    </div>
  );
}
