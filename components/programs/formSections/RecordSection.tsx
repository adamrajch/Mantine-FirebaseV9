import { ActionIcon, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import MUNumberInput from '../../MUNumberInput';

export default function RecordSection({
  recordIndex,
  liftIndex,
  blockIndex,
  weekIndex,
  dayIndex,
  recordHelpers,
}: any): ReactElement {
  const { setFieldValue } = useFormikContext();
  const { values }: { values: any } = useFormikContext();
  const matches = useMediaQuery('(min-width: 900px)');

  return (
    <Group grow noWrap>
      <MUNumberInput
        placeholder="sets"
        label="sets"
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].sets`}
        value={
          values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].sets
        }
        min={1}
        step={1}
        max={999}
      />
      <MUNumberInput
        placeholder="reps"
        label="reps"
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].reps`}
        value={
          values.blocks[blockIndex]?.weeks[weekIndex]?.days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].reps
        }
        min={1}
        step={1}
        max={999}
      />
      <MUNumberInput
        placeholder=""
        label="rpe"
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].rpe`}
        value={
          values.blocks[blockIndex]?.weeks[weekIndex]?.days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].rpe
        }
        min={1}
        step={1}
        max={10}
      />
      <MUNumberInput
        placeholder=""
        label="%"
        name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts[${liftIndex}].records[${recordIndex}].percent`}
        value={
          values.blocks[blockIndex]?.weeks[weekIndex]?.days[dayIndex].lifts[liftIndex].records[
            recordIndex
          ].percent
        }
        min={0}
        step={20}
        max={100}
      />
      {/* <NumberInput
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
        icon={matches && <span>s</span>}
        hideControls={!matches}
      />

      <NumberInput
        autoComplete="false"
        required
        min={1}
        step={1}
        max={9999}
        value={
          values.blocks[blockIndex]?.weeks[weekIndex]?.days[dayIndex].lifts[liftIndex].records[
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
        icon={matches && <span>r</span>}
        hideControls={!matches}
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
        icon={matches && <span>rpe</span>}
        hideControls={!matches}
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
        icon={matches && <span>%</span>}
        hideControls={!matches}
      /> */}

      {/* <Select
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
      /> */}
      <ActionIcon onClick={() => recordHelpers.remove(recordIndex)} style={{ flexShrink: 0 }}>
        <MdOutlineCancel color="#ba261c" />
      </ActionIcon>
    </Group>
  );
}
