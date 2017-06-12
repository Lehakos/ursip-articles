import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import ArticlesListItem from './ArticlesListItem';

const ItemWrapper = styled.div`
  position: relative;

  &:hover {
    z-index: 10;
  }
`;

const ArticlesList = ({ items, onItemDelete }) => (
  <List style={{ padding: 0 }}>
    {items.map(item => (
      <ItemWrapper key={item.id}>
        <ArticlesListItem
          {...item}
          onDelete={onItemDelete}
        />
        <Divider />
      </ItemWrapper>
    ))}
  </List>
);

ArticlesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(ArticlesListItem.propTypes)),
  onItemDelete: PropTypes.func,
};

export default ArticlesList;
