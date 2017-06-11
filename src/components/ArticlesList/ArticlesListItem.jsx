import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="Доступные действия"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const ArticlesListItem = ({ title, date, onDelete }) => {
  const dateObj = moment(Date.parse(date));

  return (
    <ListItem
      rightIconButton={
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onTouchTap={onDelete}>Удалить</MenuItem>
        </IconMenu>
      }
      primaryText={title}
      secondaryText={
        dateObj &&
        <p>
          <time
            style={{ color: grey400 }}
            dateTime={dateObj.format()}
          >
            {dateObj.format('DD.MM.YYYY')}
          </time>
        </p>
      }
    />
  );
};

ArticlesListItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  onDelete: PropTypes.func,
};

export default ArticlesListItem;
