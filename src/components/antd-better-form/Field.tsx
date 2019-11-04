import React, { FC } from 'react';
import FormContext from './context';
import * as utils from './utils';
import { defaultProps, parserProps } from './fieldHelper';

export interface FiledComponentProps {
  name: string;
  $defaultValue?: any;
  $value: any;
  $onChange?: (value?) => void;
  $formatter?: (value?) => string | number;
  $parser?: (value?) => string | number;
  changePropName?: string;
  valuePropName?: string;
  children: any;
  $form: any;
}

const Field: FC<FiledComponentProps> = props => {
  const { children } = props;

  return (
    <FormContext.Consumer>
      {(context: any) => {
        if (utils.isFunction(children)) {
          return parserProps(props, context);
        }
      }}
    </FormContext.Consumer>
  );
};

Field.defaultProps = defaultProps;

export default Field;
