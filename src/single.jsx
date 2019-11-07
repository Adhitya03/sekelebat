import React, { Component } from 'react';

import ContentSingle from "./component/content/content-single";
import ContentPage from "./component/content/content-page";
import Aux from "./hoc/Auxiliary";
import PostMeta from "./component/wp-head/post-meta";
import Pagemeta from "./component/wp-head/page-meta";
import Loading from "./component/loading";
import NotFound from "./component/404";
import Comment from "./comments";
import ReactDOM from "react-dom";

class Single extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            post: [],
            url: null,
            loadedPost: false,
        };
    }

    shouldComponentUpdate() {
        if( this.state.url === null ){
            return true;
        }else if( this.state.url !== window.location.href && !window.location.href.includes("#comment-") ){
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this.fetchPost();
        this.addEventListenetCommentReply();
    }

    componentDidMount() {
        this.fetchPost();
    }

    commentForm( comment_post_ID,  comment_parent, data_belowelement){
        // Check if there is a comment form opened, remove it form
        const element = document.getElementById("sekelebat-comment-form");
        if( element !== null ){
            element.remove( element );
        }

        const f = document.createElement("form");
        f.setAttribute('id',"sekelebat-comment-form");
        f.setAttribute('method',"post");
        f.setAttribute('action',"http://www.reactwordpressid.com/wp-comments-post.php");

        const i = document.createElement("textarea"); //textarea element, text
        i.setAttribute('name',"comment");

        const a = document.createElement("input"); //input element, text
        a.setAttribute('type',"text");
        a.setAttribute('name',"author");

        const em = document.createElement("input"); //input element, text
        em.setAttribute('type',"email");
        em.setAttribute('name',"email");

        const u = document.createElement("input"); //input element, text
        u.setAttribute('type',"url");
        u.setAttribute('name',"url");

        const pid = document.createElement("input"); //input element, text
        pid.setAttribute('type',"hidden");
        pid.setAttribute('name',"comment_post_ID");
        pid.setAttribute('value', comment_post_ID);

        const cid = document.createElement("input"); //input element, text
        cid.setAttribute('type',"hidden");
        cid.setAttribute('name',"comment_parent");
        cid.setAttribute('value', comment_parent);

        const s = document.createElement("input"); //input element, Submit button
        s.setAttribute('type',"submit");
        s.setAttribute('name',"submit");
        s.setAttribute('value',"Submit");

        f.appendChild(i);
        f.appendChild(a);
        f.appendChild(em);
        f.appendChild(u);
        f.appendChild(pid);
        f.appendChild(cid);
        f.appendChild(s);

        document.getElementById(data_belowelement).appendChild( f );
    }

    addEventListenetCommentReply(){
        const comment_reply = document.querySelectorAll(".comment-reply-link");
        comment_reply.forEach(  el => {
            el.addEventListener( 'click', e => {
                this.commentForm( e.target.attributes['data-postid'].nodeValue, e.target.attributes['data-commentid'].nodeValue, e.target.attributes['data-belowelement'].nodeValue );
            })
        } )
    }

    fetchPost(){
        const slug = window.location.href.split( SekelebatSettings.domain )[1];
        const url = SekelebatSettings.domain +  "wp-json/sekelebat/v1/post/" + slug;
        fetch( url )
            .then( response => {
                if ( !response.ok ) {
                    throw Error(response.statusText);
                }
                return response.json();
            } )
            .then( result => {
                this.setState({post: result, url: window.location.href, loadedPost: true});
            } );
    }

    render() {
        let content = <Loading/>;
        let meta = '';
        let metas = '';
        let comment = '';
        if( this.state.loadedPost ){
            if( this.state.post.type === 'post' ){
                let post_title = '';
                if( this.state.post.yoast_meta !== undefined ){
                    if(this.state.post.yoast_meta.length < 3){
                        post_title = {postTitle: this.state.post.title['rendered'] + ' - ' + SekelebatSettings.title};
                    }else{
                        if( this.state.post.yoast_meta[3]['og:title'] === undefined ){
                            post_title = {postTitle: this.state.post.title['rendered'] + ' - ' + SekelebatSettings.title};
                        }else{
                            post_title = {postTitle: this.state.post.title['rendered'] + ' - ' + this.state.post.yoast_meta[3]['og:title']};
                        }
                    }
                    this.state.post.yoast_meta.push(post_title);
                    metas = this.state.post.yoast_meta;
                }else{
                    post_title = {postTitle: this.state.post.title['rendered'] + ' - ' + SekelebatSettings.title};
                    metas = [post_title];
                }

                meta = <PostMeta metaData={metas} />;
                content = <ContentSingle
                    title={this.state.post.title['rendered']}
                    categories={this.state.post.sekelebat_post_categories}
                    tag={this.state.post.sekelebat_post_tags}
                    content={this.state.post.content['rendered']}
                    featuredImage={this.state.post.sekelebat_featured_image}
                    author={this.state.post.sekelebat_author_name}
                    date={this.state.post.sekelebat_published_date}
                    authorID={this.state.post.author}
                />;
                comment = <Comment comments={this.state.post.sekelebat_comment_list} title={this.state.post.title['rendered']}/>
            }else if(this.state.post.type === 'page'){
                let page_title = '';
                if( this.state.post.yoast_meta !== undefined ){
                    if(this.state.post.yoast_meta.length < 3){
                        page_title = {pageTitle: this.state.post.title['rendered'] + ' - ' + SekelebatSettings.title};
                    }else{
                        if( this.state.post.yoast_meta[3]['og:title'] === undefined ){
                            page_title = {pageTitle: this.state.post.title['rendered'] + ' - ' + SekelebatSettings.title};
                        }else{
                            page_title = {pageTitle: this.state.post.title['rendered'] + ' - ' + this.state.post.yoast_meta[3]['og:title']};
                        }
                    }
                    this.state.post.yoast_meta.push(page_title);
                    metas = this.state.post.yoast_meta;
                }else{
                    page_title = {pageTitle: this.state.post.title['rendered'] + ' - ' + SekelebatSettings.title};
                    metas = [page_title];
                }

                meta = <Pagemeta metaData={metas} />;
                content = <ContentPage
                    title={this.state.post.title['rendered']}
                    content={this.state.post.content['rendered']}
                    featuredImage={this.state.post.sekelebat_featured_image}
                    author={this.state.post.sekelebat_author_name}
                    authorSlug={this.state.post.sekelebat_get_author_slug}
                    date={this.state.post.sekelebat_published_date}
                />;
                comment = <Comment comments={this.state.post.sekelebat_comment_list} title={this.state.post.title['rendered']}/>
            }else if( this.state.post.data['status'] === 404 ){
                content = <NotFound/>;
                meta = <PostMeta metaData="404" />;
            }
            window.scrollTo(0, 0);
        }

        return (
            <Aux>
                {meta}
                <article id="single-post" className="col-12 col-md-9">
                    {content}
                    {comment}
                </article>
            </Aux>
        );
    }

}

export default Single;