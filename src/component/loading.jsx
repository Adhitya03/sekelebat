import React from 'react';
import loadingGif from './../images/loading.gif';

const loading = () => {
    return(
        <div id="loading">
            <img src={loadingGif} alt="Loading"/>
        </div>
    )
};

export default loading;