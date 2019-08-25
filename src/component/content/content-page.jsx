import React from 'react';
import Aux from '../../hoc/Auxiliary';

const contentPage = ( props ) =>{
    let postFeaturedImage = null;
    if( props.featuredImage !== 0 ){
        postFeaturedImage = <img src={props.featuredImage} alt={props.title}/>;
    }

    return(
        <Aux>
            <div className="featured-image">{postFeaturedImage}</div>
            <div className="title">
                <h1>{props.title}</h1>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: props.content}}></div>
            <div className="author">{props.author}</div>
        </Aux>
    );
};

export default contentPage;