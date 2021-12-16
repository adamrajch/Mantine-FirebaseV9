import { Button, Group, Text, TextInput, Title } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';
import { Program } from '../../../types/types';

interface Props {
  blockIndex: number;
  weekIndex: number;
  weekHelpers: any;
  currentWeek: any;
  onClose: any;
}

export default function GenerateForm({
  blockIndex,
  weekIndex,
  weekHelpers,
  currentWeek,
  onClose,
}: Props): ReactElement {
  const [weeks, setWeeks] = useState<number>(4);
  const [error, setError] = useState<boolean>(false);
  const notifications = useNotifications();

  const { values }: { values: Program } = useFormikContext();
  const numWeeks = values.blocks[blockIndex].weeks.length;
  function handleChange(e: any) {
    // e.preventDefault();
    console.log(e);
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setWeeks(e.currentTarget.value);
    }
  }

  function handleSubmit() {
    if (weeks < 20 && weeks > 1) {
      for (let i = 0; i < weeks; i++) {
        weekHelpers.push({
          name: `Week ${numWeeks + i + 1}`,
          summary: currentWeek.summary,
          days: currentWeek.days,
        });
      }
      notifications.showNotification({
        title: `Complete`,
        message: `Successfully Generated ${weeks} weeks`,
      });
      onClose(false);
    } else {
      setError(true);
    }
  }
  return (
    <Group direction="column" grow>
      <Title order={2} align="center">
        Generate Block
      </Title>
      <Text>
        Many programs run the same movements over the course of blocks. Select how many weeks you
        want to clone your base and it will add to your block
      </Text>
      <TextInput
        type="number"
        label="Number of Weeks"
        autoComplete="false"
        value={weeks}
        onChange={(e) => handleChange(e)}
        error={error && 'Invalid number'}
      />
      <Text>You can clone 1-20 weeks at a time</Text>
      <Button variant="outline" onClick={handleSubmit}>
        Generate
      </Button>
    </Group>
  );
}
