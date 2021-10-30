import React, { FunctionComponent } from 'react';

interface FlexProps {
  justify?: string;
  align?: string;
  wrap?: any;
  children: React.ReactNode;
}

export const FlexContainer: FunctionComponent<FlexProps> = ({
  justify = 'center',
  align = 'center',
  children,
  wrap = 'no-wrap',
}) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignContent: align,
        justifyContent: justify,
        flexWrap: wrap,
        gap: 8,
      }}
    >
      {children}
    </div>
  );
};
