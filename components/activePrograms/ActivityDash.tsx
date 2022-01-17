import { ActionIcon, Box, Button, Group, Modal, Text, Title } from '@mantine/core';
import React, { ReactElement, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdFullscreen, MdToday } from 'react-icons/md';
import { useAuth } from '../../context/auth';
import ProgramWorkoutForm from '../workouts/ProgramWorkoutForm';
import FullTemplate from './FullTemplate';

export default function ActivityDash({ program, id }: any): ReactElement {
  const curr = program.currentDay;
  const blocks = program.template;
  const { workouts, currentIndex } = program;
  const { user } = useAuth();
  console.log(workouts);
  const [currIndex, setCurrIndex] = useState<number>(currentIndex);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEdit] = useState(false);

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
  console.log(program);

  return (
    <Box
      sx={(theme) => ({
        padding: 16,
        borderRadius: theme.radius.md,

        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
        boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
        // '&:hover': {
        //   boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
        // },
      })}
    >
      <Title align="center" mb={24}>
        {program.title}
      </Title>

      {workouts[currIndex] && (
        <Box>
          <Group position="apart" grow>
            <Text>{`B${workouts[currIndex].blockIndex + 1}W${workouts[currIndex].weekIndex + 1}D${
              workouts[currIndex].dayIndex + 1
            }`}</Text>
            <ActionIcon onClick={handleLeft}>
              <BsChevronLeft />
            </ActionIcon>

            <Title align="center" order={2}>
              {workouts[currIndex].dayName}{' '}
            </Title>
            <ActionIcon onClick={handleRight}>
              <BsChevronRight />
            </ActionIcon>

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
            <>
              <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                transition="fade"
                transitionDuration={400}
                transitionTimingFunction="ease"
                size="60%"
              >
                <FullTemplate blocks={blocks} />
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
              <Button
                onClick={() => {
                  setEdit(true);
                }}
                variant="outline"
              >
                Log Workout
              </Button>
            </Group>
          )}
        </Box>
      )}
    </Box>
  );
}
