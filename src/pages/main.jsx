import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../modules/utils/PrivateRoute';

import Home from './home/Home';
import Detail from './overviewPages/detail/Detail';
import Account from './overviewPages/account/Account';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute exact path="/account" component={Account} />
            <Route exact path="/detail/:ID" component={Detail} />
        </Switch>
    );
};

export default Main;