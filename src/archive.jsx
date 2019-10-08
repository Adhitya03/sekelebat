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
            taxInfo: [],
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
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts(){
        let postList = '';
        let type = 'category';
        let taxType = 'categories';
        const currentType = window.location.href.split(SekelebatSettings.domain)[1].split('/')[0];
        const currentSlug = window.location.href.split(SekelebatSettings.domain)[1].split('/')[1];
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
                console.log(result);
                if(result[0] !== null){
                    let taxUrl = SekelebatSettings.domain +  "/wp-json/wp/v2/"+ taxType + "/" + result[0];
                    fetch( taxUrl ).then( webResponse => {
                        if ( !webResponse.ok ) {
                            throw Error(webResponse.statusText);
                        }
                        return webResponse.json();
                    } ).then( taxResult => {
                        this.setState({posts: postList, taxInfo: taxResult, sitedesc: result[2], totalPages: result[3], type: currentType, slug: currentSlug, url: window.location.href, loadedPost: true});
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
                taxTitle = this.state.taxInfo['name'] + ' - ' + this.state.sitedesc;
                pagination = <Pagination type={this.state.type} slug={this.state.slug} pagination={this.state.totalPages["X-WP-TotalPages"]}/>;
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
                    {pagination}
                </div>
            </Aux>
        );
    }

}

export default Archive;