// import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { Button, Group, Tab, Tabs, Text, TypographyStylesProvider } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { FieldArray, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { db } from '../../firebase';
import DynamicTemplateForm from './DynamicTemplateForm';
import { BasicWeek } from './FormConstants';
import GeneralSection from './formSections/GeneralSection';
import TemplateTabs from './formSections/TemplateTabs';
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
  category: string[];
  periodization: string[];
  experience: string[];
  photoUrl: string;

  blocks: Array<{
    name: string;
    summary: string;
    weeks?: Array<{
      name: string;
      summary: string;
      days: Array<{
        name: string;
        summary: string;
        rest: boolean;
        lifts?: Array<{
          name: string;
          id?: string;
          note: string;
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
  const [subLoading, setSubLoading] = useState(false);
  const notifications = useNotifications();
  const router = useRouter();
  useEffect(() => {
    console.log(user);
  }, []);

  const initialValues: Program = program
    ? program.template
    : {
        title: '',
        public: false,
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
                days: BasicWeek,
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
  function calculateWorkouts(b: any) {
    let workouts = [];
    for (let i = 0; i < b.length; i++) {
      for (let k = 0; k < b[i].weeks.length; k++) {
        for (let j = 0; j < b[i].weeks[k].days.length; j++) {
          workouts.push({
            blockIndex: i,
            weekIndex: k,
            dayIndex: j,
            lifts: b[i].weeks[k].days[j].lifts,
            dayName: b[i].weeks[k].days[j].name,
          });
        }
      }
    }

    return workouts;
  }
  async function subscribeToProgram() {
    setSubLoading(true);

    await setDoc(doc(db, `subscribed`, `${user.uid}-${programID}`), {
      currentDay: [0, 0, 0],
      currentIndex: 0,
      paused: false,
      completed: false,
      author: program.author,
      user: user,
      userId: user.uid,
      programId: programID,
      title: program.title,
      lastCompletedDay: null,
      template: program.template.blocks,
      workouts: program.workouts,
    });

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        subscribedPrograms: arrayUnion({
          currentDay: [0, 0, 0],
          paused: false,
          completed: false,
          author: program.author,
          user: user,
          userId: user.uid,
          programId: programID,
          programTitle: program.title,
          lastCompletedDay: null,
          template: program.template.blocks,
          workouts: program.workouts,
        }),
      });
    } catch (err) {
      console.log(err);
    }

    setSubLoading(false);
    router.push(`/dashboard/activity/${user.uid}-${programID}`);
  }

  async function unsubToProgram() {
    setSubLoading(true);
    try {
      await deleteDoc(doc(db, 'subscribed', `${user.uid}-${programID}`));
    } catch (err) {
      console.log(err);
    }

    try {
      //get the object which has the programID
      const pro = user.subscribedPrograms.filter((p: any) => p.programId === programID);
      console.log(pro);
      await updateDoc(doc(db, 'users', user.uid), { subscribedPrograms: arrayRemove(pro[0]) });
    } catch (err) {
      console.log(err);
    }
    setSubLoading(false);
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log(values);
          //create a program
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
                commentCount: 0,
                summary: value,
                createdDate: serverTimestamp(),
                updatedDate: serverTimestamp(),
                template: values,
                activeCount: 0,
                workouts: calculateWorkouts(values.blocks),
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
            //update existing program
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
                photoUrl: values.photoUrl,
                workouts: calculateWorkouts(values.blocks),
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
            <Text
              align="center"
              sx={{
                fontSize: 30,
              }}
            >
              {program ? `${program.template.title}` : 'Create Your Program'}
            </Text>
            <Tabs style={{ marginTop: 24 }}>
              {(!program || programAuthor?.uid === user?.uid) && (
                <Tab label="General">
                  <GeneralSection program={program} errors={errors} />
                </Tab>
              )}

              {(!program || programAuthor?.uid === user?.uid) && (
                <Tab label="Editor">
                  <Group position="left" direction="column" grow>
                    {/* <Divider /> */}
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

              <Tab label="Program">
                <TemplateTabs values={values} />
              </Tab>
              {!program || programAuthor?.uid === user?.uid ? (
                <Tab label="Summary">
                  <RichText value={value} onChange={onChange} />
                </Tab>
              ) : (
                <>
                  {program.summary.length ? (
                    <Tab label="Summary">
                      <TypographyStylesProvider>
                        <div dangerouslySetInnerHTML={{ __html: program.summary }} />
                      </TypographyStylesProvider>
                    </Tab>
                  ) : null}
                </>
              )}
            </Tabs>
            <Group position="right" my={40}>
              {/* {program && !user.subscribedPrograms.some((e: any) => e.programId === programID) && (
                <Button onClick={() => subscribeToProgram()} loading={subLoading}>
                  {!subLoading && 'Subscribe'}
                </Button>
              )} */}
              {program &&
                user.subscribedPrograms.filter((e: any) => e.programId === programID).length ===
                  0 && (
                  <Button onClick={() => subscribeToProgram()} loading={subLoading}>
                    {!subLoading && 'Subscribe'}
                  </Button>
                )}

              {program && user.subscribedPrograms.some((e: any) => e.programId === programID) && (
                <Button onClick={() => unsubToProgram()} loading={subLoading}>
                  {!subLoading && 'Unsubscribe'}
                </Button>
              )}
              <Button variant="outline" type="submit" loading={submitLoading}>
                {program ? 'Save' : 'Create'}
              </Button>
            </Group>

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
}
