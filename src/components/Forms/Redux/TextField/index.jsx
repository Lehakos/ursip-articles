import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const TextFieldRedux = ({
  input,
  meta: {
    error,
    touched,
  },
  label,
  ...props
}) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error ? error : null}
    {...input}
    {...props}
  />
);

TextFieldRedux.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
};

export default TextFieldRedux;
