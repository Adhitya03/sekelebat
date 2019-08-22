import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header';
import Aux from './hoc/Auxiliary';
import Dummy from './dummy';
import Index from './index';

import './style.css';

const App = () => (
    <Aux>
        <Header />
        <div className="row">
            <Switch>
                <Route exact path={SekelebatSettings.path} component={Index} />
                <Route path={SekelebatSettings.path + ':slug'} component={Dummy} />
                <Route path={SekelebatSettings.path + ':slug/:slug'} component={Dummy} />
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