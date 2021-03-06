import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Page } from 'hedron';
import Snackbar from 'material-ui/Snackbar';
import HomePage from 'containers/HomePage';
import ArticlePage from 'containers/ArticlePage';
import NewArticlePage from 'containers/NewArticlePage';
import NotFoundPage from 'containers/NotFoundPage';
import {
  actions as notificationActions,
  selectors as notificationSelectors,
} from 'ducks/notification';

import './global-styles';

const Main = styled.main`
  padding: 15px 0;
`;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    const { notification, hideNotification } = this.props;

    return (
      <Main>
        <Page>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/articles" />} />
            <Route path="/articles/new" component={NewArticlePage} />
            <Route path="/articles/one/:id" component={ArticlePage} />
            <Route path="/articles" component={HomePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
          <Snackbar
            action={notification.action}
            open={notification.show}
            message={notification.text}
            autoHideDuration={notification.time}
            onRequestClose={hideNotification}
          />
        </Page>
      </Main>
    );
  }
}

App.propTypes = {
  hideNotification: PropTypes.func,
  notification: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  notification: notificationSelectors.makeSelectNotificationState(),
});

const mapDispatchToProps = dispatch => ({
  hideNotification: () => dispatch(notificationActions.hideNotification()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
