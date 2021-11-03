import { ActionIcon, Button, SimpleGrid, Title } from '@mantine/core';
import { FieldArray, Formik } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import { CgFolderAdd } from 'react-icons/cg';
import BlockSection from './formSections/BlockSection';
import BlockSelect from './formSections/BlockSelect';
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
export default function FullProgramForm(): ReactElement {
  const initialValues: Template = {
    blocks: [
      {
        name: 'Block 1',
        summary: undefined,
        weeks: [
          {
            name: 'Week 1',
            days: [
              {
                name: 'Day 1',
                summary: '',
                workouts: [],
              },
            ],
          },
        ],
      },
    ],
  };
  const [value, setValue] = useState<string | null>('');
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
        enableReinitialize={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray
              name="blocks"
              render={(blockHelpers) => (
                <>
                  <SimpleGrid cols={3} spacing="xs">
                    <div></div>
                    <div>
                      <Title align="center">Create Program</Title>
                    </div>

                    <div>
                      <ActionIcon
                        onClick={() =>
                          blockHelpers.push({
                            name: `Block ${values.blocks.length + 1}`,
                            summary: '',
                            weeks: [],
                          })
                        }
                      >
                        <CgFolderAdd />
                      </ActionIcon>
                    </div>
                  </SimpleGrid>
                  <BlockSelect />
                  {/* <DynamicTemplateForm value={value} /> */}
                  {values.blocks &&
                    values.blocks.length > 0 &&
                    values.blocks.map((b: any, blockIndex: number) => (
                      <BlockSection
                        blockHelpers={blockHelpers}
                        blockIndex={blockIndex}
                        key={blockIndex}
                      />
                    ))}
                </>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
