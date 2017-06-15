import { all } from 'redux-saga/effects';
import { saga as articlesSaga } from 'ducks/articles';
import { saga as commentsSaga } from 'ducks/comments';

export default function* () {
  yield all([
    articlesSaga(),
    commentsSaga(),
  ]);
}
