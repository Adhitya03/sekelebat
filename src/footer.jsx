import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component{

    constructor( props ){
        super( props );
        this.state = {
            footerMenus: [],
            loadedfooterMenus: false
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
                console.log(response);
                if(!response.ok){
                    throw Error(response.statusText);
                }
                return response.json();
            } )
            .then( result => {
                this.setState( { footerMenus: result.items, loadedfooterMenus: true} );
            } );
    };

    render(){
        let footerItemMenus = '';
        if( this.state.loadedfooterMenus ){
            console.log(this.state.loadedfooterMenus);
            footerItemMenus = this.state.footerMenus.map( (el) => {
                if( el.url.includes( SekelebatSettings.domain ) ){
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
        }
        return(
            <div id="row" className="row">
                <div className="col-12">
                    <ul>
                        { footerItemMenus }
                    </ul>
                </div>
            </div>
        );

    }

}

export default Footer;