import { Button, Collapse, Container, Group, SimpleGrid, Title } from '@mantine/core';
import { FieldArray, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import DynamicTemplateForm from './DynamicTemplateForm';
import RichText from './RichText';
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
  const [value, onChange] = useState<string>('');
  const [opened, setOpen] = useState(false);

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
            <Container size="xl">
              <SimpleGrid cols={3} spacing="xs">
                <div></div>
                <div>
                  <Title align="center">Create Program</Title>
                </div>

                <div></div>
              </SimpleGrid>
              <Group>
                <Button onClick={() => setOpen((o) => !o)}>Summary</Button>
              </Group>
              <Collapse in={opened}>
                <RichText value={value} onChange={onChange} />
              </Collapse>
              <FieldArray
                name="blocks"
                render={(blockHelpers) => (
                  <div>
                    <DynamicTemplateForm blockHelpers={blockHelpers} />
                  </div>
                )}
              />
            </Container>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            <Button type="submit">Save</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
