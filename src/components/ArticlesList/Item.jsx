import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ListItem } from 'material-ui/List';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import StyledDate from 'components/StyledDate';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="Доступные действия"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

class ArticlesListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.onDeleteClick = ::this.onDeleteClick;
  }

  onDeleteClick(e) {
    const { onDelete, id } = this.props;

    e.preventDefault();

    if (onDelete) {
      onDelete(id);
    }
  }

  render() {
    const { id, title, date } = this.props;

    return (
      <ListItem
        rightIconButton={
          <IconMenu
            style={{ zIndex: 1 }}
            iconButtonElement={iconButtonElement}
          >
            <MenuItem onTouchTap={this.onDeleteClick}>Удалить</MenuItem>
          </IconMenu>
        }
        primaryText={title}
        secondaryText={
          <div>
            <StyledDate date={date} />
          </div>
        }
      >
        <StyledLink to={`/articles/${id}`} />
      </ListItem>
    );
  }
}

ArticlesListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  onDelete: PropTypes.func,
};

export default ArticlesListItem;
