import React from 'react';
import { Link } from "react-router-dom";

const pagination = ( props ) => {
    let pagesNumb = [];
    let archive = '';
    if(props.type !== undefined){
        archive = props.type + '/' + props.slug + '/';
    }
    for ( let i = 1; i <= props.pagination; i++ ){
        if( i === 1){
            pagesNumb.push(<span><Link to={SekelebatSettings.path + archive}> {i} </Link></span>);
        }else{
            pagesNumb.push(<span><Link to={SekelebatSettings.path + archive + 'page/' + i + '/'}> {i} </Link></span>);
        }
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