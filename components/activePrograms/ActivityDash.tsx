import { ActionIcon, Box, Button, Container, Group, Modal, Text, Title } from '@mantine/core';
import React, { ReactElement, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdFullscreen, MdToday } from 'react-icons/md';
import { useAuth } from '../../context/auth';
import CreateWorkoutForm from '../workouts/CreateWorkoutForm';
import FullTemplate from './FullTemplate';

export default function ActivityDash({ program }: any): ReactElement {
  const curr = program.currentDay;
  const blocks = program.template;
  const { workouts, currentIndex } = program;
  const { user } = useAuth();
  console.log(workouts);
  const [currIndex, setCurrIndex] = useState<number>(currentIndex);

  const [modalOpen, setModalOpen] = useState(false);

  function handleRight() {
    if (currIndex < workouts.length - 1) {
      setCurrIndex((prev) => prev + 1);
    }
  }
  function handleLeft() {
    if (currIndex > 0) {
      setCurrIndex((prev) => prev - 1);
    }
  }

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
          <Container size="sm">
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
                      <Text>
                        {`${r.sets} x ${r.reps} ${r.rpe ? `@${r.rpe}` : ''} ${
                          r.percent ? `${r.percent}%` : ''
                        }${r.load ? `@${r.load}` : ''} `}
                      </Text>
                    ))}
                  </Group>

                  <Modal
                    opened={modalOpen}
                    onClose={() => setModalOpen(false)}
                    transition="fade"
                    transitionDuration={400}
                    transitionTimingFunction="ease"
                    size="60%"
                  >
                    <Text>{workouts[currentIndex]}</Text>
                    <CreateWorkoutForm user={user} workout={workouts[currentIndex]} />
                  </Modal>
                </Group>
              ))}
              <Button>Complete Workout</Button>
            </Group>
          </Container>
        </Box>
      )}
    </Box>
  );
}
