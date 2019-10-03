import React from 'react';
import { Link } from "react-router-dom";

const pagination = ( props ) => {
    let pagesNumb = [];
    for ( let i = 1; i <= props.pagination; i++ ){
        pagesNumb.push(<span><Link to={SekelebatSettings.path + 'page/' + i + '/'}> {i} </Link></span>);
    }

    console.log(pagesNumb);

    const pageLink = pagesNumb.map( el => el );

    return(
        <div className='pagination'>
            {pageLink}
        </div>
    );
};

export default pagination;