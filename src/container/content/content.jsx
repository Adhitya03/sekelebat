import React from 'react';

import Category from '../category';

const content = ( props ) => {

    let imageUrl = null;
    if( props.featuredImage !== 0 ){
        imageUrl = <img src={props.featuredImage} alt={props.title}/>;
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
               {imageUrl}
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
           <div className="content">

           </div>
           <div className="footer-meta">
               <div className="row">
                   <div className="col-6 category">{postCategory}</div>
                   <div className="col-6 link">{props.link}</div>
               </div>
           </div>
       </article>
    );
};

export default content;