import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home/Home';
import Login from './accountPages/login/Login';
import Register from './accountPages/register/Register';
import Detail from './overviewPages/detail/Detail';
import Sell from './overviewPages/sell/Sell';
import Account from './overviewPages/account/Account';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/account" component={Account} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/detail/:ID" component={Detail} />
            <Route exact path="/sell/:ID" component={Sell} />
        </Switch>
    );
};

export default Main;