import React from 'react';
import { Link } from "react-router-dom";

const tag = ( props ) => {
    let separator = '';
    if( props.tagIndeks < props.tagSum ){
        separator = ', ';
    }
    return(
        <Link to={SekelebatSettings.path + "tag/" + props.tagSlug + '/'}>{ props.tagName + separator } </Link>
    );
};

export default tag;