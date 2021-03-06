import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import Aux from './hoc/Auxiliary';
import Single from './single';
import Index from './index';
import Archive from './archive';
import Search from './search';
import Sidebar from './sidebar';

const App = () => (
    <Aux>
        <Header />
        <div id="content" className="container">
            <div className="row">
                <Switch>
                    <Route exact path={SekelebatSettings.path} component={Index} />
                    <Route exact path={SekelebatSettings.path + 'page/:slug'} component={Index} /> {/*Home page pagination*/}
                    <Route exact path={SekelebatSettings.path + 'archives/:slug'} component={Archive} />
                    <Route exact path={SekelebatSettings.path + 'archives/:slug/page/:slug'} component={Archive} />{/*Yearly archive page pagination*/}
                    <Route exact path={SekelebatSettings.path + 'archives/:slug/:slug'} component={Archive} />
                    <Route exact path={SekelebatSettings.path + 'archives/:slug/:slug/page/:slug'} component={Archive} />{/*Monthly archive page pagination*/}
                    <Route exact path={SekelebatSettings.path + 'archives/:slug/:slug/:slug'} component={Archive} />
                    <Route exact path={SekelebatSettings.path + 'archives/:slug/:slug/:slug/page/:slug'} component={Archive} />{/*Daily archive page pagination*/}
                    <Route exact path={SekelebatSettings.path + 'author/:slug'} component={Archive} />
                    <Route exact path={SekelebatSettings.path + 'author/:slug/page/:slug'} component={Archive} />{/*Author archive page pagination*/}
                    <Route exact path={SekelebatSettings.path + '(category|tag)/:slug'} component={Archive} />
                    <Route exact path={SekelebatSettings.path + '(category|tag)/:slug/page/:slug'} component={Archive} />{/*Category and Tags page pagination*/}
                    <Route exact path={SekelebatSettings.path + 'search:filter?'} component={Search} />
                    <Route exact path={SekelebatSettings.path + 'search:filter?/page/:slug'} component={Search} />{/*Search page pagination*/}
                    <Route path={SekelebatSettings.path + ':slug'} component={Single} />
                </Switch>
                <Sidebar/>
            </div>
        </div>
        <Footer />
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