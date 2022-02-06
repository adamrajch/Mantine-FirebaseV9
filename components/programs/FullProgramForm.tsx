// import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { Box, Button, Group, Tab, Tabs, Title, TypographyStylesProvider } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { FieldArray, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { db } from '../../firebase';
import { Program } from '../../types/types';
import DynamicTemplateForm from './DynamicTemplateForm';
import { BasicDays } from './FormConstants';
import GeneralSection from './formSections/GeneralSection';
import TemplateTabs from './formSections/TemplateTabs';
import RichText from './RichText';

const ProgramSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  experience: Yup.array().of(Yup.string()).min(1, 'Check atleast one'),
  category: Yup.array().of(Yup.string()).min(1, 'Check atleast one'),
  photoUrl: Yup.string().min(4, 'Too Short!'),
});
// type Program = {
//   title: string;
//   public: boolean;
//   category: string[];
//   periodization: string[];
//   experience: string[];
//   photoUrl: string;

//   blocks: Array<{
//     name: string;
//     summary: string;
//     weeks?: Array<{
//       name: string;
//       summary: string;
//       days: Array<{
//         name: string;
//         summary: string;
//         rest: boolean;
//         lifts?: Array<{
//           name: string;
//           id?: string;
//           note: string;
//           type: string;
//           records?: Array<{
//             type: string;
//             sets: number;
//             reps: number;
//             rpe: number | null;
//             load: number | null;
//             unit: string | null;
//             percent: number | null;
//           }>;
//         }>;
//       }>;
//     }>;
//   }>;
// };
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
                days: BasicDays,
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
            rest: b[i].weeks[k].days[j].rest,
          });
        }
      }
    }

    return workouts;
  }
  async function subscribeToProgram() {
    setSubLoading(true);

    const batch = writeBatch(db);
    const subbedRef = doc(db, `subscribed`, `${user.uid}-${programID}`);

    batch.set(subbedRef, {
      currentDay: [0, 0, 0],
      currentIndex: 0,
      paused: false,
      completed: false,
      author: {
        email: user.email,
        name: user.name,
        uid: user.uid,
      },
      userId: user.uid,
      programId: programID,
      title: program.title,
      lastCompletedDay: null,
      template: program.template.blocks,
      workouts: program.workouts,
    });

    const userRef = doc(db, 'users', user.uid);
    let newArr = user.subscribedPrograms;
    newArr.push({
      paused: false,
      completed: false,
      author: {
        email: user.email,
        name: user.name,
        uid: user.uid,
      },
      userId: user.uid,
      programId: programID,
      programTitle: program.title,
      lastCompletedDay: null,
    });

    batch.update(userRef, { subscribedPrograms: newArr });

    await batch.commit();
    setSubLoading(false);
    // router.push(`/dashboard/activity/${user.uid}-${programID}`);
  }

  async function unsubToProgram() {
    setSubLoading(true);

    const batch = writeBatch(db);
    const subbedRef = doc(db, `subscribed`, `${user.uid}-${programID}`);

    batch.delete(subbedRef);

    const userRef = doc(db, 'users', user.uid);
    let newArr = user.subscribedPrograms.filter((p: any) => p.programId !== programID);
    batch.update(userRef, { subscribedPrograms: newArr });

    // try {
    //   //get the object which has the programID
    //   const pro = user.subscribedPrograms.filter((p: any) => p.programId === programID);
    //   console.log(pro);
    //   await updateDoc(doc(db, 'users', user.uid), { subscribedPrograms: arrayRemove(pro[0]) });
    // } catch (err) {
    //   console.log(err);
    // }
    await batch.commit();
    setSubLoading(false);
  }
  return (
    <>
      <Title align="center" order={2}>
        {program ? `${program.template.title}` : 'Create Program'}
      </Title>
      <Box
        my={12}
        sx={(theme) => ({
          padding: 8,
          borderRadius: theme.radius.md,
          alignItems: 'flex-start',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
          boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
        })}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            console.log(values);
            console.log(calculateWorkouts(values.blocks));

            if (!program || program === undefined) {
              try {
                setSubmitLoading(true);
                await addDoc(collection(db, 'programs'), {
                  title: values.title,
                  photoUrl: values.photoUrl,
                  experience: values.experience,
                  category: values.category,
                  periodization: values.periodization,
                  author: {
                    email: user.email,
                    name: user.name,
                    uid: user.uid,
                  },
                  numberOfWeeks: calculateWeeks(values),
                  heartCount: 0,
                  commentCount: 0,
                  summary: value,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp(),
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
                  updatedAt: serverTimestamp(),
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
              <Tabs style={{ marginTop: 24 }}>
                {(!program || programAuthor?.uid === user?.uid) && (
                  <Tab label="General">
                    <GeneralSection program={program} errors={errors} />
                  </Tab>
                )}

                {(!program || programAuthor?.uid === user?.uid) && (
                  <Tab label="Editor">
                    <Group position="left" direction="column" grow>
                      <FieldArray
                        name="blocks"
                        render={(blockHelpers) => (
                          <DynamicTemplateForm blockHelpers={blockHelpers} comments={comments} />
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
                    <Button
                      onClick={() => subscribeToProgram()}
                      loading={subLoading}
                      variant="outline"
                    >
                      {!subLoading && 'Subscribe'}
                    </Button>
                  )}

                {program && user.subscribedPrograms.some((e: any) => e.programId === programID) && (
                  <Button onClick={() => unsubToProgram()} loading={subLoading} variant="outline">
                    {!subLoading && 'Unsubscribe'}
                  </Button>
                )}
                <Button variant="outline" type="submit" loading={submitLoading}>
                  {program ? 'Save' : 'Create'}
                </Button>
              </Group>

              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
}
