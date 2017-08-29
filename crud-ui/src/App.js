import React from 'react';
import PropTypes from 'prop-types';
import { Provider as StoreProvider } from 'react-redux';
import { ConnectedRouter as RouterProvider } from 'react-router-redux';
import { ThemeProvider, injectGlobal } from 'styled-components';
import ScrollToTop from 'components/ScrollToTop';
import routes from './routes';
import theme from './resources/theme';

// eslint-disable-next-line
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Mukta+Mahee|Open+Sans');
  @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-size: 16px;
    font-family: '${theme.fonts.primary}', Arial;
    color: ${theme.colors.primaryText};
    background-color: #F3F3F3;
    margin: 0;
    height: 100%;
  }

  body {
    
  }

  #root {
    height: 100%;
  }
/*
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: background-color, border-bottom-style 0.5s ease;
    border-bottom: 1px solid transparent;
  }

  a:hover {
    color: ${theme.colors.primaryDark};
    border-bottom-style: groove;
    border-bottom-color: ${theme.colors.primary};
    cursor: pointer;
  }
  */
`;

const App = ({ history, store }) => (
  <StoreProvider store={store}>
    <RouterProvider key={Math.random()} history={history}>
      <ThemeProvider theme={theme}>
        <ScrollToTop>
          {routes}
        </ScrollToTop>
      </ThemeProvider>
    </RouterProvider>
  </StoreProvider>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default App;
