import React, { Component } from 'react';
import { Link } from "react-router-dom";

class footer extends Component{

    constructor( props ){
        super( props );
        this.state = {
            footerMenu: []
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.footerMenu !== this.state.footerMenu;
    }

    componentDidMount() {
        this.fetchFooterMenu();
    }

    fetchFooterMenu(){
        fetch( SekelebatSettings.domain + "/wp-json/menus/v1/menus/footer" )
            .then( respons => {
                if(!respons.ok){
                    Error(respons.statusText);
                }
                return respons.json();
            } )
            .then( result =>{
                this.setState({ footerMenu: result.item});
            } );
    };

    render(){

        const footerMenu = this.state.footerMenu.map( (el) => {
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
                        {footerMenu}
                    </ul>
                </div>
            </div>
        );

    };

}

export default footer;