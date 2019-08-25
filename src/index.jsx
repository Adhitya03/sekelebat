import React, { Component } from 'react';
import Content from './component/content/content';

class Index extends Component{

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            url: null
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.posts !== this.state.posts;
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
            this.setState({posts: result, url: window.location.href});
            console.log(url);
        } )
    }

    render() {



        console.log("Index Called");

        return (
            <div id="posts" className="col-12 col-md-8">

            </div>
        );
    }

}

export default Index;