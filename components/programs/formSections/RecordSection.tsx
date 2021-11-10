import { ActionIcon, NumberInput, SegmentedControl, Switch } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FlexContainer } from '../../FlexContainer';

export default function RecordSection({
  recordIndex,
  liftIndex,
  blockIndex,
  weekIndex,
  dayIndex,
  workoutIndex,

  recordHelpers,
}: any): ReactElement {
  const [hasRPE, setHasRPE] = useState(false);
  const [hasPercent, setHasPercent] = useState(false);
  const [hasLoad, setHasLoad] = useState(false);
  const { values, setFieldValue } = useFormikContext();
  return (
    <div>
      <FlexContainer justify="space-between" align="center">
        <SegmentedControl
          size="xs"
          color="cyan"
          value={
            values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex].lifts[
              liftIndex
            ].records[recordIndex].type
          }
          onChange={(value) => {
            setFieldValue(
              `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].type`,
              value
            );
          }}
          data={[
            { label: 'warmup', value: 'warmup' },
            { label: 'working set', value: 'working' },
            { label: 'backdown', value: 'backdown' },
          ]}
          my={6}
          styles={{
            root: {
              width: '100%',
            },
            controlActive: {
              backgroundColor: '#2782b0',
              borderRadius: 4,
            },
            active: {
              backgroundColor: '#2782b0',
            },
          }}
        />
        <FlexContainer justify="flex-end" align="center">
          <Switch
            label="RPE"
            checked={hasRPE}
            onChange={(event) => {
              setHasRPE(event.currentTarget.checked);

              if (event.currentTarget.checked == true) {
                setHasLoad(false);
              } else {
                setFieldValue(
                  `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].rpe`,
                  undefined
                );
              }
            }}
            styles={{
              label: {
                marginRight: 8,
                padding: 2,
              },
            }}
          />
          <Switch
            label="%"
            checked={hasPercent}
            onChange={(event) => {
              setHasPercent(event.currentTarget.checked);
              if (event.currentTarget.checked == true) {
                setHasLoad(false);
              } else {
                setFieldValue(
                  `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].percent`,
                  undefined
                );
              }
            }}
            styles={{
              label: {
                marginRight: 8,
                paddingLeft: 2,
              },
            }}
          />
          <Switch
            label="Load"
            checked={hasLoad}
            onChange={(event) => {
              setHasLoad(event.currentTarget.checked);
              if (event.currentTarget.checked == true) {
                setHasPercent(false);
                setHasRPE(false);
              } else {
                setFieldValue(
                  `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].load`,
                  undefined
                );
              }
            }}
            styles={{
              label: {
                marginRight: 8,
                padding: 2,
              },
            }}
          />
          <ActionIcon
            onClick={() => recordHelpers.remove(recordIndex)}
            color="red"
            styles={{
              root: {
                marginTop: 'auto',
                marginBottom: 'auto',
              },
            }}
          >
            <AiOutlineDelete />
          </ActionIcon>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer>
        <FlexContainer justify="flex-start">
          <NumberInput
            autoComplete="false"
            required
            min={1}
            step={1}
            max={999}
            value={
              values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                .lifts[liftIndex].records[recordIndex].sets
            }
            name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].sets`}
            onChange={(value) =>
              setFieldValue(
                `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].sets`,
                value
              )
            }
            styles={{
              icon: {
                fontSize: 12,
              },
            }}
            icon={<span>s</span>}
          />
          <NumberInput
            autoComplete="false"
            required
            min={1}
            step={1}
            max={9999}
            value={
              values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                .lifts[liftIndex].records[recordIndex].reps
            }
            name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].reps`}
            onChange={(value) =>
              setFieldValue(
                `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].reps`,
                value
              )
            }
            styles={{
              icon: {
                fontSize: 12,
              },
            }}
            icon={<span>r</span>}
          />
        </FlexContainer>

        <FlexContainer justify="flex-end" align="center">
          {hasRPE && (
            <NumberInput
              autoComplete="false"
              min={1}
              step={1}
              max={10}
              value={
                values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                  .lifts[liftIndex].records[recordIndex].rpe
              }
              name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].rpe`}
              onChange={(value) =>
                setFieldValue(
                  `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].rpe`,
                  value
                )
              }
              styles={{
                icon: {
                  fontSize: 12,
                },
              }}
              icon={<span>rpe</span>}
            />
          )}
          {hasPercent && (
            <NumberInput
              autoComplete="false"
              min={1}
              step={5}
              max={100}
              value={
                values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                  .lifts[liftIndex].records[recordIndex].percent
              }
              name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].percent`}
              onChange={(value) =>
                setFieldValue(
                  `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].percent`,
                  value
                )
              }
              styles={{
                icon: {
                  fontSize: 12,
                },
              }}
              icon={<span>%</span>}
            />
          )}
          {hasLoad && (
            <NumberInput
              autoComplete="false"
              min={0}
              step={45}
              max={9999}
              value={
                values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                  .lifts[liftIndex].records[recordIndex].load
              }
              name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].load`}
              onChange={(value) =>
                setFieldValue(
                  `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].load`,
                  value
                )
              }
              styles={{
                icon: {
                  fontSize: 12,
                },
              }}
              icon={<span>lbs</span>}
            />
          )}
        </FlexContainer>
      </FlexContainer>
    </div>
  );
}
