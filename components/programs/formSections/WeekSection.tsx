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
    summary: string | null;
    weeks?: Array<{
      name: string;
      summary: string | null;
      days: Array<{
        name: string;
        summary: string | null;
        workouts?: Array<{
          name: string;
          type: string;
          note: string | null;
          lifts?: Array<{
            name: string;
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
  }>;
};
const emptyWorkout: Workout = {
  name: 'New Lift',
  type: 'single',
  note: '',
  lifts: [
    {
      name: 'New Lift',
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
                      name: `New Day`,
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
          </div>
        )}
      />
    </div>
  );
}
