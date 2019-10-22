import React from 'react';
import {Link} from "react-router-dom";
import parse from "html-react-parser";

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

    const content = parse(props.content);

    return(
        <Aux>
            <div className="entry-header">
                <div className="title">
                    <h2>{props.title}</h2>
                </div>
                <div className="header-meta">
                    <div className="date">{props.date} by </div>
                    <div className="author"><Link to={SekelebatSettings.path + 'author/' + props.authorID + '/'}>{props.author}</Link></div>
                </div>
            </div>
            <div className="entry-content">
                <div className="featured-image">{postFeaturedImage}</div>
                <div className="content">{content}</div>
            </div>
            <div className="entry-footer">
                <div className="footer-meta">
                    <div className="category">Filed Under : {postCategory}</div>
                    <div className="tag">Tagged With : {postTag}</div>
                </div>
            </div>
        </Aux>
    );
};

export default contentSingle;