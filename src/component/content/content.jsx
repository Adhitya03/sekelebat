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
       <article>
           <div className="featured-image">
               {postFeaturedImage}
           </div>
           <div className="title">
                <h2>{props.title}</h2>
           </div>
           <div className="header-meta">
               <div className="row">
                   <div className="col-6 date">{props.date}</div>
                   <div className="col-6 author">{props.author}</div>
               </div>
           </div>
           <div className="content" dangerouslySetInnerHTML={{__html: props.excerpt}}></div>
           <div className="footer-meta">
               <div className="row">
                   <div className="col-6 category">{postCategory}</div>
                   <div className="col-6 link"><Link to={SekelebatSettings.path + props.link.split(SekelebatSettings.domain)[1]}>{props.title}</Link></div>
               </div>
           </div>
       </article>
    );
};

export default content;