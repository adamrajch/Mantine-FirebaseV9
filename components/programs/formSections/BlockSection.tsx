import { ActionIcon, Input, Menu } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import { AiFillSetting, AiOutlineDelete, AiOutlineFolderAdd, AiOutlineSave } from 'react-icons/ai';
import { BiDuplicate } from 'react-icons/bi';
import { Day, Workout } from '../../../types/types';
import { FlexContainer } from '../../FlexContainer';
import WeekSection from './WeekSection';
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

const emptyDay: Day = {
  name: 'New Day',
  summary: undefined,
  workouts: [emptyWorkout],
};
export default function BlockSection({ blockIndex, blockHelpers }: any): ReactElement {
  const { handleChange } = useFormikContext();
  const { values }: { values: Template } = useFormikContext();

  return (
    <div>
      <FieldArray
        name={`blocks[${blockIndex}].weeks`}
        render={(weekHelpers) => (
          <div>
            <FlexContainer>
              <Input
                placeholder="Block Name"
                name={`blocks[${blockIndex}].name`}
                value={values.blocks[blockIndex].name}
                onChange={(e: any) => handleChange(e)}
              />
              <FlexContainer justify="flex-end">
                <ActionIcon
                  onClick={() =>
                    weekHelpers.push({
                      name: `Week ${values.blocks[blockIndex].weeks.length + 1}`,
                      summary: undefined,
                      days: [emptyDay],
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
              </FlexContainer>
            </FlexContainer>
            <div>
              {values.blocks[blockIndex].weeks &&
                values.blocks[blockIndex].weeks.length > 0 &&
                values.blocks[blockIndex].weeks.map((week: any, weekIndex: number) => (
                  <WeekSection
                    weekHelpers={weekHelpers}
                    blockIndex={blockIndex}
                    weekIndex={weekIndex}
                    key={weekIndex}
                  />
                ))}
            </div>
          </div>
        )}
      />
    </div>
  );
}
