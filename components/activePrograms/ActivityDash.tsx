import { ActionIcon, Box, Container, Group, Modal, Text, Title } from '@mantine/core';
import React, { ReactElement, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdFullscreen, MdToday } from 'react-icons/md';
import FullTemplate from './FullTemplate';

export default function ActivityDash({ program }: any): ReactElement {
  const curr = program.currentDay;
  const blocks = program.template;
  const { workouts, currentIndex } = program;

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
    <Box>
      <Title>{program.title}</Title>

      {workouts[currIndex] && (
        <Box>
          <Group position="apart">
            <Text>{`B${workouts[currIndex].blockIndex + 1}W${workouts[currIndex].weekIndex + 1}D${
              workouts[currIndex].dayIndex + 1
            }`}</Text>
            <ActionIcon onClick={handleLeft}>
              <BsChevronLeft />
            </ActionIcon>

            <Title align="center">{workouts[currIndex].dayName}</Title>
            <ActionIcon onClick={handleRight}>
              <BsChevronRight />
            </ActionIcon>
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
              {currIndex !== currentIndex ? (
                <ActionIcon onClick={() => setCurrIndex(currentIndex)}>
                  <MdToday />
                </ActionIcon>
              ) : (
                <ActionIcon>
                  <MdToday color="cyan" />
                </ActionIcon>
              )}

              <Group position="center">
                <ActionIcon onClick={() => setModalOpen(true)}>
                  <MdFullscreen />
                </ActionIcon>
              </Group>
            </>
          </Group>
          <Container size="sm">
            <Group direction="column" grow my={16}>
              {workouts[currIndex].lifts.map((l: any, li: number) => (
                <Group position="apart">
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
                </Group>
              ))}
            </Group>
          </Container>
        </Box>
      )}
    </Box>
  );
}
