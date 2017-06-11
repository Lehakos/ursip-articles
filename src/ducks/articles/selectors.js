import { createSelector } from 'reselect';

const getArticlesState = state => state.get('articles');

const getList = createSelector(
  getArticlesState,
  articlesState => articlesState.get('list'),
);

const makeSelectListLoadingState = () => createSelector(
  getList,
  list => list.get('loading'),
);

const getArticlesById = createSelector(
  getList,
  list => list.get('byId'),
);

const getArticlesIds = createSelector(
  getList,
  list => list.get('ids'),
);

const makeSelectArticlesList = () => createSelector(
  [getArticlesById, getArticlesIds],
  (articles, ids) => {
    const articlesArray = ids.map(id => articles.get(id));
    return articlesArray.toJS();
  },
);

export {
  makeSelectListLoadingState,
  makeSelectArticlesList,
};
