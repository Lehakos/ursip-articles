import { createSelector } from 'reselect';

const getDomainState = state => state.get('notification');

const makeSelectShowState = () => createSelector(
  getDomainState,
  notification => notification.get('show'),
);

const makeSelectText = () => createSelector(
  getDomainState,
  notification => notification.get('text'),
);

export {
  makeSelectShowState,
  makeSelectText,
};
