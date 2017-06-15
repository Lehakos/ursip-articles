import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'components/Forms/Redux';
import { required } from 'utils/validate-rules';

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`;

const NewCommentForm = ({ handleSubmit }) => (
  <form onSumbit={handleSubmit}>
    <Field
      name="text"
      label="Введите текст комментария"
      validate={required}
      component={TextField}
      fullWidth
    />
    <Footer>
      <RaisedButton primary label="Добавить комментарий" />
    </Footer>
  </form>
);

NewCommentForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'newComment',
})(NewCommentForm);
