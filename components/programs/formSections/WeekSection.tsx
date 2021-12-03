import { ActionIcon, Button, Collapse, Group, Menu, Textarea, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiFillSetting, AiOutlineClose, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import { FaRegStickyNote } from 'react-icons/fa';
import DaySection from './DaySection';
type Template = {
  blocks: Array<{
    name: string;
    summary: string | null;
    weeks?: Array<{
      name: string;
      summary: string | null;
      days: Array<{
        name: string;
        summary: string | null;
        lifts?: Array<{
          name: string;
          note: string;
          type: string;
          records?: Array<{
            type: string;
            sets: number;
            reps: number;
            rpe: number | null;
            load: number | null;
            unit: string | null;
            percent: number | null;
          }>;
        }>;
      }>;
    }>;
  }>;
};

export default function WeekSection({
  weekIndex,
  blockIndex,
  weekHelpers,
  dayIndex,
  setWeekIndex,
  setDayIndex,
}: any): ReactElement {
  const { handleChange, setFieldValue } = useFormikContext();
  const { values }: { values: Template } = useFormikContext();
  const [open, setOpen] = useState<boolean>(false);
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
                rightSection={
                  values.blocks[blockIndex].weeks[weekIndex].name.length ? (
                    <ActionIcon
                      onClick={() =>
                        setFieldValue(`blocks[${blockIndex}].weeks[${weekIndex}].name`, '')
                      }
                      size="xs"
                    >
                      <AiOutlineClose color="cyan" />
                    </ActionIcon>
                  ) : null
                }
                styles={{
                  input: { borderLeft: '2px solid yellow' },
                }}
              />
              <Group position="right">
                <Button
                  variant="outline"
                  onClick={() =>
                    dayHelpers.push({
                      name: `Day ${values.blocks[blockIndex].weeks[weekIndex].days.length + 1}`,
                      lifts: [],
                    })
                  }
                  leftIcon={<AiOutlinePlus />}
                  size="xs"
                >
                  Day
                </Button>
                {/* <ActionIcon
                  onClick={() =>
                    dayHelpers.push({
                      name: `Day ${values.blocks[blockIndex].weeks[weekIndex].days.length + 1}`,
                      lifts: [],
                    })
                  }
                >
                  <AiOutlineFileAdd />
                </ActionIcon> */}
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

                      if (values.blocks[blockIndex].weeks.length <= 1) {
                        setWeekIndex(null);
                        setDayIndex(null);
                      } else {
                        console.log('resetting week');
                        setWeekIndex(0);
                        setDayIndex(null);
                      }
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
            <Group direction="column" grow>
              {weekIndex !== null &&
              dayIndex !== null &&
              values.blocks[blockIndex].weeks[weekIndex].days.length > 0 ? (
                <DaySection
                  blockIndex={blockIndex}
                  weekIndex={weekIndex}
                  dayIndex={dayIndex}
                  dayHelpers={dayHelpers}
                />
              ) : (
                <div>Add Day</div>
              )}
            </Group>
          </div>
        )}
      />
    </div>
  );
}
