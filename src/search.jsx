import React, { Component } from 'react';

class Search extends Component {

    fetchPosts(){
        const pageUrl = window.location.href;
        const getQuery = pageUrl.split( SekelebatSettings.domain + 'search?s=' )[1];
        const url = SekelebatSettings.domain + "wp-json/wp/v2/search?search=" + getQuery;
        fetch( url )
            .then( response => {
                if(!response.ok){
                    throw Error(response.statusText);
                }
                return response.json();
            } )
            .then( result => {
                this.setState({posts: result, pageName: "Search : " + getQuery, siteName: SekelebatSettings.title, totalPages: 1, type: "search", slug: "search", url: window.location.href, loadedPost: true});
            });
    }


    render() {
        return (
           <div></div>
        )};


}

export default Search;