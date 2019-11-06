import React from "react";
import parse from "html-react-parser";

const comments = ( props ) => {
        return(
            <div id="comments" className="comments-area">
                <h3>Leave Your Reply on { props.title }</h3>
                { parse( props.comments ) }
            </div>
        );
};

export default comments;