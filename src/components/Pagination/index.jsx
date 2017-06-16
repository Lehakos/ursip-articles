import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { grey300, cyanA400 } from 'material-ui/styles/colors';

const Wrapper = styled.div`
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    width: 100%;

    list-style: none;
  }

  li {
    width: 40px;
    height: 40px;

    &.selected {
      color: ${cyanA400};
    }

    transition: background-color .3s;

    :not(.selected) {
      cursor: pointer;

      &:hover {
        background-color: ${grey300};
      }
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    line-height: 1;
    text-align: center;
  }
`;

const Pagination = ({ className, ...props }) => (
  <Wrapper className={className}>
    <ReactPaginate
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel={<KeyboardArrowLeft />}
      nextLabel={<KeyboardArrowRight />}
      {...props}
    />
  </Wrapper>
);

Pagination.propTypes = {
  className: PropTypes.string,
};

export default Pagination;
