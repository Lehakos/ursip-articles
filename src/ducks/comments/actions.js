import * as types from './types';

export const getComments = articleId => ({
  type: types.GET_COMMENTS,
  payload: { articleId },
});

export const getCommentsSuccess = comments => ({
  type: types.GET_COMMENTS_SUCCESS,
  payload: { comments },
});

export const getCommentsFail = () => ({
  type: types.GET_COMMENTS_FAIL,
});

export const addComment = data => ({
  type: types.ADD_COMMENT,
  payload: { data },
});

export const addCommentSuccess = data => ({
  type: types.ADD_COMMENT_SUCCESS,
  payload: { data },
});

export const addCommentFail = () => ({
  type: types.ADD_COMMENT_FAIL,
});
