import React from 'react';
import {Link} from "react-router-dom";
import parse,{ domToReact } from "html-react-parser";

import Aux from '../../hoc/Auxiliary';
import Category from '../category';
import Tag from '../tag';

const contentSingle = ( props ) =>{

    const categoryCount = props.categories.length - 1;
    const postCategory = props.categories.map( ( el, index ) => {
        return(
            // [0] category's name, [1] category's slug
            <Category
                key={el[1]}
                categoryIndeks={index}
                categorySum={ categoryCount }
                categoryName={el[0]}
                categorySlug={el[1]}
            />
        );
    } );

    const categoryTag = props.tag.length - 1;
    const postTag = props.tag.map( ( el, index ) => {
        return(
            // [0] tag's name, [1] tag's slug
            <Tag
                key={el[1]}
                tagIndeks={index}
                tagSum={ categoryTag }
                tagName={el[0]}
                tagSlug={el[1]}
            />
        );
    } );

    let postFeaturedImage = null;
    if( props.featuredImage !== 0 ){
        postFeaturedImage = <img src={props.featuredImage} alt={props.title}/>;
    }

    const options = {
        replace: ({ name, attribs, children }) => {
            if( name === "a" ) {
                if( attribs.href !== undefined && attribs.href.includes( SekelebatSettings.domain ) ){
                    return(
                        <Link to={ SekelebatSettings.path + attribs.href.split( SekelebatSettings.domain )[1] } className={attribs.class} title={attribs.title} target={attribs.target} rel={attribs.rel}>
                            {domToReact(children)}
                        </Link>
                    );
                }
            }
        }
    };

    const content = parse(props.content, options);

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