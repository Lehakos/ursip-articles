import { put } from 'redux-saga/effects';

import { actions as notificationActions } from 'ducks/notification';

import {
  getComments as getCommentsAction,
  getCommentsSuccess,
  getCommentsFail,
} from '../actions';
import {
  getComments,
  GET_COMMENTS_ERROR,
} from '../sagas';
import commentsData, { normalized } from './mocks';

describe('getComments сага', () => {
  let getCommentsGen;

  beforeEach(() => {
    getCommentsGen = getComments(getCommentsAction(1));
    const callDescriptor = getCommentsGen.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('если комментарии успешно загружены, должна вызываться getCommentsSuccess', () => {
    const response = commentsData;

    const putDescriptor = getCommentsGen.next({ data: response }).value;
    expect(putDescriptor).toEqual(put(getCommentsSuccess(normalized)));
  });

  it('если произошла ошибка, должно быть показано уведомление и затем вызвана getCommentsFail', () => {
    const notificationDescriptor = getCommentsGen.throw('Ошибка').value;
    expect(notificationDescriptor).toEqual(
      put(notificationActions.showNotification({ text: GET_COMMENTS_ERROR })),
    );

    const putDescriptor = getCommentsGen.next().value;
    expect(putDescriptor).toEqual(put(getCommentsFail()));
  });
});
