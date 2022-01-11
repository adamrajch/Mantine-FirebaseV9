import {
  ActionIcon,
  Box,
  Button,
  Center,
  Collapse,
  Group,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiOutlineCopy, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { FaDumbbell, FaRegStickyNote, FaStickyNote } from 'react-icons/fa';
import { RiZzzFill, RiZzzLine } from 'react-icons/ri';
import { Lift } from '../../../types/types';
import { BasicLifts } from '../FormConstants';
import LiftSection from './LiftSection';
const newLift: Lift = {
  name: 'New Lift',
  note: '',
  records: [
    {
      sets: 5,
      reps: 5,
      unit: 'lbs',
      rpe: null,
      percent: null,
    },
  ],
};

export default function DaySection({
  dayIndex,
  blockIndex,
  weekIndex,
  dayHelpers,
}: any): ReactElement {
  const { handleChange } = useFormikContext();
  const { values, setFieldValue }: any = useFormikContext();
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery('(min-width: 900px)');
  function copyLift(dayHelpers: any) {
    if (dayIndex < 6) {
      const newDay = {
        ...values.blocks[blockIndex].weeks[weekIndex].days[dayIndex],
        name: `Day ${values.blocks[blockIndex].weeks[weekIndex].days.length + 1}`,
      };
      dayHelpers.push(newDay);
    }
  }
  function handleRest(b: boolean) {
    if (b === true) {
      setFieldValue(`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].rest`, true);
      setFieldValue(`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts`, []);
      setFieldValue(`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}]`, {
        name: 'Rest Day',
        summary: 'Chill out today, you deserve it  :) ',
        rest: true,
        lifts: [],
      });
    } else {
      setFieldValue(`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].rest`, false);
      setFieldValue(
        `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts`,
        BasicLifts
      );
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <FieldArray name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts`}>
        {(liftHelpers) => {
          return (
            <Box
              sx={(theme) => ({
                width: '100%',
                padding: matches ? '12px' : '6px',
                borderRadius: 8,
                border: '2px solid',
                borderColor: theme.colors.gray[7],
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[5],
              })}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                {matches && <Text size="xs">{`W${weekIndex + 1}D${dayIndex + 1}`}</Text>}

                <TextInput
                  size="sm"
                  value={values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].name}
                  name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].name`}
                  variant="default"
                  onChange={handleChange}
                />

                <Group position="right" noWrap spacing={4}>
                  <Tooltip label="Edit Summary" color="cyan" withArrow>
                    <ActionIcon size="lg" color="cyan" onClick={() => setOpen((o) => !o)}>
                      {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].summary.length ? (
                        <FaStickyNote />
                      ) : (
                        <FaRegStickyNote />
                      )}
                    </ActionIcon>
                  </Tooltip>
                  {values.blocks[blockIndex].weeks[weekIndex].days.length < 7 && (
                    <Tooltip label="Duplicate Day" color="cyan" withArrow>
                      <ActionIcon size="lg" color="cyan" onClick={() => copyLift(dayHelpers)}>
                        <AiOutlineCopy />
                      </ActionIcon>
                    </Tooltip>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => liftHelpers.push(newLift)}
                    leftIcon={<AiOutlinePlus />}
                    size="xs"
                    compact
                  >
                    Lift
                  </Button>
                  {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].rest === false ? (
                    <ActionIcon
                      size="lg"
                      color="cyan"
                      onClick={() => {
                        handleRest(true);
                        console.log(values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].rest);
                      }}
                    >
                      <RiZzzFill />
                    </ActionIcon>
                  ) : (
                    <ActionIcon
                      size="lg"
                      color="cyan"
                      onClick={() => {
                        handleRest(false);
                        console.log(values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].rest);
                      }}
                    >
                      <FaDumbbell />
                    </ActionIcon>
                  )}

                  <ActionIcon
                    size="lg"
                    color="cyan"
                    onClick={() => {
                      dayHelpers.remove(dayIndex);
                    }}
                  >
                    <AiOutlineDelete />
                  </ActionIcon>
                </Group>
              </div>
              <Collapse in={open} my={8}>
                <Textarea
                  placeholder="Add a summary, any tips or important queues"
                  name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].summary`}
                  value={values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].summary}
                  onChange={handleChange}
                />
              </Collapse>
              {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].rest === true ? (
                <Center style={{ height: 80 }}>
                  <Title order={2}>
                    Rest Day <RiZzzLine />
                  </Title>
                </Center>
              ) : (
                <Group direction="column" grow>
                  {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts &&
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts.length > 0 &&
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts.map(
                      (l: any, liftIndex: number) => (
                        <LiftSection
                          blockIndex={blockIndex}
                          weekIndex={weekIndex}
                          dayIndex={dayIndex}
                          liftHelpers={liftHelpers}
                          liftIndex={liftIndex}
                          key={liftIndex}
                        />
                      )
                    )}
                </Group>
              )}
            </Box>
          );
        }}
      </FieldArray>
    </div>
  );
}
