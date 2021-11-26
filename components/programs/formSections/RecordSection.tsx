import { ActionIcon, Menu, NumberInput, Select } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiFillSetting, AiOutlineDelete } from 'react-icons/ai';
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
        <FlexContainer justify="flex-end" align="center">
          {/* <Switch
            label="RPE"
            checked={hasRPE}
            onChange={(event) => {
              setHasRPE(event.currentTarget.checked);

              if (event.currentTarget.checked == true) {
                setHasLoad(false);
              } else {
                setFieldValue(
                  `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].rpe`,
                  null
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
                  null
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
                  null
                );
              }
            }}
            styles={{
              label: {
                marginRight: 8,
                padding: 2,
              },
            }}
          /> */}
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
          <Select
            // label="Your favorite framework/library"
            value={
              values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].workouts[workoutIndex]
                .lifts[liftIndex].records[recordIndex].type
            }
            onChange={(value) => {
              setFieldValue(
                `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].workouts[${workoutIndex}].lifts[${liftIndex}].records[${recordIndex}].type`,
                value
              );
            }}
            data={[
              { label: 'warmup', value: 'warmup' },
              { label: 'working ', value: 'working' },
              { label: 'backdown', value: 'backdown' },
            ]}
          />
          <Menu
            control={
              <ActionIcon size="lg" color="cyan">
                <AiFillSetting />
              </ActionIcon>
            }
            zIndex={1200}
          >
            <Menu.Item icon={<AiOutlineDelete />} onClick={() => recordHelpers.remove(recordIndex)}>
              Delete
            </Menu.Item>
          </Menu>
        </FlexContainer>
        {/* 
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
        </FlexContainer> */}
      </FlexContainer>
    </div>
  );
}
