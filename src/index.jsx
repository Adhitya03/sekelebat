import React, { Component } from 'react';
import {Helmet} from "react-helmet/es/Helmet";

import Content from './component/content/content';
import Aux from './hoc/Auxiliary';
import Pagination from './component/paginations';
import Loading from './component/loading';

class Index extends Component{

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            webInfo: [],
            url: null,
            totalPages: null,
            currentpage: null,
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
        let currentpage = 1;
        let totalPages = '';
        if( pageUrl.includes('page') ){
            currentpage = pageUrl.split('/page/')[1].replace( '/', '');
            url = SekelebatSettings.domain +  "wp-json/wp/v2/posts?page=" + currentpage;
        }else{
             url = SekelebatSettings.domain +  "wp-json/wp/v2/posts";
        }
        fetch( url )
            .then( response => {
                if ( !response.ok ) {
                    throw Error(response.statusText);
                }
                for (var pair of response.headers.entries()) {
                    // getting the total number of pages
                    if (pair[0] === 'x-wp-totalpages') {
                        totalPages = pair[1];
                    }
                }
                return response.json();
            } )
            .then( result => {
                this.setState({posts: result, url: window.location.href, totalPages: totalPages, currentpage: currentpage, loadedPost: true});
        } )
    }

    render() {

        const siteTitle = SekelebatSettings.title + ' - ' + SekelebatSettings.description;
        let content = <Loading/>;
        let pagination = '';
        if( this.state.loadedPost ) {
            if( this.state.posts.length === 0 ){
                content = <div>Sorry, no posts matched your criteria.</div>;
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
                            authorID={el.author}
                            date={el.sekelebat_published_date}
                            link={el.link}
                        />
                    );
                } );
                pagination = <Pagination pagination={this.state.totalPages} currentPage={this.state.currentpage}/>;
                window.scrollTo(0, 0);
            }
        }

        return (
            <Aux>
                <Helmet>
                    <title>{siteTitle}</title>
                </Helmet>
                <div id="blog-post" className="col-12 col-md-9">
                    {content}
                    {pagination}
                </div>
            </Aux>
        );
    }

}

export default Index;