import { Group, Tabs } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import WeekSection from './formSections/WeekSection';
export default function DynamicTemplateForm({ blockHelpers }: any): ReactElement {
  const { handleChange, values }: any = useFormikContext();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Group position="left" direction="column" grow>
      <Tabs variant="outline">
        {values.blocks.map((block: any, i: number) => (
          <Tabs.Tab key={i} label={block.name}>
            <FieldArray
              name="blocks"
              render={(blockHelpers) => (
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
                      </Tabs>
                    )}
                  />
                </div>
              )}
            />
          </Tabs.Tab>
        ))}
      </Tabs>

      {/* <div>
        Block:{blockIndex} week:{weekIndex} day:{dayIndex}
      </div> */}
    </Group>
  );
}
