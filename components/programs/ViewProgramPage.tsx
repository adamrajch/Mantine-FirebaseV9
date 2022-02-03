import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Col,
  Grid,
  Group,
  Table,
  Tabs,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import { doc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiNote } from 'react-icons/bi';
import { FaRegStickyNote } from 'react-icons/fa';
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
      <Group direction="column" grow my={20}>
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
        <Tabs variant="outline">
          {p.blocks.map((block: any, i: number) => (
            <Tabs.Tab key={i} label={block.name}>
              <Tabs variant="pills">
                {p.blocks[i].weeks &&
                  p.blocks[i].weeks.length > 0 &&
                  p.blocks[i].weeks.map((week: any, w: number) => (
                    <Tabs.Tab key={w} label={week.name}>
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
                      <Group direction="column" grow style={{ marginTop: 12, width: '100%' }}>
                        <Grid justify="space-around">
                          {p.blocks[i].weeks[w].days.length > 0 &&
                            p.blocks[i].weeks[w].days.map((day: any, dayIndex: number) => (
                              <Col span={12} lg={12} key={dayIndex}>
                                <Group
                                  direction="column"
                                  grow
                                  key={dayIndex}
                                  style={{
                                    border: '1px solid ',
                                    borderRadius: 5,
                                    padding: '12px 24px',
                                    borderColor: theme.colors.dark[4],
                                  }}
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      marginBottom: 8,
                                    }}
                                  >
                                    <Text size="sm">{`W${w + 1}D${dayIndex + 1}`}</Text>
                                    <Title
                                      order={3}
                                      align="center"
                                      style={{ color: theme.colors.dark[2] }}
                                    >
                                      {day.name}
                                    </Title>
                                    <div>
                                      {day.summary.length > 0 && (
                                        <ActionIcon
                                          onClick={() => summaryModal('Day', day.summary)}
                                        >
                                          <BiNote />
                                        </ActionIcon>
                                      )}
                                    </div>
                                  </div>

                                  {day.rest ? (
                                    <Center>{/* <Title order={2}>Rest Day</Title> */}</Center>
                                  ) : (
                                    <>
                                      <Table highlightOnHover>
                                        <thead>
                                          <tr>
                                            <th>Movement</th>
                                            <th>Sets</th>
                                            <th>Reps</th>
                                            <th>RPE</th>
                                            <th>%</th>
                                            <th>Load</th>
                                            <th>Note</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {p.blocks[i].weeks[w].days[dayIndex].lifts.length > 0 &&
                                            p.blocks[i].weeks[w].days[dayIndex].lifts !==
                                              undefined &&
                                            p.blocks[i].weeks[w].days[dayIndex].lifts.map(
                                              (l: any, liftIndex: number) => (
                                                <React.Fragment key={liftIndex}>
                                                  {l.records.map((t: any, tIndex: number) => (
                                                    <tr key={tIndex}>
                                                      <td>{tIndex == 0 && l.name}</td>
                                                      <td>{t.sets}</td>
                                                      <td>{t.reps}</td>
                                                      <td>{t.rpe}</td>
                                                      <td>{t.percent}</td>
                                                      <td>{t.load}</td>
                                                      <td>
                                                        {tIndex == 0 && l.note && (
                                                          <Tooltip
                                                            wrapLines
                                                            withArrow
                                                            transition="fade"
                                                            transitionDuration={200}
                                                            label={l.note}
                                                          >
                                                            <FaRegStickyNote color="cyan" />
                                                          </Tooltip>
                                                        )}
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </React.Fragment>
                                              )
                                            )}
                                        </tbody>
                                      </Table>
                                      {p.blocks[i].weeks[w].days[dayIndex].lifts &&
                                        p.blocks[i].weeks[w].days[dayIndex].lifts !== undefined &&
                                        p.blocks[i].weeks[w].days[dayIndex].lifts.length > 0 && (
                                          <Group>
                                            <div>Total Sets: {calcTotalSets(i, w, dayIndex)}</div>
                                            <div>Total Reps: {calcTotalReps(i, w, dayIndex)}</div>
                                          </Group>
                                        )}
                                    </>
                                  )}
                                </Group>
                              </Col>
                            ))}
                        </Grid>
                      </Group>
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
