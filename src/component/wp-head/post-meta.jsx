import React from 'react';
import { Helmet } from "react-helmet/es/Helmet";

const postMeta = (props ) => {

    if(props.metaData.length === 0 || props.metaData === undefined){
        return null;
    }

    let title = '';
    const wpseo_head = Object.keys(props.metaData).map((el) => {
       if(Object.keys(props.metaData[el])[0] === 'name'){
           return(
               <meta key={props.metaData[el]['name']} name={props.metaData[el]['name']} content={props.metaData[el]['content']}/>
           );
       }else{
           if( props.metaData[el]['property'] === 'og:title' ){
               title = props.metaData[el]['content'];
           }
           return (
               <meta key={props.metaData[el]['property']} property={props.metaData[el]['property']} content={props.metaData[el]['content']}/>
           );
       }
    });

    return(
        <Helmet>
            {wpseo_head}
            <title>{title}</title>
        </Helmet>
    );
};

export default postMeta;