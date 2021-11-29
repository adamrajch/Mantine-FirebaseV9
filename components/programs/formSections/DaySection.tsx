import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Group,
  SimpleGrid,
  Textarea,
  TextInput,
} from '@mantine/core';
import { FieldArray, useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { FaRegStickyNote } from 'react-icons/fa';
import { Lift } from '../../../types/types';
import LiftSection from './LiftSection';
const newLift: Lift = {
  name: 'New Lift',
  type: 'single',
  note: '',
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
};

export default function DaySection({
  dayIndex,
  blockIndex,
  weekIndex,
  dayHelpers,
}: any): ReactElement {
  const { values, handleChange, setFieldValue } = useFormikContext();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 20 }}>
      <FieldArray name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].lifts`}>
        {(liftHelpers) => {
          return (
            <Box
              sx={(theme) => ({
                width: '100%',
                paddingTop: 12,
                paddingLeft: 8,
                paddingBottom: 4,
                borderRadius: 8,
                border: '2px solid',
                borderColor: theme.colors.gray[7],
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[5],
              })}
            >
              <SimpleGrid cols={3}>
                <div></div>
                <TextInput
                  size="lg"
                  value={values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].name}
                  name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].name`}
                  variant="default"
                  onChange={handleChange}
                />

                <Group position="right">
                  <ActionIcon size="lg" color="cyan" onClick={() => setOpen((o) => !o)}>
                    <FaRegStickyNote />
                  </ActionIcon>
                  <Button
                    variant="outline"
                    onClick={() => liftHelpers.push(newLift)}
                    leftIcon={<AiOutlinePlus />}
                    size="xs"
                  >
                    Lift
                  </Button>
                  <ActionIcon size="lg" color="cyan" onClick={() => dayHelpers.remove(dayIndex)}>
                    <AiOutlineDelete />
                  </ActionIcon>
                </Group>
              </SimpleGrid>
              <Collapse in={open} my={8}>
                <Textarea
                  placeholder="Add a summary, any tips or important queues"
                  name={`blocks[${blockIndex}].weeks[${weekIndex}].days[${dayIndex}].summary`}
                  value={values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].summary}
                  onChange={handleChange}
                />
              </Collapse>
              <Group direction="column" grow>
                {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts &&
                  values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts.length > 0 &&
                  values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts.map(
                    (l, liftIndex: number) => (
                      <LiftSection
                        blockIndex={blockIndex}
                        weekIndex={weekIndex}
                        dayIndex={dayIndex}
                        liftHelpers={liftHelpers}
                        liftIndex={liftIndex}
                        key={liftIndex}
                      />
                    )
                  )}
              </Group>
            </Box>
          );
        }}
      </FieldArray>
    </div>
  );
}
