import React from 'react';
import { Link } from "react-router-dom";

const tag = ( props ) => {
    return(
        <Link to={SekelebatSettings.path + "tag/" + props.tagSlug + '/'}> { props.tagName } </Link>
    );
};

export default tag;