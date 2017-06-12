import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import StyledDate from 'components/StyledDate';

const Article = ({ title, date, text, id, onDelete }) => {
  const onDeleteClick = (e) => {
    e.preventDefault();

    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Card>
      <CardHeader
        subtitle={
          <StyledDate date={date} />
        }
      />
      <Divider />
      <CardTitle
        title={title}
      />
      <CardText>{text}</CardText>
      <CardActions>
        <FlatButton
          label="Удалить"
          secondary
          onTouchTap={onDeleteClick}
        />
      </CardActions>
    </Card>
  );
};

Article.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Article;
