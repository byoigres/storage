import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default (history) => {
  const historyMiddleware = routerMiddleware(history);

  const createStoreMiddleware = compose(
    applyMiddleware(thunk, historyMiddleware),
    window.__IS_DEV__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
  )(createStore);

  const configureStore = initialState => createStoreMiddleware(
    reducers,
    initialState,
  );

  return configureStore;
};
