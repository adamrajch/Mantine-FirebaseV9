import { ActionIcon, Box, Button, Group, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { Workout } from '../../../types/types';
import CreateActivityModal from '../CreateActivityModal';
import WorkoutSection from './WorkoutSection';
const emptyWorkout: Workout = {
  name: 'New Lift',
  type: 'single',
  note: '',
  lifts: [
    {
      name: 'New Lift',
      records: [
        {
          type: 'working',
          load: null,
          sets: 5,
          reps: 5,
          unit: 'lbs',
          rpe: null,
          percent: null,
        },
      ],
    },
  ],
};

const emptyCluster: Workout = {
  name: 'New Cluster',
  type: 'cluster',
  note: '',
  lifts: [
    {
      name: 'Lift 1',
      records: [
        {
          type: 'working',
          sets: 5,
          reps: 5,
          unit: 'lbs',
          rpe: null,
          percent: null,
          load: null,
        },
      ],
    },
    {
      name: 'Lift 2',
      records: [
        {
          type: 'working',
          sets: 5,
          reps: 5,
          unit: 'lbs',
          rpe: null,
          percent: null,
          load: null,
        },
      ],
    },
  ],
};
export default function DaySection({
  dayIndex,
  blockIndex,
  weekIndex,
  dayHelpers,
}: any): ReactElement {
  const { values, handleChange, setFieldValue } = useFormikContext();

  function addWorkout(workout: any, values: any, dayHelpers: any) {
    console.log(workout);
    console.log(values);
    dayHelpers.push(workout);
  }
  return (
    <Box style={{ marginTop: 40 }}>
      <FieldArray
        key={dayIndex}
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts`}
        render={(workoutHelpers) => (
          <>
            <Group direction="column" grow>
              <Group position="apart" spacing={2} my="md">
                <TextInput
                  label="Day Name"
                  size="lg"
                  autoComplete="false"
                  variant="default"
                  placeholder="$Day"
                  name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.name`}
                  value={values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].name}
                  onChange={handleChange}
                  styles={{
                    input: {
                      borderRadius: 'none',
                    },
                  }}
                />
                <Group>
                  <Button
                    onClick={() => workoutHelpers.push(emptyWorkout)}
                    leftIcon={<AiOutlinePlus />}
                    variant="outline"
                    size="xs"
                  >
                    Lift
                  </Button>

                  <Button
                    onClick={() => workoutHelpers.push(emptyCluster)}
                    size="xs"
                    variant="outline"
                    leftIcon={<AiOutlinePlus />}
                  >
                    Cluster
                  </Button>
                  {/* <Button
                    onClick={() => workoutHelpers.push(emptyWorkout)}
                    size="xs"
                    variant="outline"
                    leftIcon={<AiOutlinePlus />}
                  >
                    Circuit
                  </Button> */}

                  <CreateActivityModal
                    dayHelpers={dayHelpers}
                    formValues={values}
                    handleChange={handleChange}
                    addWorkout={addWorkout}
                  />

                  <ActionIcon
                    size="lg"
                    color="cyan"
                    onClick={() => {
                      console.log(values);
                      console.log(dayIndex);
                      dayHelpers.remove(dayIndex);
                    }}
                  >
                    <AiOutlineDelete />
                  </ActionIcon>
                </Group>
              </Group>
            </Group>
            {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts &&
            values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts.length ? (
              <Group direction="column" grow>
                {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts.map(
                  (workout, workoutIndex) => (
                    <WorkoutSection
                      key={workoutIndex}
                      workoutIndex={workoutIndex}
                      workoutHelpers={workoutHelpers}
                      blockIndex={blockIndex}
                      weekIndex={weekIndex}
                      dayIndex={dayIndex}
                    />
                  )
                )}
              </Group>
            ) : (
              <></>
            )}
          </>
        )}
      />
    </Box>
  );
}
