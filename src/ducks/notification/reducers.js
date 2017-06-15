import { fromJS } from 'immutable';

import * as types from './types';

const DEFAULT_TIME = 4000;

const initialState = fromJS({
  show: false,
  time: DEFAULT_TIME,
  text: '',
  action: null,
});

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.CHANGE_NOTIFICATION:
      return state.set('text', payload.text);

    case types.SHOW_NOTIFICATION:
      return state
        .set('text', payload.data.text)
        .set('time', payload.data.time || DEFAULT_TIME)
        .set('action', payload.data.action || null)
        .set('show', true);

    case types.HIDE_NOTIFICATION:
      return state
        .set('text', '')
        .set('time', DEFAULT_TIME)
        .set('action', null)
        .set('show', false);

    default:
      return state;
  }
}
