import { ActionIcon, Badge, Box, Button, Group, Modal, Text, Title } from '@mantine/core';
import { doc, updateDoc } from 'firebase/firestore';
import React, { ReactElement, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdFullscreen, MdToday } from 'react-icons/md';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
import ProgramWorkoutForm from '../workouts/ProgramWorkoutForm';
import FullTemplate from './FullTemplate';

export default function ActivityDash({ program, id }: any): ReactElement {
  const curr = program.currentDay;
  const blocks = program.template;
  const { workouts, currentIndex } = program;
  const { user } = useAuth();
  console.log(program);
  const [currIndex, setCurrIndex] = useState<number>(currentIndex);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEdit] = useState(false);
  const workout = workouts[currIndex];
  console.log(workout);
  function handleRight() {
    if (editing) {
      setEdit(false);
    }
    if (currIndex < workouts.length - 1) {
      setCurrIndex((prev) => prev + 1);
    }
  }
  function handleLeft() {
    if (editing) {
      setEdit(false);
    }
    if (currIndex > 0) {
      setCurrIndex((prev) => prev - 1);
    }
  }

  async function handleSkip() {
    console.log('skipping');
    if (currIndex < workouts.length - 1) {
      await updateDoc(doc(db, 'subscribed', id), {
        currentIndex: currentIndex + 1,
      });
      setCurrIndex(currentIndex + 1);
    }
  }

  async function handleSetCurrent() {
    await updateDoc(doc(db, 'subscribed', id), {
      currentIndex: currIndex,
    });
  }
  console.log(program);

  return (
    <Box
      sx={(theme) => ({
        padding: 16,
        borderRadius: theme.radius.md,

        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
        boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
        '&:hover': {
          boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
        },
      })}
    >
      <Group position="apart" mb={24}>
        <Text>{`B${workouts[currIndex].blockIndex + 1}W${workouts[currIndex].weekIndex + 1}D${
          workouts[currIndex].dayIndex + 1
        }`}</Text>
        <Title align="center" order={2}>
          {program.title}
        </Title>
        <Group position="right">
          {currIndex !== currentIndex ? (
            <ActionIcon onClick={() => setCurrIndex(currentIndex)}>
              <MdToday />
            </ActionIcon>
          ) : (
            <ActionIcon>
              <MdToday color="cyan" />
            </ActionIcon>
          )}
          <ActionIcon onClick={() => setModalOpen(true)}>
            <MdFullscreen />
          </ActionIcon>
        </Group>
      </Group>

      {workouts[currIndex] && (
        <Box>
          <Group position="apart" noWrap>
            <Group position="apart" noWrap style={{ flex: 1 }}>
              <Box style={{ flex: 1, flexBasis: 0 }}>
                {currIndex !== 0 ? (
                  <ActionIcon onClick={handleLeft}>
                    <BsChevronLeft />
                  </ActionIcon>
                ) : (
                  <Badge variant="filled">First Day</Badge>
                )}
              </Box>

              <Title align="center" order={3}>
                {workouts[currIndex].dayName}
              </Title>

              <Group position="right" style={{ flex: 1, flexBasis: 0 }}>
                {currIndex < workouts.length - 1 ? (
                  <ActionIcon onClick={handleRight}>
                    <BsChevronRight />
                  </ActionIcon>
                ) : (
                  <Badge variant="filled">Last Day</Badge>
                )}
              </Group>
            </Group>

            <>
              <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                transition="fade"
                transitionDuration={400}
                transitionTimingFunction="ease"
                size="60%"
              >
                <FullTemplate blocks={blocks} title={program.title} />
              </Modal>
            </>
          </Group>

          {editing ? (
            <ProgramWorkoutForm
              user={user}
              workout={workouts[currIndex]}
              setEdit={setEdit}
              programId={program.programId}
              programTitle={program.title}
              currentIndex={currIndex}
              setCurrIndex={setCurrIndex}
              workoutsLength={workouts.length}
              id={id}
            />
          ) : (
            <Group direction="column" grow my={16}>
              {workouts[currIndex].lifts.map((l: any, li: number) => (
                <Group
                  key={li}
                  position="apart"
                  sx={(theme) => ({
                    padding: 16,
                    borderRadius: theme.radius.md,
                    alignItems: 'flex-start',
                    backgroundColor:
                      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
                    boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
                    '&:hover': {
                      boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
                    },
                  })}
                >
                  <Text>{l.name} </Text>

                  <Group direction="column">
                    {l.records.map((r: any, ri: number) => (
                      <Text key={ri}>
                        {`${r.sets} x ${r.reps} ${r.rpe ? `@${r.rpe}` : ''} ${
                          r.percent ? `${r.percent}%` : ''
                        }${r.load ? `@${r.load}` : ''} `}
                      </Text>
                    ))}
                  </Group>
                </Group>
              ))}
            </Group>
          )}

          {!editing && (
            <Group position="center">
              {workout.rest ? (
                <></>
              ) : (
                <Button
                  onClick={() => {
                    setEdit(true);
                  }}
                  variant="outline"
                >
                  Log Workout
                </Button>
              )}

              {currentIndex === currIndex && <Button onClick={handleSkip}>Skip</Button>}

              {currentIndex !== currIndex && (
                <Button onClick={handleSetCurrent}>Set As Current</Button>
              )}
            </Group>
          )}
        </Box>
      )}
    </Box>
  );
}
