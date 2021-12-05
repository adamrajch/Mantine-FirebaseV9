import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
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
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { doc, updateDoc } from 'firebase/firestore';
import { Field, FieldArray, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
import CommentSection from './Comments/CommentSection';
import DynamicTemplateForm from './DynamicTemplateForm';
import TemplateText from './formSections/TemplateText';
import RichText from './RichText';

const ProgramSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  experience: Yup.array().of(Yup.string()).min(1, 'Check atleast one'),
  category: Yup.array().of(Yup.string()).min(1, 'Check atleast one'),
});
type Program = {
  title: string;
  public: boolean;
  type: string;
  category: string[];
  periodization: string[];
  experience: string[];
  blocks: Array<{
    name: string;
    summary: string | null;
    weeks?: Array<{
      name: string;
      summary?: string;
      days: Array<{
        name: string;
        summary?: string;
        lifts?: Array<{
          name: string;
          note?: string;
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
export default function FullProgramForm({
  program,
  programID,

  programAuthor,
}: any): JSX.Element {
  const [value, onChange] = useState<string>(program ? program.summary : '');
  const [submitLoading, setSubmitLoading] = useState(false);
  const notifications = useNotifications();
  const { user, loading } = useAuth();

  console.log('program,', program);
  const initialValues: Program = program
    ? program.template
    : {
        title: '',
        public: false,
        type: 'routine',
        category: [],
        experience: ['beginner', 'intermediate', 'advanced'],
        periodization: [],
        blocks: [
          {
            name: 'Block 1',
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
        onSubmit={async (values) => {
          console.log(values);
          if (!program) {
            try {
              setSubmitLoading(true);
              await addDoc(collection(db, 'programs'), {
                author: user,
                summary: value,
                template: values,
                createdDate: serverTimestamp(),
              });
              notifications.showNotification({
                title: 'Created Program',
                message: `Successfully Created ${values.title}`,
              });
              setSubmitLoading(false);
            } catch (error) {
              console.log('from create : ', error);
            }
          } else {
            try {
              const docRef = doc(db, 'programs', programID);
              const updatedProgram = {
                template: values,
                summary: value,
                updatedDate: serverTimestamp(),
              };
              await updateDoc(docRef, updatedProgram);
              notifications.showNotification({
                title: 'Updated Program',
                message: `Successfully updated ${values.title}`,
              });
            } catch (error) {
              notifications.showNotification({
                title: 'Failed Update',
                message: `Unsucessfully updated your program. Try again soon`,
              });
              console.log('from update : ', error);
            }
          }
        }}
        enableReinitialize={false}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={ProgramSchema}
      >
        {({ handleSubmit, setFieldValue, handleChange, handleBlur, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Container size="xl">
              <Title align="center">
                {program ? `${program.template.title}` : 'Create Your Program'}
              </Title>
              <Tabs style={{ marginTop: 24 }} variant="pills">
                <Tab label="General">
                  <Group direction="column" spacing="lg" grow>
                    {program == undefined ? (
                      <Text my="lg">
                        Fill in and detail your program in this form. You can always edit your
                        program details and template after you create it
                      </Text>
                    ) : (
                      <div></div>
                    )}
                    <TextInput
                      autoComplete="false"
                      required
                      label="Program Title"
                      error={errors.title}
                      value={values.title}
                      name="title"
                      onChange={handleChange}
                    />
                    <SegmentedControl
                      fullWidth
                      value={values.type}
                      onChange={(value) => setFieldValue('type', value)}
                      data={[
                        { label: 'Custom', value: 'custom' },
                        { label: 'Generated', value: 'gen' },
                      ]}
                    />

                    <SimpleGrid cols={2}>
                      <div>
                        <MultiSelect
                          name="category"
                          required
                          placeholder="Select atleast one discipline"
                          data={multiSelectData}
                          label="Focus"
                          value={values.category}
                          clearable
                          onChange={(value) => setFieldValue('category', value)}
                        />
                        <Text color="red">{errors.category}</Text>
                      </div>
                      <div>
                        <MultiSelect
                          required
                          placeholder="Select experience levels"
                          data={multiSelectExperience}
                          label="Experience"
                          value={values.experience}
                          clearable
                          onChange={(value) => setFieldValue('experience', value)}
                        />
                        <Text color="red">{errors.experience}</Text>
                      </div>
                    </SimpleGrid>
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
                <Tab label="Summary">
                  <div>
                    <RichText value={value} onChange={onChange} />
                  </div>
                </Tab>
                <Tab label="Template">
                  <Group position="left" direction="column" grow>
                    <Title>Program Template</Title>

                    <Divider />

                    <FieldArray
                      name="blocks"
                      render={(blockHelpers) => (
                        <div>
                          <DynamicTemplateForm blockHelpers={blockHelpers} />
                        </div>
                      )}
                    />
                  </Group>
                </Tab>
                <Tab label="View As Text">
                  <TemplateText values={values} />
                </Tab>
                {program && !loading && user ? (
                  <Tab label="Comments">
                    <CommentSection
                      programID={programID}
                      user={user}
                      programAuthor={programAuthor}
                    />
                  </Tab>
                ) : null}
              </Tabs>

              <Group position="right" my={8}>
                <Button variant="outline" type="submit" loading={submitLoading}>
                  {program ? 'Save' : 'Create'}
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
