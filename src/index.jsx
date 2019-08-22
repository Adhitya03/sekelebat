import React, { Component } from 'react';

import Content from './container/content/content';

class Index extends Component{

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        fetch(SekelebatSettings.domain +  "/wp-json/wp/v2/posts")
            .then( response => {
                if ( !response.ok ) {
                    throw Error(response.statusText);
                }
                return response.json();
            } ).then( result => {
                this.setState({posts: result});
                console.log(result);
        } )
    }

    render() {

        const posts = this.state.posts.map( el => {
            return(
                <Content
                    key={el.id}
                    title={el.title['rendered']}
                    featuredImage={el.featured_image_src}
                    date={el.published_date}
                    author={el.author_name}
                    link={el.link}
                    categories={el.post_categories}
                />
            );
        } );

        return (
            <div id="posts" className="col-12 col-md-8">
                {posts}
            </div>
        );
    }

}

export default Index;