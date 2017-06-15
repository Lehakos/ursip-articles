import { call, put, fork, takeLatest } from 'redux-saga/effects';
import * as api from 'api';
import { actions as notificationActions } from 'ducks/notification';

import * as types from './types';
import * as actions from './actions';

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
    console.error(err);
    yield fork(notificationActions.showNotification({ text: 'Не удалось загрузить комментарии' }));
    yield put(actions.getCommentsFail());
  }
}

export function* addComment({ payload }) {
  try {
    const response = yield call(api.addComment, payload.data);
    yield put(actions.addCommentSuccess(response.data));
  } catch (err) {
    console.error(err);
    yield fork(notificationActions.showNotification({ text: 'Не удалось добавить комментарий' }));
    yield put(actions.addCommentFail());
  }
}

export default function* () {
  yield takeLatest(types.GET_COMMENTS, getComments);
  yield takeLatest(types.ADD_COMMENT, addComment);
}
