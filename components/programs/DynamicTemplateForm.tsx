import { Group, Tabs } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import WeekSection from './formSections/WeekSection';
export default function DynamicTemplateForm({ blockHelpers }: any): ReactElement {
  const { handleChange, values }: any = useFormikContext();
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
  function getNewWeek(bI: number) {
    return {
      name: `Week ${values.blocks[bI].weeks?.length + 1}`,
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
    };
  }

  return (
    <Group position="left" direction="column" grow>
      <FieldArray
        name="blocks"
        render={(blockHelpers) => (
          <Tabs variant="outline">
            {values.blocks.map((block: any, i: number) => (
              <Tabs.Tab key={i} label={block.name}>
                <div>
                  <FieldArray
                    name={`blocks[${i}].weeks`}
                    render={(weekHelpers) => (
                      <Tabs variant="pills">
                        {values.blocks[i].weeks &&
                          values.blocks[i].weeks.length > 0 &&
                          values.blocks[i].weeks.map((week: any, w: number) => (
                            <Tabs.Tab key={w} label={week.name}>
                              <WeekSection
                                blockHelpers={blockHelpers}
                                weekHelpers={weekHelpers}
                                blockIndex={i}
                                weekIndex={w}
                              />
                            </Tabs.Tab>
                          ))}
                        <Tabs.Tab
                          label={values.blocks[i].weeks.length < 1 ? '+ Add Week' : '+'}
                          onClick={() => weekHelpers.push(getNewWeek(i))}
                        ></Tabs.Tab>
                      </Tabs>
                    )}
                  />
                </div>
              </Tabs.Tab>
            ))}
            <Tabs.Tab
              label={values.blocks.length < 1 ? 'Add Block' : '+'}
              onClick={() => blockHelpers.push(newBlock)}
            ></Tabs.Tab>
          </Tabs>
        )}
      />
    </Group>
  );
}
