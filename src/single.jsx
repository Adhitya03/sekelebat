import React, { Component } from 'react';
import ContentSingle from './component/content/content-single';

import ContentPage from './component/content/content-page';
import Aux from './hoc/Auxiliary';
import PostMeta from './component/wp-head/post-meta';
import Pagemeta from './component/wp-head/page-meta';

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

        console.log(this.state.post);

        let content = <div className="loading">Loading  gan</div>;
        let title = '';
        let meta = '';
        if( this.state.loadedPost ){
            title = this.state.post.yoast_meta[2]['content'];
            if( this.state.post.type === 'post' ){
                meta = <PostMeta metaData={this.state.post.yoast_meta} />;
                content = <ContentSingle
                    title={this.state.post.title['rendered']}
                    categories={this.state.post.sekelebat_post_categories}
                    tag={this.state.post.sekelebat_post_tags}
                    content={this.state.post.content['rendered']}
                    featuredImage={this.state.post.sekelebat_featured_image}
                    author={this.state.post.sekelebat_author_name}
                    date={this.state.post.sekelebat_published_date}
                />;
            }else if(this.state.post.type === 'page'){
                let page_title = {pgtitle: this.state.post.title['rendered'] + ' - ' + this.state.post.yoast_meta[3]['content']};
                this.state.post.yoast_meta.push(page_title);
                meta = <Pagemeta metaData={this.state.post.yoast_meta} />;
                content = <ContentPage
                    title={this.state.post.title['rendered']}
                    content={this.state.post.content['rendered']}
                    featuredImage={this.state.post.sekelebat_featured_image}
                    author={this.state.post.sekelebat_author_name}
                    date={this.state.post.sekelebat_published_date}
                />;
            }

        }

        return (
            <Aux>
                {meta}
                <div id="single" className="col-12 col-md-8">
                    {content}
                </div>
            </Aux>
        );
    }

}

export default Single;