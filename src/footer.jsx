import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component{

    constructor( props ){
        super( props );
        this.state = {
            footerMenus: [],
            loadedMenus: false
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.footerMenus !== this.state.footerMenus;
    }

    componentDidMount() {
        this.fetchFooterMenu();
    }

    fetchFooterMenu(){
        fetch( SekelebatSettings.domain + "/wp-json/menus/v1/menus/footer" )
            .then( response => {
                if(!response.ok){
                    Error(response.statusText);
                }
                return response.json();
            } )
            .then( result => {
                this.setState( { footerMenus: result.items, loadedMenus: true} );
            } );
    };

    render(){
        const footer = this.state.footerMenus.map( (el) => {
            if( el.url.includes(SekelebatSettings.domain) ){
                return(
                    <li key={el.ID} className="footer-nav-item">
                        <Link to={SekelebatSettings.path + el.url.split(SekelebatSettings.domain)[1]} className="nav-link">
                            {el.title}
                        </Link>
                    </li>);
            }else{
                return(
                    <li key={el.ID} className="footer-nav-item">
                        <a href={el.url} className="nav-link">
                            {el.title}
                        </a>
                    </li>);
            }
        } );


        return(
            <div id="row" className="row">
                <div className="col-12">
                    <ul>
                        {footer}
                    </ul>
                </div>
            </div>
        );

    }

}

export default Footer;