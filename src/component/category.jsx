import React from 'react';
import { Link } from "react-router-dom";

const category = ( props ) => {
    let separator = '';
    if( props.categoryIndeks < props.categorySum ){
        separator = ', ';
    }
    return(
        <Link to={SekelebatSettings.path + "category/" + props.categorySlug + '/'}>{ props.categoryName + separator } </Link>
    );
};

export default category;