import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Sidebar from 'components/Sidebar';
import { DateRange } from 'components/Forms';

const StyledSidebar = styled(Sidebar)`
  height: 400px;
`;

const HomeSidebar = ({ titlesList, onTitleFilterChange, onDateFilterChange, values }) => (
  <StyledSidebar
    title="Фильтры"
    footer={
      <RaisedButton
        containerElement={<Link to="/articles/new" />}
        label="Добавить статью"
        fullWidth
        primary
      />
    }
  >
    <DateRange
      startDate={values.date.start}
      endDate={values.date.end}
      onChange={onDateFilterChange}
    />
    <AutoComplete
      searchText={values.title}
      onUpdateInput={onTitleFilterChange}
      dataSource={titlesList}
      floatingLabelText="По заголовкам"
      fullWidth
    />
  </StyledSidebar>
);

HomeSidebar.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.object,
  }),
  titlesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTitleFilterChange: PropTypes.func,
  onDateFilterChange: PropTypes.func,
};

export default HomeSidebar;
