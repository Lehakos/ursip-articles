import { combineReducers } from 'redux-immutable';

import appReducer from 'containers/App/reducer';

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
