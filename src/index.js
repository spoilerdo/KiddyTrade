import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import Detail from 'pages/overviewPages/detail/Detail';
import Sell from 'pages/overviewPages/sell/Sell';
import Account from 'pages/overviewPages/account/Account';

ReactDOM.render(<Router><Switch>
  <Route exact path="/" component={Home}/>
  <Route exact path="/Account" component={Account} />
  <Route exact path="/Login" component={Login} />
  <Route exact path="/Detail/:ID" component={Detail} />
  <Route exact path="Sell/:ID" component={Sell} />
  </Switch></Router>, document.getElementById('root'));
registerServiceWorker();