import React, { Component } from 'react';
import Content from './component/content/content';

class Archive extends Component{

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            url: null
        };
    }

    fetchPost(){
        let type = 'category';
        if(window.location.href.split(SekelebatSettings.domain)[1].split('/')[0] === "tag"){
            let type = 'tag';
        }

        fetch( SekelebatSettings.domain +  "wp-json/sekelebat/v1/"+ type +"/" + window.location.href )
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
        const posts = this.state.posts.map( el => {
            return(
                <Content
                    key={el.id}
                    title={el.title['rendered']}
                    featuredImage={el.sekelebat_featured_image_src}
                    date={el.sekelebat_published_date}
                    author={el.sekelebat_author_name}
                    link={el.link}
                    categories={el.sekelebat_post_categories}
                    excerpt={el.excerpt['rendered']}
                    content={el.content['rendered']}
                />
            );
        } );

        console.log("Index Called");

        return (
            <div id="posts" className="col-12 col-md-8">
                {posts}
            </div>
        );
    }

}

export default Archive;