import React from 'react';
import { Link } from 'react-router-dom';
import { call, put, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as api from 'api';
import { actions as notificationActions } from 'ducks/notification';

import * as types from './types';
import * as actions from './actions';

export function* getArticles({ payload = {} }) {
  try {
    const response = yield call(api.getArticles, payload.params);

    const articles = response.data.reduce((acc, item) => {
      acc.byId[item.id] = item;
      acc.ids.push(item.id);
      return acc;
    }, { byId: {}, ids: [] });

    yield put(actions.getArticlesSuccess(articles));
  } catch (err) {
    console.error(err);
    yield put(actions.getArticlesFail());
  }
}

export function* getArticle({ payload }) {
  try {
    const response = yield call(api.getArticle, payload.id);
    yield put(actions.getArticleSuccess(response.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getArticleFail());
  }
}

export function* addArticle({ payload }) {
  try {
    const response = yield call(api.addArticle, payload.data);
    yield fork(notificationActions.showNotification({
      action: (
        // eslint-disable-next-line react/jsx-filename-extension
        <Link
          style={{ color: 'inherit', textDecoration: 'none' }}
          to={`/articles/${response.data.id}`}
        >
          Посмотреть
        </Link>
      ),
      text: 'Статья добавлена',
      time: 6000,
    }));
    yield put(actions.addArticleSuccess(response.data));
  } catch (err) {
    console.error(err);
    yield fork(notificationActions.showNotification({ text: 'Не удалось добавить статью' }));
    yield put(actions.addArticleFail());
  }
}

export function* deleteArticle({ payload }) {
  try {
    yield call(api.deleteArticle, payload.id);

    if (payload.redirectPath) {
      yield put(push(payload.redirectPath));
    }

    yield put(actions.deleteArticleSuccess(payload.id));
    yield fork(notificationActions.showNotification({ text: 'Статья удалена' }));
  } catch (err) {
    console.error(err);
    yield fork(notificationActions.showNotification({ text: 'Не удалось удалить статью' }));
    yield put(actions.deleteArticleFail());
  }
}

export default function* () {
  yield takeLatest(types.GET_ARTICLES, getArticles);
  yield takeLatest(types.GET_ARTICLE, getArticle);
  yield takeLatest(types.ADD_ARTICLE, addArticle);
  yield takeEvery(types.DELETE_ARTICLE, deleteArticle);
}
