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
        fetch(SekelebatSettings.domain + "/wp-json/menus/v1/menus/primary")
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(res => {
                this.setState({menus: res.items});
            });
        console.log("Header");
    };

    render() {

        const menus = this.state.menus.map( (el) =>{
            return(
                <li key={el.ID} className="nav-item">
                    <Link to={SekelebatSettings.path + el.url.split(SekelebatSettings.domain)[1]} className="nav-link">
                        {el.title}
                    </Link>
                </li>);
        });

        return(
            <header id="masthead" className="site-header" role="banner">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="row w-100">
                        <div className="col-12">
                            <h1 className="site-title text-center">
                                <Link to={SekelebatSettings.path}>Sekelebat</Link>
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
                                    {menus}
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