import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import ArticlesListItem from './ArticlesListItem';

const ArticlesList = ({ items, onItemDelete }) => (
  <List>
    {items.map(item => (
      <div key={item.id}>
        <ArticlesListItem
          title={item.title}
          date={item.date}
          onDelete={() => onItemDelete && onItemDelete(item.id)}
        />
        <Divider />
      </div>
    ))}
  </List>
);

ArticlesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    ...ArticlesListItem.propTypes,
    id: PropTypes.string.isRequired,
  })),
  onItemDelete: PropTypes.func,
};

export default ArticlesList;
