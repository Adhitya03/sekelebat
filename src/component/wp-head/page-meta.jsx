import React from 'react';
import {Helmet} from "react-helmet/es/Helmet";

const pageMeta = ( props ) => {

    let title = '';
    const wpseo_head = Object.keys(props.metaData).map((el) => {
        if(Object.keys(props.metaData[el])[0] === 'name'){
            return(
                <meta key={props.metaData[el]['name']} name={props.metaData[el]['name']} content={props.metaData[el]['content']}/>
            );
        }else if(Object.keys(props.metaData[el])[0] === 'property'){
            if( props.metaData[el]['property'] === "og:title" ){
                title = props.metaData[el]['content'];
            }
            return (
                <meta key={props.metaData[el]['property']} property={props.metaData[el]['property']} content={props.metaData[el]['content']}/>
            );
        }

        if( title === '' ){
            title = props.metaData[props.metaData.length-1].pageTitle + ' - ' + SekelebatSettings.title;
        }
    });

    return(
        <Helmet>
            {wpseo_head}
            <title>{title}</title>
        </Helmet>
    );
};

export default pageMeta;