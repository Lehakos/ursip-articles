import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const sizes = {
  sm: 14,
  md: 16,
  l: 18,
  xl: 20,
  xxl: 22,
};

const Wrapper = styled.h2`
  margin: 0;

  font-weight: inherit;
  font-size: inherit;
`;

const Title = ({ tag, children, style, size, divider }) => {
  const Tag = tag ? Wrapper.withComponent(tag) : Wrapper;
  const headerStyle = {
    marginBottom: '1em',
    fontSize: `${sizes[size]}px`,
    ...style,
  };

  return (
    <Subheader style={headerStyle}>
      <Tag>
        {Children.toArray(children)}
      </Tag>
      {
        !!divider &&
        <Divider />
      }
    </Subheader>
  );
};

Title.defaultProps = {
  size: 'md',
};

Title.propTypes = {
  children: PropTypes.node,
  divider: PropTypes.bool,
  style: PropTypes.object,
  size: PropTypes.string,
  tag: PropTypes.string,
};

export default Title;
