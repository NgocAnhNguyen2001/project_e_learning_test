import * as React from 'react'

import { Input } from './Input';

type ElementProps = {
  inputProps?: any,
  readonly?: boolean,
  children?: React.ReactElement[],
  datalistId: string,
};

export const DataListInput = (props: ElementProps): React.ReactElement => {
  const {
    inputProps,
    readonly,
    datalistId,
  } = props;
  return <Input
  {...{
    readonly: readonly,
    list: datalistId,
  }}
  {...inputProps}
/>
  return (
    <>
      <Input
        {...{
          readonly: readonly,
          list: datalistId,
        }}
        {...inputProps}
      />
      {/* <datalist id={datalistId}>
        {children}
      </datalist> */}
    </>
  )
}
