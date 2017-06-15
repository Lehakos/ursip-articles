import { createSelector } from 'reselect';

const getDomainState = state => state.get('notification');

const makeSelectNotificationState = () => createSelector(
  getDomainState,
  notif => notif.toJS(),
);

export {
  makeSelectNotificationState,
};
