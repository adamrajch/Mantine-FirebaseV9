import { ActionIcon, Box, Group, Menu, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { FlexContainer } from '../../FlexContainer';
import RecordSection from './RecordSection';

const emptyLift = {
  name: 'New Lift',
  records: [
    {
      type: 'working',
      sets: 5,
      reps: 5,
      unit: 'lbs',
      rpe: undefined,
      percent: undefined,
      load: undefined,
    },
  ],
};
const emptyRecord = {
  type: 'working',
  sets: 5,
  reps: 5,
  unit: 'lbs',
  rpe: undefined,
  percent: undefined,
  load: undefined,
};
export default function LiftSection({
  blockIndex,
  weekIndex,
  dayIndex,
  workoutIndex,
  workoutHelpers,
  liftHelpers,
  liftIndex,
}: any): ReactElement {
  const { values, handleChange, setFieldValue } = useFormikContext();
  function handleLiftInput(e) {
    handleChange(e);
    if (
      values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex].type ==
      'single'
    ) {
      setFieldValue(
        `blocks[${blockIndex}].weeks[${weekIndex}].days.${dayIndex}.workouts.${workoutIndex}.name`,
        e.currentTarget.value
      );
    }
  }
  return (
    <div>
      <FieldArray
        name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.lifts[${liftIndex}].records`}
      >
        {(recordHelpers) => {
          return (
            <Box
              sx={(theme) => ({
                width: '100%',
                padding: 12,
                marginTop: 2,
                marginBottom: 2,
                borderRadius: 8,
                borderColor: theme.colors.gray[9],
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[5],
                },
              })}
            >
              <FlexContainer justify="space-between" align="center">
                <TextInput
                  autoComplete="false"
                  required
                  placeholder={
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                      .type === 'single'
                      ? 'Add lift'
                      : `Lift ${liftIndex + 1}`
                  }
                  value={
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                      .lifts[liftIndex].name
                  }
                  name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.lifts[${liftIndex}].name`}
                  onChange={(e) => {
                    handleLiftInput(e);
                  }}
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}
                />
                {/* validation for nested input */}
                <Group position="right">
                  {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                    .type !== 'single' &&
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                      .lifts.length > 1 && (
                      <Menu
                        control={
                          <ActionIcon size="lg" color="cyan">
                            <HiOutlineSwitchVertical />
                          </ActionIcon>
                        }
                        zIndex={1200}
                        sx={(theme) => ({
                          color: 'pink',
                          '&:hover': {
                            backgroundColor: theme.colors.gray[1],
                          },
                        })}
                      >
                        {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[
                          workoutIndex
                        ].lifts.map((lift, i) => (
                          <Menu.Item key={i} onClick={() => liftHelpers.swap(liftIndex, i)}>
                            {
                              values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[
                                workoutIndex
                              ].lifts[i].name
                            }
                          </Menu.Item>
                        ))}
                      </Menu>
                    )}

                  <ActionIcon
                    onClick={() => recordHelpers.push(emptyRecord)}
                    size="lg"
                    color="cyan"
                  >
                    <AiOutlinePlus style={{ height: 18, width: 18 }} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() =>
                      setFieldValue(
                        `blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.lifts[${liftIndex}]`,
                        emptyLift
                      )
                    }
                    size="lg"
                    color="cyan"
                  >
                    <BiReset style={{ height: 18, width: 18 }} />
                  </ActionIcon>
                  {values.type !== 'single' && (
                    <ActionIcon
                      onClick={() => liftHelpers.remove(liftIndex)}
                      size="lg"
                      color="cyan"
                    >
                      <AiOutlineClose style={{ height: 18, width: 18 }} />
                    </ActionIcon>
                  )}
                </Group>
              </FlexContainer>
              {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                .lifts[liftIndex].records &&
                values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                  .lifts[liftIndex].records.length > 0 &&
                values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[
                  workoutIndex
                ].lifts[liftIndex].records.map((r, recordIndex: number) => (
                  <div
                    key={recordIndex}
                    style={{
                      marginTop: 2,
                      marginBottom: 2,
                      paddingLeft: 10,
                    }}
                  >
                    <RecordSection
                      workoutIndex={workoutIndex}
                      workoutHelpers={workoutHelpers}
                      blockIndex={blockIndex}
                      weekIndex={weekIndex}
                      dayIndex={dayIndex}
                      liftHelpers={liftHelpers}
                      liftIndex={liftIndex}
                      recordIndex={recordIndex}
                      recordHelpers={recordHelpers}
                      key={liftIndex}
                    />
                  </div>
                ))}
            </Box>
          );
        }}
      </FieldArray>
    </div>
  );
}
