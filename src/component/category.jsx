import React from 'react';
import { Link } from "react-router-dom";

const category = ( props ) => {
    return(
        <Link to={SekelebatSettings.path + "category/" + props.categorySlug + '/'}>{ props.categoryName } </Link>
    );
};

export default category;