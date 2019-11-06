import React from "react";
import parse from "html-react-parser";

const comments = ( props ) => {
        return(
            <div className="comment-section">
                <h3>Comment in this Article</h3>
                { parse( props.comments ) }
            </div>
        );
};

export default comments;