import { List } from 'immutable';
import { createSelector } from 'reselect';

const getDomainState = state => state.get('articles');

const getList = createSelector(
  getDomainState,
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

const getFilters = createSelector(
  getList,
  list => list.get('filters'),
);

const makeSelectFilters = () => createSelector(
  getFilters,
  filters => filters.toJS(),
);

const filter = (article, filters) => {
  const startDate = filters.getIn(['date', 'start']);
  const endDate = filters.getIn(['date', 'end']);
  const title = filters.get('title').toLowerCase();
  const articleDate = new Date(article.get('date'));
  const articleTitle = article.get('title').toLowerCase();

  if (title && articleTitle.indexOf(title) === -1) {
    return false;
  }

  if (startDate && articleDate < startDate) {
    return false;
  }

  if (endDate && articleDate > endDate) {
    return false;
  }

  return true;
};

const makeSelectArticlesList = () => createSelector(
  [getArticlesById, getArticlesIds, getFilters],
  (articles, ids, filters) => {
    const articlesList = ids.reduce((res, id) => {
      const article = articles.get(id);
      if (filter(article, filters)) {
        res = res.push(article); // eslint-disable-line no-param-reassign
      }
      return res;
    }, List());

    return articlesList.toJS();
  },
);

const makeSelectArticlesTitle = () => createSelector(
  [getArticlesById, getArticlesIds],
  (articles, ids) => {
    const titles = ids.map(id => articles.getIn([id, 'title']));
    return titles.toJS();
  },
);

const getSelected = createSelector(
  getDomainState,
  articlesState => articlesState.get('selected'),
);

const makeSelectArticleLoadingState = () => createSelector(
  getSelected,
  selected => selected.get('loading'),
);

const getSelectedData = createSelector(
  getSelected,
  selected => selected.get('data'),
);

const makeSelectArticleData = () => createSelector(
  getSelectedData,
  (data) => {
    if (!data) {
      return null;
    }

    return data.toJS();
  },
);

export {
  makeSelectListLoadingState,
  makeSelectArticlesList,
  makeSelectArticlesTitle,
  makeSelectArticleLoadingState,
  makeSelectArticleData,
  makeSelectFilters,
};
