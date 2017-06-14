import * as types from './types';

export const getArticles = params => ({
  type: types.GET_ARTICLES,
  payload: { params },
});

export const getArticlesSuccess = articles => ({
  type: types.GET_ARTICLES_SUCCESS,
  payload: { articles },
});

export const getArticlesFail = () => ({
  type: types.GET_ARTICLES_FAIL,
});

export const getArticle = id => ({
  type: types.GET_ARTICLE,
  payload: { id },
});

export const getArticleSuccess = article => ({
  type: types.GET_ARTICLE_SUCCESS,
  payload: { article },
});

export const getArticleFail = () => ({
  type: types.GET_ARTICLE_FAIL,
});

export const addArticle = data => ({
  type: types.ADD_ARTICLE,
  payload: { data },
});

export const addArticleSuccess = article => ({
  type: types.ADD_ARTICLE_SUCCESS,
  payload: { article },
});

export const addArticleFail = () => ({
  type: types.ADD_ARTICLE_FAIL,
});

export const deleteArticle = (id, redirectPath) => ({
  type: types.DELETE_ARTICLE,
  payload: { id, redirectPath },
});

export const deleteArticleSuccess = id => ({
  type: types.DELETE_ARTICLE_SUCCESS,
  payload: { id },
});

export const deleteArticleFail = () => ({
  type: types.DELETE_ARTICLE_FAIL,
});

export const changeFilter = filter => ({
  type: types.CHANGE_FILTER,
  payload: { filter },
});
