import React from 'react';
import { Link } from "react-router-dom";

import Category from '../category';

const content = ( props ) => {

    let postFeaturedImage = null;
    if( props.featuredImage !== 0 ){
        postFeaturedImage = <img src={props.featuredImage} alt={props.title}/>;
    }

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

    return(
       <article id="blog-post">
           <div className="featured-image">
               {postFeaturedImage}
           </div>
           <div className="title">
               <Link to={SekelebatSettings.path + props.link.split(SekelebatSettings.domain)[1]}><h2>{props.title}</h2></Link>
           </div>
           <div className="content" dangerouslySetInnerHTML={{__html: props.excerpt}}></div>
           <div className="footer-meta">
               <div className="author"><i className="fas fa-user"></i><Link to={SekelebatSettings.path + 'author/' + props.authorID + '/'}>{props.author}</Link></div>
               <div className="date"><i className="fas fa-calendar-alt"></i>{props.date}</div>
               <div className="category"><i className="fas fa-tags"></i>{postCategory}</div>
           </div>
       </article>
    );
};

export default content;