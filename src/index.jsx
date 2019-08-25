import React, { Component } from 'react';
import Content from './component/content/content';

class Index extends Component{

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            url: null,
            loadedPost: false
        };
    }

    shouldComponentUpdate() {
        return this.state.url !== window.location.href;
    }

    componentDidUpdate() {
        this.fetchPost();
    }

    componentDidMount() {
        this.fetchPost();
    }

    fetchPost(){

        let url = SekelebatSettings.domain +  "/wp-json/wp/v2/posts";
        if( window.location.href.split(SekelebatSettings.domain)[1].split('/')[0] === "category" ){
            url = SekelebatSettings.domain +  "wp-json/sekelebat/v1/category/" + window.location.href;
        }else if( window.location.href.split(SekelebatSettings.domain)[1].split('/')[0] === "tag" ){
            url = SekelebatSettings.domain +  "wp-json/sekelebat/v1/tag/" + window.location.href;
        }

        fetch( url )
            .then( response => {
                if ( !response.ok ) {
                    throw Error(response.statusText);
                }
                return response.json();
            } ).then( result => {
            this.setState({posts: result, url: window.location.href, loadedPost: true});
        } )
    }

    render() {

        let content = <div className="loading">Loading  gan</div>;
        if( this.state.loadedPost ) {
            content = this.state.posts.map( el => {
                return (
                    <Content
                        key={el.id}
                        title={el.title['rendered']}
                        categories={el.sekelebat_post_categories}
                        tag={el.sekelebat_post_tags}
                        excerpt={el.content['rendered']}
                        featuredImage={el.sekelebat_featured_image_src}
                        author={el.sekelebat_author_name}
                        date={el.sekelebat_published_date}
                        link={el.link}
                    />
                );
            } );
        }

        return (
            <div id="posts" className="col-12 col-md-8">
                {content}
            </div>
        );
    }

}

export default Index;