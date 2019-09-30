import React, { Component } from 'react';

class Sidebar extends Component {

    constructor( props ){
        super( props );
            this.state = {
                widgets: '',
                loadedSidebar: false
            }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.widgets !== this.state.widgets;
    }

    componentDidMount() {
        this.fetchMenu();
    }

    fetchMenu(){
        fetch( SekelebatSettings.domain + '/wp-json/wp-rest-api-sidebars/v1/sidebars/sidebar-area' )
            .then( response => {
                if( !response.ok ){
                    throw Error( response.statusText );
                }
                return response.json();
            } )
            .then( result => {
                this.setState( { widgets: result.rendered, loadedSidebar: true } );
            });
    }

    render() {

        let sidebar = '';
        if( this.state.loadedSidebar ){
            sidebar = this.state.widgets;
        }

        return (
            <div id="sidebar" className="col-12 col-md-4" dangerouslySetInnerHTML={{ __html: sidebar }}></div>
        );
    }

}

export default Sidebar;