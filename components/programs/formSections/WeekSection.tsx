import { ActionIcon, Group, Menu, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import { AiFillSetting, AiOutlineClose, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import { Workout } from '../../../types/types';
import DaySection from './DaySection';
type Template = {
  blocks: Array<{
    name: string;
    summary?: string;
    weeks?: Array<{
      name: string;
      summary?: string;
      days: Array<{
        name: string;
        summary?: string;
        workouts?: Array<{
          name: string;
          type: string;
          note?: string;
          lifts?: Array<{
            name: string;
            records?: Array<{
              type: string;
              sets: number;
              reps: number;
              rpe?: number;
              load?: number;
              unit?: string;
              percent?: number;
            }>;
          }>;
        }>;
      }>;
    }>;
  }>;
};
const emptyWorkout: Workout = {
  name: 'New Lift',
  type: 'single',
  note: undefined,
  lifts: [
    {
      name: 'New Lift',
      records: [
        {
          type: 'working',
          load: 135,
          sets: 5,
          reps: 5,
          unit: 'lbs',
          rpe: 8,
          percent: undefined,
        },
      ],
    },
  ],
};
export default function WeekSection({
  weekIndex,
  blockIndex,
  weekHelpers,
  dayIndex,
}: any): ReactElement {
  const { handleChange, setFieldValue } = useFormikContext();
  const { values }: { values: Template } = useFormikContext();
  return (
    <div>
      <FieldArray
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days`}
        render={(dayHelpers) => (
          <div style={{ paddingLeft: 20 }}>
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
              />
              <Group position="right">
                <ActionIcon
                  onClick={() =>
                    dayHelpers.push({
                      name: `Day ${values.blocks[blockIndex].weeks[weekIndex].days.length + 1}`,
                      workouts: [emptyWorkout],
                    })
                  }
                >
                  <AiOutlineFileAdd />
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
                    onClick={() => weekHelpers.remove(weekIndex)}
                  >
                    Delete
                  </Menu.Item>
                </Menu>
              </Group>
            </Group>
            {values.blocks[blockIndex].weeks[weekIndex].days.length > 0 ? (
              <div>
                <DaySection
                  blockIndex={blockIndex}
                  weekIndex={weekIndex}
                  dayIndex={dayIndex}
                  dayHelpers={dayHelpers}
                />
              </div>
            ) : (
              <div>Add Day</div>
            )}
          </div>
        )}
      />
    </div>
  );
}
