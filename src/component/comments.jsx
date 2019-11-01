import React from "react";

const comments = ( props ) =>{
    return(
        <div id="cp">
            <div id="fb-root">
                <div className="fb-comments" data-href={props.url} data-numposts="5" data-colorscheme="light" data-width="100%"/>
            </div>
        </div>
    );
};

export default comments;