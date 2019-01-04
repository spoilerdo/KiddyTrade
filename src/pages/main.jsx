import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home/Home';
import Detail from './overviewPages/detail/Detail';
import Account from './overviewPages/account/Account';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/account" component={Account} />
            <Route exact path="/detail/:ID" component={Detail} />
        </Switch>
    );
};

export default Main;