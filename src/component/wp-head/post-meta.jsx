import React from 'react';
import { Helmet } from "react-helmet/es/Helmet";

const postMeta = ( props ) => {

    let title = '';
    console.log(props.metaData);
    const wpseo_head = Object.keys(props.metaData).map((el) => {
       if(Object.keys(props.metaData[el])[0] === 'name'){
           return(
               <meta key={props.metaData[el]['name']} name={props.metaData[el]['name']} content={props.metaData[el]['content']}/>
           );
       }else if(Object.keys(props.metaData[el])[0] === 'property'){
           return (
               <meta key={props.metaData[el]['property']} property={props.metaData[el]['property']} content={props.metaData[el]['content']}/>
           );
       }else{
           title = props.metaData[el]['postTitle'];
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