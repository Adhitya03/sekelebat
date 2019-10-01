import React from 'react';
import { Helmet } from "react-helmet/es/Helmet";

import Aux from './../hoc/Auxiliary';

const notFound = () => {

    return(
        <Aux>
            <Helmet>
                <title> 404 - Page Not Found </title>
            </Helmet>
            <div id="not-found" className="col-12 col-md-8">
                404
            </div>
        </Aux>

    );

};

export default notFound;