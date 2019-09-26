import React, { Component } from 'react';
import {Helmet} from "react-helmet/es/Helmet";

import Content from './component/content/content';
import Aux from "./hoc/Auxiliary";

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
        if( window.location.href.split(SekelebatSettings.domain)[1].split('/')[0] === "tag" ){
            let type = 'tag';
        }

        fetch( SekelebatSettings.domain +  "wp-json/sekelebat/v1/"+ type +"/" + window.location.href )
            .then( response => {
                if ( !response.ok ) {
                    throw Error(response.statusText);
                }
                return response.json();
            } )
            .then( result => {
                postList = result[1];
                let taxUrl = SekelebatSettings.domain +  "/wp-json/wp/v2/categories/" + result[0];
                fetch( taxUrl ).then( webResponse => {
                    if ( !webResponse.ok ) {
                        throw Error(webResponse.statusText);
                    }
                    return webResponse.json();
                } ).then( taxResult => {
                    this.setState({posts: postList, taxInfo: taxResult, sitedesc: result[2], url: window.location.href, loadedPost: true});
                } )
            } );
    }

    render() {

        console.log(this.state.taxInfo);

        let content = <div className="loading">Loading  gan</div>;
        let taxTitle = '';
        if( this.state.loadedPost ) {
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

        console.log(this.state.posts);

        return (
            <Aux>
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