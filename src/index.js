import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import Detail from 'pages/overviewPages/detail/Detail';
import Sell from 'pages/overviewPages/sell/Sell';
import Account from 'pages/overviewPages/account/Account';
import store from 'store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/Account" component={Account} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Detail/:ID" component={Detail} />
        <Route exact path="Sell/:ID" component={Sell} />
      </Switch>
    </Provider>
  </Router>, document.getElementById('root'));
registerServiceWorker();