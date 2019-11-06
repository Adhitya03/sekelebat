import React from "react";
import parse from "html-react-parser";

const comments = ( props ) => {
        return(
            <div className="comment-section">
                { parse( props.comments ) }
            </div>
        );
};

export default comments;