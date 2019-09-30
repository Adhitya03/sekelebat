import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
            menus: []
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.menus !== this.state.menus;
    }

    componentDidMount() {
        this.fetchMenu();
    }

    fetchMenu(){
        fetch(SekelebatSettings.domain + "/wp-json/menus/v1/menus/primary")
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(result => {
                this.setState( { menus: result.items } );
            });
    };

    render() {

        let anchor = '';
        let ref = '';
        const menuItem = this.state.menus.map( (el) =>{
            if( el.url.includes(SekelebatSettings.domain) ){
                return(
                    <li key={el.ID} className="nav-item">
                        <NavLink to={SekelebatSettings.path + el.url.split(SekelebatSettings.domain)[1]} className="nav-link">
                            {el.title}
                        </NavLink>
                    </li>);
            }else{
                return(
                    <li key={el.ID} className="nav-item">
                        <a href={el.url} className="nav-link">
                            {el.title}
                        </a>
                    </li>);
            }

        });

        return(
            <header id="masthead" className="site-header" role="banner">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="row w-100">
                        <div className="col-12">
                            <h1 className="site-title text-center">
                                <a href={SekelebatSettings.path}>Sekelebat</a>
                            </h1>
                        </div>
                        <div className="col-12">
                            <button className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarNav"
                                    aria-controls="navbarNav"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"><i className="burger"> </i></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                                <ul className="navbar-nav">
                                    {menuItem}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

}

export default Header;