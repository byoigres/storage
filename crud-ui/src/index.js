import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import configureStore from './store';

const history = createHistory();
const configuredStore = configureStore(history);

const store = configuredStore({});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component
        history={history}
        store={store}
      />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}
