import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            loadedMenus: false
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
                this.setState( { menus: result.items, loadedMenus: true } );
            });
    };

    render() {
        let menuItem = '';
        if( this.state.loadedMenus ){
            menuItem = this.state.menus.map( (el) =>{
                if( el.url.includes( SekelebatSettings.domain ) ){
                    return(
                        <li key={el.ID} className="nav-item">
                            <Link to={ SekelebatSettings.path + el.url.split( SekelebatSettings.domain )[1] } className="nav-link">
                                {el.title}
                            </Link>
                        </li>);
                }else{
                    return(
                        <li key={ el.ID } className="nav-item">
                            <a href={ el.url } className="nav-link">
                                { el.title }
                            </a>
                        </li>);
                }
            });
        }

        let site_title = <Link to={ SekelebatSettings.path }> { SekelebatSettings.title } </Link>;
        if( SekelebatSettings.logo !== null ){
            site_title = <Link to={ SekelebatSettings.path } rel="Home" className="custom-logo"> <img src={SekelebatSettings.logo[0]} alt={SekelebatSettings.title}/> </Link>;
        }

        return(
            <header id="masthead" className="site-header container" role="banner">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="site-title">
                                    {site_title}
                                </h1>
                            </div>
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
                                    { menuItem }
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