import React, { Component } from 'react';
import {Helmet} from "react-helmet/es/Helmet";

import Content from './component/content/content';
import Aux from './hoc/Auxiliary';
import Pagination from './component/paginations';

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
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts(){
        let postList = '';
        const pageUrl = window.location.href;
        let url = '';
        if( pageUrl.includes('page') ){
            const pageNumb = pageUrl.split('/');
            console.log(pageNumb[pageNumb.length - 2]);
            url = SekelebatSettings.domain +  "/wp-json/wp/v2/posts?page=" + pageNumb[pageNumb.length - 2];
        }else{
             url = SekelebatSettings.domain +  "/wp-json/wp/v2/posts";
        }

        let pagesNumb = '';
        fetch( url )
            .then( response => {
                for (var pair of response.headers.entries()) {
                    // getting the total number of pages
                    if (pair[0] === 'x-wp-totalpages') {
                        pagesNumb = pair[1];
                    }
                }
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
                this.setState({posts: postList, webInfo: webResult, url: window.location.href, totalPages: pagesNumb,loadedPost: true});
            } )
        } )
    }

    render() {

        let content = <div className="loading">Loading  gan</div>;
        let webInfoTitle = '';
        let pagination = '';
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
            pagination = <Pagination pagination={this.state.totalPages}/>;
        }

        return (
            <Aux>
                <Helmet>
                    <title>{webInfoTitle}</title>
                </Helmet>
                <div id="posts" className="col-12 col-md-8">
                    {content}
                    {pagination}
                </div>
            </Aux>
        );
    }

}

export default Index;