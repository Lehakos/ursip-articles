import * as types from './types';

export const showNotification = text => ({
  type: types.SHOW_NOTIFICATION,
  payload: { text },
});

export const hideNotification = () => ({
  type: types.HIDE_NOTIFICATION,
});

export const changeNotification = text => ({
  type: types.CHANGE_NOTIFICATION,
  payload: { text },
});
