import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form/immutable';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'components/Forms/Redux';
import Title from 'components/Title';
import { required, maxLength } from 'utils/validate-rules';
import {
  actions as articlesActions,
} from 'ducks/articles';

const Form = styled.form`
  padding: 0 20px 15px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15px;
`;

// eslint-disable-next-line react/prefer-stateless-function
class NewArticlePage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = ::this.onSubmit;
  }

  onSubmit(dataImmutable) {
    const data = dataImmutable.toJS();
    this.props.addArticle(data);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Paper>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Title size="l" style={{ marginBottom: 0, textAlign: 'center' }}>
            Добавить новую статью
          </Title>
          <Field
            name="title"
            label="Заголовок статьи"
            component={TextField}
            validate={[required, maxLength(150)]}
            fullWidth
          />
          <Field
            name="text"
            label="Текст статьи"
            component={TextField}
            rows={4}
            validate={required}
            multiLine
            fullWidth
          />
          <Footer>
            <RaisedButton
              type="submit"
              label="Добавить"
              primary
            />
          </Footer>
        </Form>
      </Paper>
    );
  }
}

NewArticlePage.propTypes = {
  addArticle: PropTypes.func,
  handleSubmit: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  addArticle: data => dispatch(articlesActions.addArticle(data)),
});

export default reduxForm({
  form: 'newArticle',
})(connect(null, mapDispatchToProps)(NewArticlePage));
