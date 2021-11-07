import { ActionIcon, Button, Container, SimpleGrid, Title } from '@mantine/core';
import { FieldArray, Formik } from 'formik';
import React, { ReactElement } from 'react';
import { CgFolderAdd } from 'react-icons/cg';
import DynamicTemplateForm from './DynamicTemplateForm';
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
      },
    ],
  };

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
                <Container size="xl">
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
                          })
                        }
                      >
                        <CgFolderAdd />
                      </ActionIcon>
                    </div>
                  </SimpleGrid>

                  <DynamicTemplateForm />
                </Container>
              )}
            />
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            <Button type="submit">Save</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
