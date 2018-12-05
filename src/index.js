import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './modules/store';
import Main from './pages/main';

import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Main/>
      </div>
    </Router>
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();