import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Page } from 'hedron';

// eslint-disable-next-line react/prefer-stateless-function
class NotFoundPage extends Component {
  render() {
    return (
      <Page>
        404
      </Page>
    );
  }
}

NotFoundPage.propTypes = {

};

export default NotFoundPage;
