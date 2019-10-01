import React, { Component } from 'react';
import {Helmet} from "react-helmet/es/Helmet";

import Content from './component/content/content';
import Aux from './hoc/Auxiliary';

class Index extends Component{

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            webInfo: [],
            url: null,
            totalPages: null,
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
        let url = SekelebatSettings.domain +  "/wp-json/wp/v2/posts";

        fetch( url )
            .then( response => {
                if ( !response.ok ) {
                    throw Error(response.statusText);
                }
                return response.json();
            } ).then( result => {
            postList = result;
            let webUrl = SekelebatSettings.domain +  "/wp-json/";
            fetch( webUrl ).then( webResponse => {
                if ( !webResponse.ok ) {
                    throw Error(webResponse.statusText);
                }
                return webResponse.json();
            } ).then( webResult => {
                this.setState({posts: postList, webInfo: webResult, url: window.location.href, loadedPost: true});
            } )
        } )
    }

    render() {

        let content = <div className="loading">Loading  gan</div>;
        let webInfoTitle = '';
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
            webInfoTitle = this.state.webInfo['name'] + ' - ' + this.state.webInfo['description'];
        }

        return (
            <Aux>
                <Helmet>
                    <title>{webInfoTitle}</title>
                </Helmet>
                <div id="posts" className="col-12 col-md-8">
                    {content}
                </div>
            </Aux>
        );
    }

}

export default Index;