import { fromJS, List, Map } from 'immutable';

import * as types from './types';
import { types as articlesTypes } from '../articles';

const initialState = fromJS({
  byId: {},
  ids: [],
  loading: true,
});

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_COMMENTS:
      return state.set('loading', true);

    case types.GET_COMMENTS_SUCCESS:
      return state
        .merge(payload.comments)
        .set('loading', false);

    case types.GET_COMMENTS_FAIL:
    case articlesTypes.GET_ARTICLE:
      return state
        .set('byId', Map())
        .set('ids', List())
        .set('loading', false);

    case types.ADD_COMMENT_SUCCESS:
      return state
        .setIn(['byId', payload.data.id], payload.data)
        .update('ids', ids => ids.push(payload.data.id))
        .set('loading', false);

    default:
      return state;
  }
}

