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

const getSelected = createSelector(
  getArticlesState,
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
  makeSelectArticleLoadingState,
  makeSelectArticleData,
};
