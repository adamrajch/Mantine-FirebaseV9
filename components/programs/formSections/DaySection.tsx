import { ActionIcon, Button, Group, Input } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import { AiOutlineClose, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
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
          load: 135,
          sets: 5,
          reps: 5,
          unit: 'lbs',
          rpe: 8,
          percent: undefined,
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
          load: 135,
          sets: 5,
          reps: 5,
          unit: 'lbs',
          rpe: 8,
          percent: undefined,
        },
      ],
    },
    {
      name: 'Lift 2',
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
    <div>
      <FieldArray
        key={dayIndex}
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts`}
        render={(workoutHelpers) => (
          <>
            <Group direction="column" my={24} grow>
              <Group position="apart" spacing={2}>
                <Input
                  placeholder="day name"
                  name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.name`}
                  value={values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].name}
                  onChange={handleChange}
                  rightSection={
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].name.length ? (
                      <ActionIcon
                        onClick={() =>
                          setFieldValue(
                            `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].name`,
                            ''
                          )
                        }
                        size="xs"
                      >
                        <AiOutlineClose color="cyan" />
                      </ActionIcon>
                    ) : null
                  }
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

                  <ActionIcon size="lg" color="cyan" onClick={() => dayHelpers.remove(dayIndex)}>
                    <AiOutlineDelete />
                  </ActionIcon>
                </Group>
              </Group>
            </Group>
            {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts &&
            values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts.length ? (
              <>
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
              </>
            ) : null}
          </>
        )}
      />
    </div>
  );
}
