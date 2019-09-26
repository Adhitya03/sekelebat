import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Helmet} from "react-helmet";

import Header from './header';
import Aux from './hoc/Auxiliary';
import Single from './single';
import Index from './index';
import Archive from './archive';

import './style.css';

const App = () => (
    <Aux>
        <Header />
        <div className="row">
            <Route exact path={SekelebatSettings.path} component={Index} />
            <Switch>
                <Route exact path={SekelebatSettings.path + '(category|tag)/:slug'} component={Archive} />
                <Route path={SekelebatSettings.path + ':slug'} component={Single} />
            </Switch>
            {/*//Sidebar*/}
        </div>
    </Aux>
);

// Routes
const routes = (
    <Router>
        <Route path="/" component={App} />
    </Router>
);

render(
    (routes), document.getElementById('page')
);