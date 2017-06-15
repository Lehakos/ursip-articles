import { fromJS, List, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import * as types from './types';

const listInitialState = fromJS({
  byId: {},
  ids: [],
  loading: true,
  filters: {
    date: {
      start: null,
      end: null,
    },
    title: '',
  },
});

function listReducer(state = listInitialState, { type, payload }) {
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
        .setIn(['byId', payload.article.id], fromJS(payload.article))
        .update('ids', ids => ids.push(payload.article.id));

    case types.DELETE_ARTICLE_SUCCESS:
      return state
        .deleteIn(['byId', payload.id])
        .update(
          'ids',
          ids => ids.filter(id => id !== payload.id),
        );

    case types.CHANGE_FILTER:
      return state.mergeIn(['filters'], fromJS(payload.filter));

    default:
      return state;
  }
}

const selectedInitialState = fromJS({
  loading: true,
  data: null,
});

function selectedReducer(state = selectedInitialState, { type, payload }) {
  switch (type) {
    case types.GET_ARTICLE:
      return state.set('loading', true);

    case types.GET_ARTICLE_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(payload.article));

    case types.GET_ARTICLE_FAIL:
      return state
        .set('loading', false)
        .set('data', null);

    case types.DELETE_ARTICLE_SUCCESS:
      if (payload.id !== state.getIn(['data', 'id'])) {
        return state;
      }

      return state.set('data', null);

    default:
      return state;
  }
}

export default combineReducers({
  list: listReducer,
  selected: selectedReducer,
});
