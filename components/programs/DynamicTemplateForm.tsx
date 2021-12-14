import {
  ActionIcon,
  Button,
  Collapse,
  Group,
  Menu,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiFillSetting, AiOutlineDelete, AiOutlinePlus, AiOutlineSave } from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import { FaRegStickyNote } from 'react-icons/fa';
import WeekSection from './formSections/WeekSection';
export default function DynamicTemplateForm({ blockHelpers }: any): ReactElement {
  const { handleChange, values }: any = useFormikContext();
  const [blockIndex, setBlockIndex] = useState<number>(0);
  const [weekIndex, setWeekIndex] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);

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

  const newWeek = {
    name: `Week ${values.blocks[blockIndex].weeks?.length + 1}`,
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
  };
  function handleAddBlock() {
    blockHelpers.push(newBlock);
  }
  function handleAddWeek(weekHelpers: any) {
    weekHelpers.push(newWeek);
  }
  return (
    <Group position="left" direction="column" grow>
      <Group position="left" direction="column" grow spacing={1}>
        <Title order={3} my={0}>
          Blocks
        </Title>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Group position="left">
            {values.blocks.map((block: any, i: number) => {
              return (
                <Button
                  key={i}
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    if (blockIndex == i) {
                    } else {
                      setWeekIndex(0), setBlockIndex(i);
                    }
                  }}
                  sx={(theme) => ({
                    borderColor: blockIndex == i ? 'gold' : '',
                  })}
                >
                  {block.name}
                </Button>
              );
            })}
          </Group>

          <Button
            variant="outline"
            onClick={() => handleAddBlock()}
            leftIcon={<AiOutlinePlus />}
            size="xs"
          >
            Block
          </Button>
        </div>
      </Group>

      {/* <Group>
        <div>{blockIndex == null && <div>No blocks </div>}</div>
        <div>{weekIndex == null && <div>No week </div>}</div>
      </Group> */}

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
                      <Group position="left" direction="column" grow spacing={1}>
                        <Title order={3}>Weeks</Title>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Group position="left">
                            {values.blocks[blockIndex].weeks.map((week: any, i: number) => {
                              return (
                                <Button
                                  key={i}
                                  variant="outline"
                                  size="xs"
                                  onClick={() => setWeekIndex(i)}
                                  sx={(theme) => ({
                                    borderColor: weekIndex == i ? 'gold' : '',
                                  })}
                                >
                                  {week.name}
                                </Button>
                              );
                            })}
                          </Group>

                          <Button
                            variant="outline"
                            onClick={() => handleAddWeek(weekHelpers)}
                            leftIcon={<AiOutlinePlus />}
                            size="xs"
                          >
                            Week
                          </Button>
                        </div>
                      </Group>
                      <Group position="apart" mt="md" mb="md">
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
                      {weekIndex !== null &&
                        values.blocks[blockIndex].weeks &&
                        values.blocks[blockIndex].weeks.length > 0 && (
                          <WeekSection
                            weekHelpers={weekHelpers}
                            blockIndex={blockIndex}
                            weekIndex={weekIndex}
                            setWeekIndex={setWeekIndex}
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
