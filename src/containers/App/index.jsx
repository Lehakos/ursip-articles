import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage';
import ArticlePage from 'containers/ArticlePage';
import NotFoundPage from 'containers/NotFoundPage';

// eslint-disable-next-line react/prefer-stateless-function
class App extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/posts/:id" component={ArticlePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;