import React from "react";
import {Link} from "react-router-dom";

const contentSearch = ( props ) => {

    return(
        <article id="blog-post">
            <div className="title">
                <Link to={SekelebatSettings.path + props.link.split(SekelebatSettings.domain)[1]}><h2>{props.title}</h2></Link>
            </div>
        </article>
    );
};

export default contentSearch;