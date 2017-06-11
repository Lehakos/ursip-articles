import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from 'api';

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
    yield put(actions.addArticleSuccess(response.data));
  } catch (err) {
    console.error(err);
    yield put(actions.addArticleFail());
  }
}

export function* deleteArticle({ payload }) {
  try {
    yield call(api.deleteArticle, payload.id);
    yield put(actions.deleteArticleSuccess(payload.id));
  } catch (err) {
    console.error(err);
    yield put(actions.deleteArticleFail());
  }
}

export default function* () {
  yield takeLatest(types.GET_ARTICLES, getArticles);
  yield takeLatest(types.GET_ARTICLE, getArticle);
  yield takeLatest(types.ADD_ARTICLE, addArticle);
  yield takeLatest(types.DELETE_ARTICLE, deleteArticle);
}
