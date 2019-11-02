import React from "react";
import { Link } from "react-router-dom";
import imgNotFound from "./../../images/img-not-found.png";

import Category from '../category';

const content = ( props ) => {

    let postFeaturedImage = null;
    if( props.featuredImage !== 0 ){
        postFeaturedImage = <img src={props.featuredImage} alt={props.title}/>;
    }else{
        postFeaturedImage = <img src={imgNotFound} alt="Image not available"/>;
    }

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

    let readMore = '';
    if( props.title === '' ){
        readMore = <div className="read-more"><i className="fab fa-readme"/><Link to={SekelebatSettings.path + props.link.split(SekelebatSettings.domain)[1]}> Read More... </Link></div>
    }

    return(
       <article>
           <div className="featured-image">
               {postFeaturedImage}
           </div>
           <div className="title">
               <Link to={SekelebatSettings.path + props.link.split(SekelebatSettings.domain)[1]}><h2>{props.title}</h2></Link>
           </div>
           <div className="content" dangerouslySetInnerHTML={{__html: props.excerpt}}></div>
           <div className="footer-meta">
               <div className="author"><i className="fas fa-user"/><Link to={SekelebatSettings.path + 'author/' + props.authorID + '/'}>{props.author}</Link></div>
               <div className="date"><i className="fas fa-calendar-alt"/>{props.date}</div>
               <div className="category"><i className="fas fa-tags"/>{postCategory}</div>
               {readMore}
           </div>
       </article>
    );
};

export default content;