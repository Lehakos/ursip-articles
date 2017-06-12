import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage';
import ArticlePage from 'containers/ArticlePage';
import NotFoundPage from 'containers/NotFoundPage';

const Main = styled.main`
  padding: 15px 0;
`;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/articles/:id" component={ArticlePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Main>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
