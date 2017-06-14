import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import articlesReducer from 'ducks/articles';
import notificationReducer from 'ducks/notification';

const rootReducer = combineReducers({
  articles: articlesReducer,
  form: formReducer,
  router: routerReducer,
  notification: notificationReducer,
});

export default rootReducer;
