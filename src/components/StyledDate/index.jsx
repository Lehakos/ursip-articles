import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { grey400 } from 'material-ui/styles/colors';
import moment from 'moment';

const Wrapper = styled.time`
  color: ${prop('color', grey400)};
`;

const StyledDate = ({ date, color }) => {
  if (!date) {
    return null;
  }

  const dateObj = moment(date);

  return (
    <Wrapper
      color={color}
      dateTime={dateObj.format()}
    >
      {dateObj.format('DD.MM.YYYY')}
    </Wrapper>
  );
};

StyledDate.propTypes = {
  color: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]).isRequired,
};

export default StyledDate;
