import React, { Component } from 'react';
import { Link } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";

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

        const options = {
            replace: ({ name, attribs, children }) => {
                if( name === "a" ) {
                    if( attribs.href !== undefined && attribs.href.includes( SekelebatSettings.domain ) ){
                        return(
                                <Link to={ SekelebatSettings.path + attribs.href.split( SekelebatSettings.domain )[1] } className={attribs.class} title={attribs.title}>
                                    {domToReact(children)}
                                </Link>
                            );
                    }else{
                        return(
                            <a href={ attribs.href } className={attribs.class}>
                                {domToReact(children)}
                            </a>
                        );
                    }
                }
            }
        };

        let sidebar = '';
        if( this.state.loadedSidebar ){
            sidebar = parse(this.state.widgets, options);
        }
        return (
            <div id="sidebar" className="col-12 col-md-3">{sidebar}</div>
        );
    }

}

export default Sidebar;