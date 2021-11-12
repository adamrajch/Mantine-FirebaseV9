import {
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  MultiSelect,
  SegmentedControl,
  SimpleGrid,
  Tab,
  Tabs,
  TextInput,
  Title,
} from '@mantine/core';
import { ChatBubbleIcon, ImageIcon } from '@modulz/radix-icons';
import { Field, FieldArray, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import DynamicTemplateForm from './DynamicTemplateForm';
import TemplateText from './formSections/TemplateText';
import RichText from './RichText';
type Program = {
  title: string;
  public: boolean;
  type: string;
  category: string[];
  periodization: string[];
  experience: string[];
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
  const [openTextModal, setOpenTextModal] = useState(false);
  const initialValues: Program = {
    title: '',
    public: false,
    type: 'routine',
    category: [],
    experience: ['beginner', 'intermediate', 'advanced'],
    periodization: [],
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
  const multiSelectData = [
    { value: 'bodybuilding', label: 'bodybuilding' },
    { value: 'olympic weightlifting', label: 'olympic weightlifting' },
    { value: 'powerlifting', label: 'powerlifting' },
    { value: 'mobility', label: 'mobility' },
    { value: 'sport', label: 'sport' },
  ];
  const multiSelectExperience = [
    { value: 'beginner', label: 'beginner' },
    { value: 'intermediate', label: 'intermediate' },
    { value: 'advanced', label: 'advanced' },
  ];
  const periodizationCheckboxes = [
    { label: 'Linear', value: 'linear' },
    { label: 'Block', value: 'block' },
    { label: 'Wave', value: 'wave' },
    { label: 'D.U.P', value: 'dup' },
    { label: 'Step', value: 'step' },
    { label: 'Reverse', value: 'reverse' },
  ];
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
        enableReinitialize={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleSubmit, setFieldValue, handleChange, handleBlur, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Container size="xl">
              <SimpleGrid cols={3} spacing="xs">
                <div></div>
                <div>
                  <Title align="center">{values.title ? values.title : 'Create Program'}</Title>
                </div>

                <div></div>
              </SimpleGrid>

              <Tabs>
                <Tab label="General" icon={<ImageIcon />}>
                  <Group direction="column" spacing="lg" grow>
                    <TextInput
                      autoComplete="false"
                      required
                      label="Program Title"
                      error={errors.title && 'Title must be between 3 and 20 characters'}
                      value={values.title}
                      name="title"
                      onChange={handleChange}
                    />
                    <SegmentedControl
                      fullWidth
                      value={values.type}
                      onChange={(value) => setFieldValue('type', value)}
                      data={[
                        { label: 'Routine', value: 'routine' },
                        { label: 'Program', value: 'program' },
                      ]}
                    />

                    <Group position="center" grow>
                      <MultiSelect
                        required
                        placeholder="Select atleast one discipline"
                        data={multiSelectData}
                        label="Focus"
                        value={values.category}
                        clearable
                        onChange={(value) => setFieldValue('category', value)}
                      />
                      <MultiSelect
                        required
                        placeholder="Select experience levels"
                        data={multiSelectExperience}
                        label="Experience"
                        value={values.experience}
                        clearable
                        onChange={(value) => setFieldValue('experience', value)}
                      />
                    </Group>
                    <Group position="center" spacing="xl" role="group">
                      {periodizationCheckboxes.map((checkbox) => (
                        <div key={checkbox.value}>
                          <Field name="periodization" type="checkbox" value={checkbox.value}>
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            }: any) => <Checkbox label={checkbox.label} {...field} />}
                          </Field>
                        </div>
                      ))}
                    </Group>
                    <Checkbox
                      label="Private"
                      checked={values.public}
                      onChange={(event) => setFieldValue('public', event.currentTarget.checked)}
                    />
                  </Group>
                </Tab>
                <Tab label="Summary" icon={<ChatBubbleIcon />}>
                  <div>
                    <RichText value={value} onChange={onChange} />
                  </div>
                </Tab>
                <Tab label="Template" icon={<ChatBubbleIcon />}>
                  <div>
                    <Group position="apart">
                      <Title>Template</Title>
                    </Group>

                    <Divider />

                    <FieldArray
                      name="blocks"
                      render={(blockHelpers) => (
                        <div>
                          <DynamicTemplateForm blockHelpers={blockHelpers} />
                        </div>
                      )}
                    />
                  </div>
                </Tab>
                <Tab label="Text">
                  <TemplateText values={values} />
                </Tab>
              </Tabs>

              <Group position="right" my={8}>
                <Button variant="outline" type="submit">
                  Save
                </Button>
              </Group>
            </Container>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </form>
        )}
      </Formik>
    </div>
  );
}
