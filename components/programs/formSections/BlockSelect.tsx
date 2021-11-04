import { Button } from '@mantine/core';
import { useFormikContext } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import DynamicTemplateForm from '../DynamicTemplateForm';

export default function BlockSelect(): ReactElement {
  const { values } = useFormikContext();
  const [blockValue, setBlockValue] = useState<number | null>(0);

  useEffect(() => {
    console.log('select value: ', blockValue);
  }, [blockValue]);
  return (
    <div>
      <div style={{ display: 'flex' }}>
        {values.blocks.map((block, i: number) => {
          return (
            <Button
              variant="outline"
              key={i}
              onClick={() => setBlockValue(i)}
              style={{
                borderColor: blockValue === i ? 'gold' : '',
              }}
            >
              {block.name}
            </Button>
          );
        })}
      </div>
      <DynamicTemplateForm blockIndex={blockValue} />
    </div>
  );
}
