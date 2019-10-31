import React from 'react';
import Aux from '../../hoc/Auxiliary';
import parse,{ domToReact } from "html-react-parser";
import {Link} from "react-router-dom";

const contentPage = ( props ) =>{

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

    console.log(props.content);
    const content = parse(props.content, options);
    return(
        <Aux>
            <div className="featured-image">{postFeaturedImage}</div>
            <div className="title">
                <h1>{props.title}</h1>
            </div>
            <div className="content">{content}</div>
            <div className="author">{props.author}</div>
        </Aux>
    );
};

export default contentPage;