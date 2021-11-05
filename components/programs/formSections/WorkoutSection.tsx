import { ActionIcon, Box, Button, Collapse, Group, Textarea, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { FaRegStickyNote } from 'react-icons/fa';
import { FlexContainer } from '../../FlexContainer';
import LiftSection from './LiftSection';

const emptyLift = {
  name: 'New Lift',
  records: [
    {
      type: 'working',
      load: 135,
      sets: 5,
      reps: 5,
      unit: 'lbs',
      rpe: 8,
      percent: undefined,
    },
  ],
};
export default function WorkoutSection({
  workoutIndex,
  workoutHelpers,
  blockIndex,
  weekIndex,
  dayIndex,
}: any): ReactElement {
  const { values, handleChange } = useFormikContext();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <FieldArray
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts`}
      >
        {(liftHelpers) => {
          return (
            <>
              {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                .type !== 'single' && (
                <Box
                  sx={{
                    marginTop: 12,
                  }}
                >
                  <FlexContainer justify="space-between">
                    <TextInput
                      autoComplete="false"
                      placeholder={
                        values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[
                          workoutIndex
                        ].type === 'single'
                          ? 'Add lift'
                          : 'Cluster Name'
                      }
                      name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].name`}
                      value={
                        values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[
                          workoutIndex
                        ].name
                      }
                      onChange={handleChange}
                    />
                    <Group>
                      <ActionIcon size="lg" color="cyan" onClick={() => setOpen((o) => !o)}>
                        <FaRegStickyNote />
                      </ActionIcon>
                      <Button
                        onClick={() => liftHelpers.push(emptyLift)}
                        leftIcon={<AiOutlinePlus />}
                        size="xs"
                      >
                        Lift
                      </Button>
                      <ActionIcon
                        size="lg"
                        color="cyan"
                        onClick={() => workoutHelpers.remove(workoutIndex)}
                      >
                        <AiOutlineDelete />
                      </ActionIcon>
                    </Group>
                  </FlexContainer>
                  <Collapse in={open} my={8}>
                    <Textarea
                      placeholder="Add directions/tips here!"
                      name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].note`}
                      value={
                        values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[
                          workoutIndex
                        ].note
                      }
                      onChange={handleChange}
                    />
                  </Collapse>
                </Box>
              )}
              {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                .lifts &&
                values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                  .lifts.length > 0 &&
                values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[
                  workoutIndex
                ].lifts.map((l, liftIndex: number) => (
                  <div
                    key={liftIndex}
                    style={{
                      marginTop: 10,
                      paddingLeft: 10,
                    }}
                  >
                    <LiftSection
                      workoutIndex={workoutIndex}
                      workoutHelpers={workoutHelpers}
                      blockIndex={blockIndex}
                      weekIndex={weekIndex}
                      dayIndex={dayIndex}
                      liftHelpers={liftHelpers}
                      liftIndex={liftIndex}
                      key={liftIndex}
                    />
                  </div>
                ))}
            </>
          );
        }}
      </FieldArray>
    </div>
  );
}
