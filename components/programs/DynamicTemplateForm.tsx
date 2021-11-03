import React, { ReactElement } from 'react';

export default function DynamicTemplateForm({ value }: any): ReactElement {
  console.log('dynamic: ', value);
  return <div></div>;
}
