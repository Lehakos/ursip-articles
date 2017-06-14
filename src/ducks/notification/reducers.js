import { fromJS } from 'immutable';

import * as types from './types';

const initialState = fromJS({
  show: false,
  text: '',
});

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.CHANGE_NOTIFICATION:
      return state.set('text', payload.text);

    case types.SHOW_NOTIFICATION:
      return state
        .set('text', payload.text)
        .set('show', true);

    case types.HIDE_NOTIFICATION:
      return state
        .set('text', '')
        .set('show', false);

    default:
      return state;
  }
}
