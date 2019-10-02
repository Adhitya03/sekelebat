import React, { Component } from 'react';
import {Helmet} from "react-helmet/es/Helmet";

import Content from './component/content/content';
import Aux from "./hoc/Auxiliary";
import {Redirect} from "react-router-dom";

class Archive extends Component{

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            taxInfo: [],
            sitedesc: '',
            url: null,
            loadedPost: false
        };
    }

    shouldComponentUpdate() {
        return this.state.url !== window.location.href;
    }

    componentDidUpdate() {
        this.fetchPosts();
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts(){
        let postList = '';
        let type = 'category';
        let taxType = 'categories';
        if( window.location.href.split(SekelebatSettings.domain)[1].split('/')[0] === "tag" ){
            type = 'tag';
            taxType = 'tags';
        }

        fetch( SekelebatSettings.domain +  "wp-json/sekelebat/v1/"+ type + "/" + window.location.href )
            .then( response => {
                if ( !response.ok ) {
                    throw Error(response.statusText);
                }
                return response.json();
            } )
            .then( result => {
                postList = result[1];
                if(result[0] !== null){
                    let taxUrl = SekelebatSettings.domain +  "/wp-json/wp/v2/"+ taxType + "/" + result[0];
                    fetch( taxUrl ).then( webResponse => {
                        if ( !webResponse.ok ) {
                            throw Error(webResponse.statusText);
                        }
                        return webResponse.json();
                    } ).then( taxResult => {
                        this.setState({posts: postList, taxInfo: taxResult, sitedesc: result[2], url: window.location.href, loadedPost: true});
                    } )
                }else{
                    this.setState({posts: postList, url: window.location.href, loadedPost: true});
                }
            } );
    }

    render() {
        let content = <div className="loading">Loading  gan</div>;
        let taxTitle = '';
        let notFound = '';
        if( this.state.loadedPost ){
            if( this.state.posts.length === 0 ){
                notFound = <Redirect to={SekelebatSettings.path + '404'}/>;
            }else{
                content = this.state.posts.map( el => {
                    return (
                        <Content
                            key={el.id}
                            title={el.title['rendered']}
                            categories={el.sekelebat_post_categories}
                            tag={el.sekelebat_post_tags}
                            excerpt={el.excerpt['rendered']}
                            featuredImage={el.sekelebat_featured_image}
                            author={el.sekelebat_author_name}
                            date={el.sekelebat_published_date}
                            link={el.link}
                        />
                    );
                } );
                taxTitle = this.state.taxInfo['name'] + ' - ' + this.state.sitedesc;
            }
        }

        return (
            <Aux>
                {notFound}
                <Helmet>
                    <title>{taxTitle}</title>
                </Helmet>
                <div id="posts" className="col-12 col-md-8">
                    {content}
                </div>
            </Aux>
        );
    }

}

export default Archive;