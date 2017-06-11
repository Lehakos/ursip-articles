import { combineReducers } from 'redux-immutable';

import articlesReducer from 'ducks/articles';

const rootReducer = combineReducers({
  articles: articlesReducer,
});

export default rootReducer;
