import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Respository from './pages/Repository';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/repository/:repository" component={Respository} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
