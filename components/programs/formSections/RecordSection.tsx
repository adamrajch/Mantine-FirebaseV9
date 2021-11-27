import { ActionIcon, NumberInput, Select } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FlexContainer } from '../../FlexContainer';

export default function RecordSection({
  recordIndex,
  liftIndex,
  blockIndex,
  weekIndex,
  dayIndex,
  recordHelpers,
}: any): ReactElement {
  const { values, setFieldValue } = useFormikContext();
  return (
    <FlexContainer justify="flex-start">
      <NumberInput
        autoComplete="false"
        required
        min={1}
        step={1}
        max={999}
        value={
          values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].sets
        }
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].sets`}
        onChange={(value) =>
          setFieldValue(
            `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].sets`,
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
          values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].reps
        }
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].reps`}
        onChange={(value) =>
          setFieldValue(
            `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].reps`,
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
          values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].rpe
        }
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].rpe`}
        onChange={(value) =>
          setFieldValue(
            `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].rpe`,
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
          values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].percent
        }
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].percent`}
        onChange={(value) =>
          setFieldValue(
            `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].percent`,
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
          values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].load
        }
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].load`}
        onChange={(value) =>
          setFieldValue(
            `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].load`,
            value
          )
        }
        styles={{
          icon: {
            fontSize: 12,
          },
        }}
        icon={<span>load</span>}
      />
      <Select
        value={
          values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].unit
        }
        onChange={(value) => {
          setFieldValue(
            `blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].unit`,
            value
          );
        }}
        data={[
          { label: 'lbs', value: 'lbs' },
          { label: 'kilo', value: 'kilo' },
          { label: 'time', value: 'seconds' },
        ]}
      />
      <ActionIcon onClick={() => recordHelpers.remove(recordIndex)}>
        <AiOutlineDelete />
      </ActionIcon>
    </FlexContainer>
  );
}
