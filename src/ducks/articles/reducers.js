import { fromJS, List, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import * as types from './types';

const listInitialState = fromJS({
  byId: {},
  ids: [],
  loading: true,
});

function listReducer(state = listInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ARTICLES:
      return state.set('loading', true);

    case types.GET_ARTICLES_SUCCESS:
      return state
        .merge(fromJS(payload.articles))
        .set('loading', false);

    case types.GET_ARTICLES_FAIL:
      return state
        .set('ids', List())
        .set('byId', Map())
        .set('loading', false);

    case types.ADD_ARTICLE_SUCCESS:
      return state
        .setIn(['by', payload.article.id], payload.article)
        .update('ids', ids => ids.unshift(payload.article.id));

    case types.DELETE_ARTICLE_SUCCESS:
      return state
        .deleteIn(['byId', payload.id])
        .update(
          'ids',
          ids => ids.filter(id => id !== payload.id),
        );

    default:
      return state;
  }
}

const selectedInitialState = fromJS({
  loading: true,
  data: {},
});

function selectedReducer(state = selectedInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ARTICLE:
      return state
        .set('loading', true);

    case types.GET_ARTICLE_SUCCESS:
      return state
        .set('loading', false)
        .set('data', payload.article);

    case types.GET_ARTICLE_FAIL:
      return state
        .set('loading', false)
        .set('data', null);

    default:
      return state;
  }
}

export default combineReducers({
  list: listReducer,
  selected: selectedReducer,
});
