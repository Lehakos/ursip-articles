import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'components/Forms/Redux';
import { required } from 'utils/validate-rules';
import { constants as commentsConstants } from 'ducks/comments';

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`;

const NewCommentForm = ({ handleSubmit, disabled }) => (
  <form onSubmit={handleSubmit}>
    <Field
      disabled={disabled}
      name="text"
      label="Введите текст комментария"
      validate={required}
      component={TextField}
      multiLine
      fullWidth
    />
    <Footer>
      <RaisedButton
        type="submit"
        disabled={disabled}
        label="Добавить комментарий"
        primary
      />
    </Footer>
  </form>
);

NewCommentForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: commentsConstants.ADD_COMMENT_FORM,
})(NewCommentForm);
