import { ActionIcon, Box, Group, TextInput } from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
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
      rpe: null,
      percent: null,
      load: null,
    },
  ],
};
const emptyRecord = {
  type: 'working',
  sets: 5,
  reps: 5,
  unit: 'lbs',
  rpe: null,
  percent: null,
  load: null,
};
export default function LiftSection({
  blockIndex,
  weekIndex,
  dayIndex,

  liftHelpers,
  liftIndex,
}: any): ReactElement {
  const { values, handleChange, setFieldValue } = useFormikContext();

  const emptyRecord = {
    sets: 5,
    reps: 5,
    unit: 'lbs',
    rpe: null,
    percent: null,
    load: null,
  };
  return (
    <div>
      <FieldArray
        name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.lifts[${liftIndex}].records`}
      >
        {(recordHelpers) => {
          return (
            <Box
              sx={(theme) => ({
                width: '100%',
                padding: 8,
                marginTop: 2,
                marginBottom: 2,
                borderRadius: 8,
                borderColor: theme.colors.gray[9],
                border: '2px solid transparent',
                '&:hover': {
                  border: '2px solid',
                  borderColor: theme.colors.gray[7],
                },
              })}
            >
              <FlexContainer justify="space-between" align="center">
                <TextInput
                  autoComplete="false"
                  required
                  value={
                    values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].name
                  }
                  name={`blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.lifts[${liftIndex}].name`}
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}
                />
                {/* validation for nested input */}
                <Group position="right">
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
                        `blocks[${blockIndex}].weeks.${weekIndex}.days.${dayIndex}.lifts[${liftIndex}]`,
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
              <Group direction="column" mt="md">
                {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex]
                  .records &&
                  values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[liftIndex].records
                    .length > 0 &&
                  values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts[
                    liftIndex
                  ].records.map((r, recordIndex: number) => (
                    <div
                      key={recordIndex}
                      style={{
                        paddingLeft: 10,
                      }}
                    >
                      <RecordSection
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
              </Group>
            </Box>
          );
        }}
      </FieldArray>
    </div>
  );
}
