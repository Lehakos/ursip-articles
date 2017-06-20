import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const headerStyle = {
  padding: '0 15px',
  fontSize: '16px',
};

export const Content = styled.p`
  margin: 0;
  padding: 10px 15px 20px;

  font-size: 15px;
`;

const CommentsItem = ({ className, divider, user, text }) => (
  <div className={className}>
    <Subheader style={headerStyle}>
      <Avatar style={{ marginRight: '5px' }}>
        {user[0].toUpperCase()}
      </Avatar>
      {user}
    </Subheader>
    <Content>{text}</Content>
    {
      !!divider &&
      <Divider />
    }
  </div>
);

CommentsItem.defaultProps = {
  user: 'Anonymous',
};

CommentsItem.propTypes = {
  className: PropTypes.string,
  divider: PropTypes.bool,
  text: PropTypes.string.isRequired,
  user: PropTypes.string,
};

export default CommentsItem;
