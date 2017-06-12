import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import CircularProgress from 'material-ui/CircularProgress';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: ${prop('fontSize')}px;
`;

const Text = styled.span`
  margin-left: 10px;
`;

const BASE_SIZE = 30;
const BASE_FONT = 16;

const Loading = ({ fontSize, text }) => {
  const size = BASE_SIZE * (BASE_FONT / fontSize);

  return (
    <Wrapper fontSize={fontSize}>
      <CircularProgress size={size} />
      <Text>{text}</Text>
    </Wrapper>
  );
};

Loading.defaultProps = {
  fontSize: BASE_FONT,
  text: 'Идёт загрузка',
};

Loading.propTypes = {
  fontSize: PropTypes.number,
  text: PropTypes.string,
};

export default Loading;
