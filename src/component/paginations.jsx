import React from 'react';
import { Link } from "react-router-dom";

const pagination = ( props ) => {
    let pagesNumb = [];
    let archive = '';
    let page = 'page/';
    if(props.type !== undefined && props.type !== 'search'){
        archive = props.type + '/' + props.slug + '/';
    }else if( props.type === 'search' ){
        archive = props.type + '?s=' + props.slug;
        page = '/page/';
    }
    for ( let i = 1; i <= props.pagination; i++ ){
        if( i === 1){
            pagesNumb.push(<li><Link to={SekelebatSettings.path + archive}> {i} </Link></li>);
        }else{
            pagesNumb.push(<li><Link to={SekelebatSettings.path + archive + page + i + '/'}> {i} </Link></li>);
        }
    }

    const pageLink = pagesNumb.map( el => el );

    return(
        <div id="pagination" className="row">
            <div className="col-12">
                <ul className="pagination">
                    {pageLink}
                </ul>
            </div>
        </div>
    );
};

export default pagination;