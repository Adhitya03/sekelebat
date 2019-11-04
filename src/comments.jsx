import React, { Component } from "react";
import Aux from "./hoc/Auxiliary";

class Comments extends Component{

    componentDidMount() {
        this.facebookJs();
    }

    componentDidUpdate() {
        this.facebookJs();
    }

    facebookJs(){
        const fjs = document.getElementsByTagName("script")[0];
        const js = document.createElement("script");
        js.id = "facebook-jssdk";
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
        return fjs;
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