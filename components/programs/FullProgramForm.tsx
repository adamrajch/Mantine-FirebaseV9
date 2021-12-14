import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { Button, Divider, Group, Tab, Tabs, Title } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { doc, updateDoc } from 'firebase/firestore';
import { FieldArray, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { db } from '../../firebase';
import DynamicTemplateForm from './DynamicTemplateForm';
import GeneralSection from './formSections/GeneralSection';
import TemplateText from './formSections/TemplateText';
import RichText from './RichText';

const ProgramSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  experience: Yup.array().of(Yup.string()).min(1, 'Check atleast one'),
  category: Yup.array().of(Yup.string()).min(1, 'Check atleast one'),
  photoUrl: Yup.string().min(4, 'Too Short!'),
});
type Program = {
  title: string;
  public: boolean;
  // type: string;
  category: string[];
  periodization: string[];
  experience: string[];
  photoUrl: string;
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
  user,
  comments,
}: any): JSX.Element {
  const [value, onChange] = useState<string>(program ? program.summary : '');
  const [submitLoading, setSubmitLoading] = useState(false);
  const notifications = useNotifications();
  const router = useRouter();
  console.log('programAuthor ', programAuthor);
  console.log('user ', user);

  const initialValues: Program = program
    ? program.template
    : {
        title: '',
        public: false,
        // type: 'routine',
        category: [],
        experience: ['beginner', 'intermediate', 'advanced'],
        periodization: [],
        photoUrl: '',
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
          },
        ],
      };
  function calculateWeeks(values: any) {
    let sum = 0;
    if (!values.blocks.length) {
      return 0;
    }

    for (var index in values.blocks) {
      for (let i = 0; i < values.blocks[index].weeks?.length; i++) {
        sum++;
      }
    }
    console.log(sum);
    return sum;
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log(values);
          if (!program || program === undefined) {
            try {
              setSubmitLoading(true);
              await addDoc(collection(db, 'programs'), {
                title: values.title,
                photoUrl: values.photoUrl,
                experience: values.experience,
                category: values.category,
                periodization: values.periodization,
                author: user,
                numberOfWeeks: calculateWeeks(values),
                heartCount: 0,
                summary: value,
                createdDate: serverTimestamp(),
                updatedDate: serverTimestamp(),
                template: values,
              })
                .then((docRef) => {
                  router.push(`/programs/${docRef.id}`);
                })
                .catch((error) => {
                  console.log(error);
                  console.log(values);
                  setSubmitLoading(false);
                });

              notifications.showNotification({
                title: 'Created Program',
                message: `Successfully Created ${values.title}`,
              });
            } catch (error) {
              setSubmitLoading(false);
              console.log('from create : ', error);
            }
          } else {
            try {
              const docRef = doc(db, 'programs', programID);
              const updatedProgram = {
                title: values.title,
                numberOfWeeks: calculateWeeks(values),
                template: values,
                summary: value,
                experience: values.experience,
                category: values.category,
                periodization: values.periodization,
                updatedDate: serverTimestamp(),
              };
              await updateDoc(docRef, updatedProgram);
              setSubmitLoading(false);
              notifications.showNotification({
                title: 'Updated Program',
                message: `Successfully updated ${values.title}`,
              });
            } catch (error) {
              setSubmitLoading(false);
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
        {({ handleSubmit, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Title align="center">
              {program ? `${program.template.title}` : 'Create Your Program'}
            </Title>
            <Tabs style={{ marginTop: 24 }} variant="pills">
              {(!program || programAuthor?.uid === user?.uid) && (
                <Tab label="General">
                  <GeneralSection program={program} errors={errors} />
                </Tab>
              )}

              <Tab label="Summary">
                <div>
                  <RichText value={value} onChange={onChange} />
                </div>
              </Tab>

              {(!program || programAuthor?.uid === user?.uid) && (
                <Tab label="Template">
                  <Group position="left" direction="column" grow>
                    <Title>Program Template</Title>
                    <Divider />
                    <FieldArray
                      name="blocks"
                      render={(blockHelpers) => (
                        <div>
                          <DynamicTemplateForm blockHelpers={blockHelpers} comments={comments} />
                        </div>
                      )}
                    />
                  </Group>
                </Tab>
              )}

              <Tab label="View As Text">
                <TemplateText values={values} />
              </Tab>
            </Tabs>
            <Group position="right" my={42}>
              <Button variant="outline" type="submit" loading={submitLoading}>
                {program ? 'Save' : 'Create'}
              </Button>
            </Group>

            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </form>
        )}
      </Formik>
    </div>
  );
}
