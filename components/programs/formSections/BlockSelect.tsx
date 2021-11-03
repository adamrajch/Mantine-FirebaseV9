import { Select } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import DynamicTemplateForm from '../DynamicTemplateForm';

export default function BlockSelect(): ReactElement {
  const { values } = useFormikContext();
  const [blockValue, setBlockValue] = useState<string | null>(null);
  const [block, setBlock] = useState(null);
  useEffect(() => {
    console.log('select value: ', blockValue);
  }, [blockValue]);
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Select
          label="Select Block"
          placeholder="Pick one"
          value={block ? block.block : null}
          onChange={(value) => {
            setBlockValue(value);
            setBlock(value.block);
          }}
          data={values.blocks.map((block, i: number) => {
            let obj = { block, blockIndex: i };
            return {
              value: block.name,
              block: obj,
              label: block.name,
            };
          })}
        />
      </div>
      <DynamicTemplateForm value={blockValue} />
    </div>
  );
}
