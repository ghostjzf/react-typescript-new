import React from 'react';
import Form from './Form';

const withForm = (
  WrappedComponent,
  formProps: any = {
    hideRequiredMark: false,
    labelAlign: 'right',
    layout: 'horizontal',
    colon: true
  }
) => {
  return props => (
    <Form {...formProps!}>
      {$form => {
        return <WrappedComponent $form={$form} {...props} />;
      }}
    </Form>
  );
};

export default withForm;
