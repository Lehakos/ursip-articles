import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import articlesReducer from 'ducks/articles';
import notificationReducer from 'ducks/notification';

const rootReducer = combineReducers({
  articles: articlesReducer,
  router: routerReducer,
  notification: notificationReducer,
});

export default rootReducer;
