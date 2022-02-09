import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Container,
  Group,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import { doc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiNote } from 'react-icons/bi';
import { db } from '../../firebase';
import { handleCatColor, handleExpColor, handlePColor } from '../../utils/ColorHelper';

interface Props {
  program: any;
  programID: string;
  user: any;
  programAuthor: any;
}

export default function ViewProgramPage({ program, programID, user, programAuthor }: Props) {
  const theme = useMantineTheme();
  const [listView, setListView] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const notifications = useNotifications();
  const router = useRouter();
  const modals = useModals();
  const p = program.template;
  const summaryModal = (title: string, summary: string) => {
    const id = modals.openModal({
      title: `${title} Summary`,
      children: <>{summary}</>,
    });
  };
  console.log(program);
  const calcTotalSets = (b: number, w: number, d: number) => {
    let sum = 0;
    for (let i = 0; i < p.blocks[b].weeks[w].days[d].lifts.length; i++) {
      for (let j = 0; j < p.blocks[b].weeks[w].days[d].lifts[i].records.length; j++) {
        sum = sum + p.blocks[b].weeks[w].days[d].lifts[i].records[j].sets;
      }
    }
    return sum;
  };
  const calcTotalReps = (b: number, w: number, d: number) => {
    let sum = 0;
    for (let i = 0; i < p.blocks[b].weeks[w].days[d].lifts.length; i++) {
      for (let j = 0; j < p.blocks[b].weeks[w].days[d].lifts[i].records.length; j++) {
        sum =
          sum +
          p.blocks[b].weeks[w].days[d].lifts[i].records[j].reps *
            p.blocks[b].weeks[w].days[d].lifts[i].records[j].sets;
      }
    }
    return sum;
  };

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
    <Box>
      <Group direction="column" grow my={20} spacing={6}>
        <Group position="apart" grow>
          <Title order={2}>{p.title}</Title>
          <Group position="right">
            {user.subscribedPrograms.filter((e: any) => e.programId === programID).length === 0 && (
              <Button onClick={() => subscribeToProgram()} loading={subLoading} variant="outline">
                {!subLoading && 'Subscribe'}
              </Button>
            )}

            {user.subscribedPrograms.some((e: any) => e.programId === programID) && (
              <Button onClick={() => unsubToProgram()} loading={subLoading} variant="outline">
                {!subLoading && 'UnSubscribe'}
              </Button>
            )}
          </Group>
        </Group>

        <Text size="lg" color="cyan" style={{ cursor: 'pointer' }}>
          <Text component="span" color="dimmed">
            Author:{' '}
          </Text>
          {programAuthor.name}
        </Text>

        <Text># of Weeks: {program.numberOfWeeks}</Text>
        <Group position="left" noWrap spacing={4}>
          {p.experience.map((e: string, i: number) => {
            return (
              <Badge color={handleExpColor(e)} size="sm" key={e}>
                {e}
              </Badge>
            );
          })}
        </Group>

        <Group position="left" spacing={4}>
          {p.category.sort().map((e: string, i: number) => {
            return (
              <Badge variant="filled" color={handleCatColor(e)} size="md" radius={2} key={e}>
                {e}
              </Badge>
            );
          })}
        </Group>
        <Group position="left" noWrap spacing={4}>
          {p.periodization.sort().map((e: string, i: number) => (
            <Badge variant="outline" color={handlePColor(e)} size="md" radius={2} key={e}>
              {e}
            </Badge>
          ))}
        </Group>
        {/* <Button>List View</Button> */}

        <Tabs variant="outline">
          {p.blocks.map((block: any, i: number) => (
            <Tabs.Tab key={i} label={block.name}>
              <Tabs variant="pills">
                {p.blocks[i].weeks &&
                  p.blocks[i].weeks.length > 0 &&
                  p.blocks[i].weeks.map((week: any, w: number) => (
                    <Tabs.Tab key={w} label={week.name}>
                      <Container size="sm">
                        <Group position="right">
                          {week.summary.length > 0 && (
                            <Button
                              onClick={() => summaryModal('Week', week.summary)}
                              size="xs"
                              variant="outline"
                            >
                              Week Summary
                            </Button>
                          )}
                          {block.summary.length > 0 && (
                            <Button
                              onClick={() => summaryModal('Block', block.summary)}
                              size="xs"
                              variant="outline"
                            >
                              Block Summary
                            </Button>
                          )}
                        </Group>

                        <Group direction="column" position="center" grow>
                          {p.blocks[i].weeks[w].days.length > 0 &&
                            p.blocks[i].weeks[w].days.map((day: any, dayIndex: number) => (
                              <Group
                                direction="column"
                                grow
                                key={dayIndex}
                                my={12}
                                sx={(theme) => ({
                                  padding: 16,
                                  borderRadius: theme.radius.md,
                                  backgroundColor:
                                    theme.colorScheme === 'dark'
                                      ? theme.colors.dark[8]
                                      : theme.colors.dark[1],
                                  boxShadow: '0px 0px  0px   #0f0f0f, -2px -2px 6px #153d4d',
                                  '&:hover': {
                                    boxShadow: '4px 4px 10px  #0f0f0f, -2px -2px 6px #14698b',
                                  },
                                })}
                              >
                                <Group position="apart">
                                  <Text size="sm">{`W${w + 1}D${dayIndex + 1}`}</Text>
                                  <Title order={3} align="center">
                                    {day.name}
                                  </Title>
                                  <div>
                                    {day.summary.length > 0 && (
                                      <ActionIcon onClick={() => summaryModal('Day', day.summary)}>
                                        <BiNote />
                                      </ActionIcon>
                                    )}
                                  </div>
                                </Group>

                                {day.rest ? (
                                  <Center> </Center>
                                ) : (
                                  <Group grow direction="column" spacing={0}>
                                    {p.blocks[i].weeks[w].days[dayIndex].lifts.length > 0 &&
                                      p.blocks[i].weeks[w].days[dayIndex].lifts !== undefined &&
                                      p.blocks[i].weeks[w].days[dayIndex].lifts.map(
                                        (l: any, lI: number) => (
                                          <Group key={lI} grow>
                                            <Text>
                                              {lI + 1}. {l.name}
                                            </Text>
                                            <Group direction="column" grow>
                                              {l.records.map((r: any, rI: number) => (
                                                <Text key={rI}>
                                                  {`${r.sets} x ${r.reps} ${
                                                    r.rpe ? `@${r.rpe}` : ''
                                                  } ${r.percent ? `${r.percent}%` : ''}${
                                                    r.load ? `@${r.load}` : ''
                                                  } `}
                                                </Text>
                                              ))}
                                            </Group>
                                          </Group>
                                        )
                                      )}

                                    {p.blocks[i].weeks[w].days[dayIndex].lifts &&
                                      p.blocks[i].weeks[w].days[dayIndex].lifts !== undefined &&
                                      p.blocks[i].weeks[w].days[dayIndex].lifts.length > 0 && (
                                        <Group>
                                          <Text>
                                            <Text component="span" color="cyan">
                                              Total Sets:{' '}
                                            </Text>
                                            {calcTotalSets(i, w, dayIndex)}
                                          </Text>
                                          <Text>
                                            <Text component="span" color="cyan">
                                              Total Sets:{' '}
                                            </Text>
                                            {calcTotalReps(i, w, dayIndex)}
                                          </Text>
                                        </Group>
                                      )}
                                  </Group>
                                )}
                              </Group>
                            ))}
                        </Group>
                      </Container>
                    </Tabs.Tab>
                  ))}
              </Tabs>
            </Tabs.Tab>
          ))}
        </Tabs>
      </Group>
    </Box>
  );
}
