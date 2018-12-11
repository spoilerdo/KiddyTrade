import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import jwtDecode from 'jwt-decode';

import store from './modules/store';
import Main from './pages/main';
import { setAuthorizationToken } from './modules/auth';
import { LOGIN } from './modules/types';

import './index.css';
import * as serviceWorker from './serviceWorker';

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
        <Main/>
      </div>
    </Router>
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();