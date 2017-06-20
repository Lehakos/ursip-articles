import { call, put, takeLatest } from 'redux-saga/effects';
import { reset } from 'redux-form/immutable';

import * as api from 'api';
import { actions as notificationActions } from 'ducks/notification';
import { logError } from 'utils';

import * as types from './types';
import * as actions from './actions';
import { ADD_COMMENT_FORM } from './constants';

export const GET_COMMENTS_ERROR = 'Не удалось загрузить комментарии';
export function* getComments({ payload }) {
  try {
    const response = yield call(api.getComments, payload.articleId);

    const comments = response.data.reduce((acc, item) => {
      acc.byId[item.id] = item;
      acc.ids.push(item.id);
      return acc;
    }, { byId: {}, ids: [] });

    yield put(actions.getCommentsSuccess(comments));
  } catch (err) {
    logError(err);
    yield put(notificationActions.showNotification({ text: GET_COMMENTS_ERROR }));
    yield put(actions.getCommentsFail());
  }
}

export const ADD_COMMENT_ERROR = 'Не удалось добавить комментарий';
export function* addComment({ payload }) {
  try {
    const response = yield call(api.addComment, payload.data);
    yield put(actions.addCommentSuccess(response.data));
    yield put(reset(ADD_COMMENT_FORM));
  } catch (err) {
    logError(err);
    yield put(notificationActions.showNotification({ text: ADD_COMMENT_ERROR }));
    yield put(actions.addCommentFail());
  }
}

export default function* () {
  yield takeLatest(types.GET_COMMENTS, getComments);
  yield takeLatest(types.ADD_COMMENT, addComment);
}
