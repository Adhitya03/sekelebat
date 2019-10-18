import React, { Component } from 'react';
import {Helmet} from "react-helmet/es/Helmet";
import {Redirect} from "react-router-dom";

import Content from './component/content/content';
import Aux from "./hoc/Auxiliary";
import Pagination from "./component/paginations";

class Archive extends Component{

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            pageName: '',
            siteName: '',
            url: null,
            totalPages: null,
            type: '',
            slug: '',
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

        const pageUrl = window.location.href;
        const currentType = pageUrl.split( SekelebatSettings.domain )[1].split( '/' )[0];
        let currentSlug = '';
        if( currentType === "archives" ){
            let pagesNumb = null;
            let archiveUrl = '';
            let currentNumb = null;
            if( pageUrl.includes('page') ){
                const get_archive_url = pageUrl.split('page/');
                currentNumb = get_archive_url[1].split('/')[0];
                archiveUrl = get_archive_url[0];
            }else{
                archiveUrl = pageUrl;
            }
            const get_date = archiveUrl.split(SekelebatSettings.domain + 'archives/');
            currentSlug = get_date[1].slice( 0, -1 );
            const explode_date = get_date[1].split('/').filter( el => {
                return el !== '';
            } );
            let args = '';
            const monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            let archiveName = '';
            if( explode_date.length === 1 ){
                args = '?year=' + explode_date[0];
                archiveName = 'Yearly Archives : ' + explode_date[0];
            }else if( explode_date.length === 2 ){
                args = '?year=' + explode_date[0] + '&monthnum=' + explode_date[1];
                archiveName = 'Monthly Archives : ' + monthNames[explode_date[1].replace(0,'')-1]+ ' ' + explode_date[0];
            }else{
                args = '?year=' + explode_date[0] + '&monthnum=' + explode_date[1]+ '&day=' + explode_date[2];
                archiveName = 'Daily Archives : ' + monthNames[explode_date[1].replace(0,'')-1] + ' ' + explode_date[2] + ' ' + explode_date[0];
            }

            args = args + '&date_query_column=post_modified';

            if( currentNumb !== null ){
                args = args + '&page=' + currentNumb;
            }

            const url = SekelebatSettings.domain +  "wp-json/wp/v2/posts" + args;

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
                    this.setState({posts: result, pageName: archiveName, siteName: SekelebatSettings.title, totalPages: pagesNumb, type: "archives", slug: currentSlug, url: window.location.href, loadedPost: true});
                });
        }else if(currentType === "author"){
            const getSlug = pageUrl.split( SekelebatSettings.domain )[1];
            const currentSlug = getSlug.split( 'author/' );
            let authorID = currentSlug[1].replace( '/', '' );
            if( currentSlug[1].includes( 'page' ) ){
                authorID = currentSlug[1].split( '/page/' )[0];
            }
            const url = SekelebatSettings.domain + "wp-json/sekelebat/v1/" + getSlug;
            fetch( url )
                .then( response => {
                    if(!response.ok){
                        throw Error(response.statusText);
                    }
                    return response.json();
                } )
                .then( result => {
                    const postList = result[1];
                    this.setState({posts: postList, pageName: "Author Archive : " + result[0], siteName: result[2], totalPages: result[3]["X-WP-TotalPages"], type: "author", slug: authorID, url: window.location.href, loadedPost: true});
                });
        }else{
            let postList = '';
            let type = 'categories';
            currentSlug = window.location.href.split(SekelebatSettings.domain)[1].split('/')[1];
            if( currentType === "tag" ){
                type = 'tags';
            }
            const typeUrl = type === 'categories' ? 'category' : 'tag';
            const slug = window.location.href.split( SekelebatSettings.domain + typeUrl + '/' )[1];
            const url = SekelebatSettings.domain +  "wp-json/sekelebat/v1/"+ type + "/" + slug;
            fetch( url )
                .then( response => {
                    if ( !response.ok ) {
                        throw Error( response.statusText );
                    }
                    return response.json();
                } )
                .then( result => {
                    postList = result[1];
                    if( result[0] !== null ){
                        let taxUrl = SekelebatSettings.domain +  "wp-json/wp/v2/"+ type + "/" + result[0];
                        fetch( taxUrl ).then( webResponse => {
                            if ( !webResponse.ok ) {
                                throw Error(webResponse.statusText);
                            }
                            return webResponse.json();
                        } ).then( taxResult => { /*taxResult : Taxonomi Result*/
                            this.setState({posts: postList, pageName: taxResult['name'], siteName: SekelebatSettings.title, totalPages: result[2]["X-WP-TotalPages"], type: currentType, slug: currentSlug, url: window.location.href, loadedPost: true});
                        } )
                    }else{
                        this.setState({posts: postList, url: window.location.href, loadedPost: true});
                    }
                } );
        }
    }

    render() {
        let content = <div className="loading">Loading  gan</div>;
        let taxTitle = '';
        let notFound = '';
        let pagination = '';
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
                            authorID={el.author}
                            date={el.sekelebat_published_date}
                            link={el.link}
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
                {notFound}
                <Helmet>
                    <title>{taxTitle}</title>
                </Helmet>
                <div id="posts" className="col-12 col-md-8">
                    {content}
                    {pagination}
                </div>
            </Aux>
        );
    }

}

export default Archive;