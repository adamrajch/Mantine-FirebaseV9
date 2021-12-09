import { Checkbox, Group, MultiSelect, SimpleGrid, Text, TextInput } from '@mantine/core';
import { Field, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';
import { ErrorImage } from '../ImageError';

const multiSelectData = [
  { value: 'bodybuilding', label: 'bodybuilding' },
  { value: 'olympic weightlifting', label: 'olympic weightlifting' },
  { value: 'powerlifting', label: 'powerlifting' },
  { value: 'mobility', label: 'mobility' },
  { value: 'sport', label: 'sport' },
];
const multiSelectExperience = [
  { value: 'beginner', label: 'beginner' },
  { value: 'intermediate', label: 'intermediate' },
  { value: 'advanced', label: 'advanced' },
];
const periodizationCheckboxes = [
  { label: 'Linear', value: 'linear' },
  { label: 'Block', value: 'block' },
  { label: 'Wave', value: 'wave' },
  { label: 'D.U.P', value: 'dup' },
  { label: 'Step', value: 'step' },
  { label: 'Reverse', value: 'reverse' },
];

export default function GeneralSection({ program }: any): ReactElement {
  const { values, errors, handleChange, setFieldValue } = useFormikContext();
  return (
    <Group direction="column" spacing="lg" grow>
      {program == undefined ? (
        <Text my="lg">
          Fill in and detail your program in this form. You can always edit your program details and
          template after you create it
        </Text>
      ) : (
        <div></div>
      )}
      <TextInput
        autoComplete="false"
        required
        label="Program Title"
        error={errors.title}
        value={values.title}
        name="title"
        onChange={handleChange}
      />
      {/* <SegmentedControl
        fullWidth
        value={values.type}
        onChange={(value) => setFieldValue('type', value)}
        data={[
          { label: 'Custom', value: 'custom' },
          { label: 'Generated', value: 'gen' },
        ]}
      /> */}

      <SimpleGrid cols={2}>
        <div>
          <MultiSelect
            name="category"
            required
            placeholder="Select atleast one discipline"
            data={multiSelectData}
            label="Discipline"
            value={values.category}
            clearable
            onChange={(value) => setFieldValue('category', value)}
          />
          <Text color="red">{errors.category}</Text>
        </div>
        <div>
          <MultiSelect
            required
            placeholder="Select experience levels"
            data={multiSelectExperience}
            label="Experience"
            value={values.experience}
            clearable
            onChange={(value) => setFieldValue('experience', value)}
          />
          <Text color="red">{errors.experience}</Text>
        </div>
      </SimpleGrid>
      <Group position="center" spacing="xl" role="group">
        {periodizationCheckboxes.map((checkbox) => (
          <div key={checkbox.value}>
            <Field name="periodization" type="checkbox" value={checkbox.value}>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              }: any) => <Checkbox label={checkbox.label} {...field} />}
            </Field>
          </div>
        ))}
      </Group>
      <Checkbox
        label="Private"
        checked={values.public}
        onChange={(event) => setFieldValue('public', event.currentTarget.checked)}
      />
      {/*  stop sending request on autocomplete*/}
      <TextInput
        autoComplete="false"
        label="Cover Photo URL"
        error={errors.photoUrl}
        value={values.photoUrl}
        name="photoUrl"
        onChange={handleChange}
      />
      {values.photoUrl.length > 0 && (
        <ErrorImage
          src={values.photoUrl}
          height={280}
          width={280}
          alt="program picture"
          fallback={<div>No valid image </div>}
        />
      )}
    </Group>
  );
}
