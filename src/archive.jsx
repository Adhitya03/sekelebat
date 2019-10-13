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
            taxInfo: '',
            sitedesc: '',
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
        let postList = '';
        let type = 'category';
        let taxType = 'categories';
        const currentType = window.location.href.split(SekelebatSettings.domain)[1].split('/')[0];
        let currentSlug = '';
        if(currentType === "archives"){
            const get_date = window.location.href.split(SekelebatSettings.domain + 'archives/');
            currentSlug = get_date[1];
            let pagesNumb = null;
            const explode_date = get_date[1].split('/').filter( el => {
                return el !== '';
            } );
            let args = '';
            if( explode_date.length === 1 ){
                args = '?year=' + explode_date[0];
            }else if( explode_date.length === 2 ){
                args = '?year=' + explode_date[0] + '&monthnum=' + explode_date[1];
            }else{
                args = '?year=' + explode_date[0] + '&monthnum=' + explode_date[1]+ '&day=' + explode_date[2];
            }

            const url = SekelebatSettings.domain +  "wp-json/wp/v2/posts" + args + "&date_query_column=post_modified";
            console.log(currentSlug);

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
                    let webUrl = SekelebatSettings.domain +  "wp-json/";
                    fetch( webUrl ).then( webResponse => {
                        if ( !webResponse.ok ) {
                            throw Error(webResponse.statusText);
                        }
                        return webResponse.json();
                    } ).then( webResult => {
                        this.setState({posts: result, taxInfo: "Maret 2019", sitedesc: webResult["name"], totalPages: pagesNumb, type: currentType, slug: currentSlug, url: window.location.href, loadedPost: true});
                    } );
                });
        }else{
            currentSlug = window.location.href.split(SekelebatSettings.domain)[1].split('/')[1];
            if( currentType === "tag" ){
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
                        let taxUrl = SekelebatSettings.domain +  "wp-json/wp/v2/"+ taxType + "/" + result[0];
                        fetch( taxUrl ).then( webResponse => {
                            if ( !webResponse.ok ) {
                                throw Error(webResponse.statusText);
                            }
                            return webResponse.json();
                        } ).then( taxResult => {
                            this.setState({posts: postList, taxInfo: taxResult['name'], sitedesc: result[2], totalPages: result[3]["X-WP-TotalPages"], type: currentType, slug: currentSlug, url: window.location.href, loadedPost: true});
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
                            date={el.sekelebat_published_date}
                            link={el.link}
                        />
                    );
                } );
                taxTitle = this.state.taxInfo + ' - ' + this.state.sitedesc;
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