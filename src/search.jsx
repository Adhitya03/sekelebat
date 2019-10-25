import React, { Component } from 'react';
import {Helmet} from "react-helmet/es/Helmet";

import ContentSearch from "./component/content/content-search";
import Aux from "./hoc/Auxiliary";
import Pagination from "./component/paginations";
import NotFound from "./component/404";

class Search extends Component {

    constructor( props ){
        super( props );
        this.state = {
            posts: [],
            pageName: '',
            siteName: '',
            url: null,
            totalPages: null,
            type: '',
            slug: '',
            loadedPost: false
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    componentDidUpdate() {
        this.fetchPosts();
    }

    shouldComponentUpdate() {
        return this.state.url !== window.location.href;
    }

    fetchPosts(){
        const pageUrl = window.location.href;
        let getQuery = pageUrl.split( SekelebatSettings.domain + 'search?s=' )[1];
        let currentNumb = null;
        let searchQuery = '';
        let pagesNumb;
        if( pageUrl.includes('/page/') ){
            const get_searchUrl_url = pageUrl.split('/page/');
            currentNumb = get_searchUrl_url[1].split('/')[0];
            getQuery = get_searchUrl_url[0].split( SekelebatSettings.domain + 'search?s=' )[1];
            searchQuery = getQuery + '&page=' + currentNumb;
            console.log(searchQuery);
        }else{
            searchQuery = getQuery;
        }
        const url = SekelebatSettings.domain + "wp-json/wp/v2/search?search=" + searchQuery;
        fetch( url )
            .then( response => {
                if(!response.ok){
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
                this.setState({posts: result, pageName: "Search : " + getQuery.replace( '+', ' ' ), siteName: SekelebatSettings.title, totalPages: pagesNumb, type: "search", slug: getQuery, url: window.location.href, loadedPost: true});
            });
    }


    render() {
        let content = '';
        let taxTitle = '';
        let pagination = '';
        if( this.state.loadedPost ){
            if( this.state.posts.length === 0 ){
                content = <NotFound />;
                taxTitle = "Not Found - " + SekelebatSettings.title;
            }else{
                content = this.state.posts.map( el => {
                    return (
                        <ContentSearch
                            key={el.id}
                            title={el.title}
                            link={el.url}
                        />
                    );
                } );
                taxTitle = this.state.pageName + ' - ' + this.state.siteName;
                pagination = <Pagination type={this.state.type} slug={this.state.slug} pagination={this.state.totalPages}/>;
            }
            window.scrollTo(0, 0);
        }

        return (
            <Aux>
                <Helmet>
                    <title>{taxTitle}</title>
                </Helmet>
                <div id="posts" className="col-12 col-md-9">
                    {content}
                    {pagination}
                </div>
            </Aux>
        )};


}

export default Search;