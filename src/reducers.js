import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import articlesReducer from 'ducks/articles';
import notificationReducer from 'ducks/notification';
import commentsReducer from 'ducks/comments';

const rootReducer = combineReducers({
  articles: articlesReducer,
  comments: commentsReducer,
  form: formReducer,
  notification: notificationReducer,
  router: routerReducer,
});

export default rootReducer;
