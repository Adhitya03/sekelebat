import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
            menus: []
        };
    }

    componentDidMount() {
        this.fetchMenu();
    }

    fetchMenu(){
        fetch(SekelebatSettings.URL.root + "/wp-json/menus/v1/menus/primary")
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(res => {
                this.setState({menus: res.items});
            });
    };

    render() {
        const menus = this.state.menus.map( (el) =>{
            return(
                <li key={el.ID}>
                    <Link to={el.url}>
                        {el.title}
                    </Link>
                </li>);
        });

        return(
            <div className="container">
                <div id="masthead" className="site-header" role="banner">
                    <nav className="navbar navbar-expand-lg navbar-light ">
                        <h1 className="site-title">
                            <Link to={SekelebatSettings.path}>Sekelebat</Link>
                        </h1>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                {menus}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }

}

export default Header;