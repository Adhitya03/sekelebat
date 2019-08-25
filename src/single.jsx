import React, { Component } from 'react';
import ContentSingle from './component/content/content-single';
import ContentPage from './component/content/content-page';

class Single extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: [],
            url: null,
            loadedPost: false,
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
        fetch( SekelebatSettings.domain +  "wp-json/sekelebat/v1/post/" + window.location.href )
            .then( response => {
                if ( !response.ok ) {
                    throw Error(response.statusText);
                }
                return response.json();
            } )
            .then( result => {
                this.setState({post: result, url: window.location.href, loadedPost: true});
            } );
    }

    render() {

        let content = <div className="loading">Loading  gan</div>;
        if( this.state.loadedPost ){

            if( this.state.post.type === 'post' ){
                content = <ContentSingle
                    title={this.state.post.title['rendered']}
                    categories={this.state.post.sekelebat_post_categories}
                    tag={this.state.post.sekelebat_post_tags}
                    content={this.state.post.content['rendered']}
                    featuredImage={this.state.post.sekelebat_featured_image_src}
                    author={this.state.post.sekelebat_author_name}
                    date={this.state.post.sekelebat_published_date}
                />;
            }else if(this.state.post.type === 'page'){
                content = <ContentPage
                    title={this.state.post.title['rendered']}
                    content={this.state.post.content['rendered']}
                    featuredImage={this.state.post.sekelebat_featured_image_src}
                    author={this.state.post.sekelebat_author_name}
                    date={this.state.post.sekelebat_published_date}
                />;
            }

        }

        return (
            <div id="single" className="col-12 col-md-8">
                {content}
            </div>
        );
    }

}

export default Single;