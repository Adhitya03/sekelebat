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
            url = SekelebatSettings.domain +  "wp-json/wp/v2/posts?page=" + pageNumb[pageNumb.length - 2];
        }else{
             url = SekelebatSettings.domain +  "wp-json/wp/v2/posts";
        }

        let pagesNumb = '';
        fetch( url )
            .then( response => {
                if ( !response.ok ) {
                    throw Error(response.statusText);
                }
                for (var pair of response.headers.entries()) {
                    // getting the total number of pages
                    if (pair[0] === 'x-wp-totalpages') {
                        pagesNumb = pair[1];
                    }
                }
                return response.json();
            } )
            .then( result => {
                this.setState({posts: result, url: window.location.href, totalPages: pagesNumb, loadedPost: true});
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
                        authorID={el.author}
                        date={el.sekelebat_published_date}
                        link={el.link}
                    />
                );
            } );
            webInfoTitle = SekelebatSettings.title + ' - ' + SekelebatSettings.description;
            pagination = <Pagination pagination={this.state.totalPages}/>;
            window.scrollTo(0, 0);
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