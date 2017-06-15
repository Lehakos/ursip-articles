import * as types from './types';

export const showNotification = (data) => ({
  type: types.SHOW_NOTIFICATION,
  payload: { data },
});

export const hideNotification = () => ({
  type: types.HIDE_NOTIFICATION,
});

export const changeNotification = text => ({
  type: types.CHANGE_NOTIFICATION,
  payload: { text },
});
