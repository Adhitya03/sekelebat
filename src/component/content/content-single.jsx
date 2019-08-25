import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Category from '../category';
import Tag from '../tag';

const contentSingle = ( props ) =>{

    const postCategory = props.categories.map( el => {
        return(
            // [0] category's name, [1] category's slug
            <Category
                key={el[1]}
                categoryName={el[0]}
                categorySlug={el[1]}
            />
        );
    } );

    const postTag = props.tag.map( el => {
        return(
            // [0] tag's name, [1] tag's slug
            <Tag
                key={el[1]}
                tagName={el[0]}
                tagSlug={el[1]}
            />
        );
    } );

    let postFeaturedImage = null;
    if( props.featuredImage !== 0 ){
        postFeaturedImage = <img src={props.featuredImage} alt={props.title}/>;
    }

    return(
        <Aux>
            <div className="category">{postCategory}</div>
            <div className="featured-image">{postFeaturedImage}</div>
            <div className="title">
                <h1>{props.title}</h1>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: props.content}}></div>
            <div className="tag">{postTag}</div>
            <div className="author">{props.author}</div>
        </Aux>
    );
};

export default contentSingle;