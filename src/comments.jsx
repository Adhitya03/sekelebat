import React, { Component } from "react";
import Aux from "./hoc/Auxiliary";

class Comments extends Component{

    componentDidMount() {
        this.facebookJs();
    }

    componentDidUpdate() {
        this.facebookJs();
    }

    render() {
        return(
            <Aux>
                <div id="cp">
                    <div id="fb-root">
                        <div className="fb-comments" data-href={this.props.url} data-numposts="5" data-colorscheme="light" data-width="100%"/>
                    </div>
                </div>
            </Aux>
        );
    }

}

export default Comments;