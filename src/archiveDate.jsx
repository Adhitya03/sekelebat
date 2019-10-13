import React, { Component } from 'react';

class ArchiveDate extends Component {

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts(){
        const get_date = window.location.href.split(SekelebatSettings.domain + 'archives/');
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
        console.log(url);

        fetch( url )
            .then( respond => {
                if(!respond.ok){
                    throw Error(respond.statusText);
                }
                console.log(respond);
                return respond.json();
            } )
            .then( result => {

                console.log(result);
            });
    }

    render() {
        return(
            <div> Bla </div>
        );

    }
}

export default ArchiveDate;