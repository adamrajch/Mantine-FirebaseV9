import { ActionIcon, Box, Button, Collapse, Group, Textarea, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { FaRegStickyNote } from 'react-icons/fa';
import { FlexContainer } from '../../FlexContainer';

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
        name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.lifts`}
      >
        {(liftHelpers) => {
          return (
            <>
              {values.type !== 'single' && (
                <Box
                  sx={{
                    marginTop: 12,
                  }}
                >
                  <FlexContainer justify="space-between">
                    <TextInput
                      autoComplete="false"
                      required
                      label={
                        values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[
                          workoutIndex
                        ].type === 'single'
                          ? ''
                          : 'Add Cluster'
                      }
                      placeholder={
                        values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[
                          workoutIndex
                        ].type === 'single'
                          ? 'Add lift'
                          : 'Cluster Name'
                      }
                      //   error={errors.name && 'Name must be between 3 and 25 characters'}
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
                      name="note"
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
            </>
          );
        }}
      </FieldArray>
    </div>
  );
}
