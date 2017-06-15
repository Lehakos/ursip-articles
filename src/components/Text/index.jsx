import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';

const style = {
  padding: 0,
  fontSize: '18px',
  fontWeight: 400,
};

const Text = ({ text }) => (
  <Subheader style={style}>
    {text}
  </Subheader>
);

Text.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default Text;
