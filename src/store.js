import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const middlewares = [
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    rootReducer,
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  sagaMiddleware.run(...rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducers = require('./reducers'); // eslint-disable-line global-require
      store.replaceReducer(nextReducers);
    });
  }

  return store;
}
