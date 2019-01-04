import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './modules/theme';

import store from './modules/store';
import Main from './pages/main';
import { setAuthorizationToken } from './modules/auth';
import { LOGIN } from './modules/types';

import './index.css';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  //prevent jwtToken tampering
  try {
      store.dispatch({
          type: LOGIN,
          payload: jwtDecode(localStorage.jwtToken)["sub"],
      });
  }
  catch (e) {
      store.dispatch({
          type: LOGIN,
          payload: "",
      });
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <MuiThemeProvider theme={theme}>
          <CssBaseline/>
          <Main/>
        </MuiThemeProvider>
      </div>
    </Router>
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();