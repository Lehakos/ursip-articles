import { createSelector } from 'reselect';

const getDomainState = state => state.get('comments');

const makeSelectLoadingState = () => createSelector(
  getDomainState,
  comments => comments.get('loading'),
);

const getIds = createSelector(
  getDomainState,
  comments => comments.get('ids'),
);

const getById = createSelector(
  getDomainState,
  comments => comments.get('byId'),
);

const makeSelectComments = () => createSelector(
  [getIds, getById],
  (ids, byId) => ids.map(id => byId.get(String(id))).toJS(),
);

export {
  makeSelectLoadingState,
  makeSelectComments,
};
