import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Page } from 'hedron';
import Snackbar from 'material-ui/Snackbar';
import HomePage from 'containers/HomePage';
import ArticlePage from 'containers/ArticlePage';
import NotFoundPage from 'containers/NotFoundPage';
import {
  actions as notificationActions,
  selectors as notificationSelectors,
} from 'ducks/notification';

const Main = styled.main`
  padding: 15px 0;
`;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    const { showNotification, notification, hideNotification } = this.props;

    return (
      <Main>
        <Page>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/articles/:id" component={ArticlePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
          <Snackbar
            open={showNotification}
            message={notification}
            autoHideDuration={4000}
            onRequestClose={hideNotification}
          />
        </Page>
      </Main>
    );
  }
}

App.propTypes = {
  hideNotification: PropTypes.func,
  notification: PropTypes.string,
  showNotification: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  notification: notificationSelectors.makeSelectText(),
  showNotification: notificationSelectors.makeSelectShowState(),
});

const mapDispatchToProps = dispatch => ({
  hideNotification: () => dispatch(notificationActions.hideNotification()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
