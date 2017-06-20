import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: ${prop('fontSize')}px;
`;

const textStyle = {
  marginLeft: '10px',
  padding: 0,
  width: 'auto',
  fontSize: 'inherit',
  fontWeight: 400,
};

export const BASE_SIZE = 30;
export const BASE_FONT = 18;

const Loading = ({ fontSize, text }) => {
  const size = BASE_SIZE * (BASE_FONT / fontSize);

  return (
    <Wrapper fontSize={fontSize}>
      <CircularProgress size={size} />
      <Subheader style={textStyle}>{text}</Subheader>
    </Wrapper>
  );
};

Loading.defaultProps = {
  fontSize: BASE_FONT,
  text: 'Идёт загрузка',
};

Loading.propTypes = {
  fontSize: PropTypes.number,
  text: PropTypes.node,
};

export default Loading;
