import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux'

import articlesReducer from 'ducks/articles';

const rootReducer = combineReducers({
  articles: articlesReducer,
  router: routerReducer,
});

export default rootReducer;
