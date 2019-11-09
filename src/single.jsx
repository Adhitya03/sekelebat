import React, { Component } from 'react';

import ContentSingle from "./component/content/content-single";
import ContentPage from "./component/content/content-page";
import Aux from "./hoc/Auxiliary";
import PostMeta from "./component/wp-head/post-meta";
import Pagemeta from "./component/wp-head/page-meta";
import Loading from "./component/loading";
import NotFound from "./component/404";
import Comment from "./comments";

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

    commentForm( comment_id, comment_post_ID,  comment_parent ){
        return '<form id="' + comment_id + '" method="post" action="' + SekelebatSettings.domain + 'wp-comments-post.php">' +
                    '<div class="form-group">' +
                        '<label>Comment *</label>' +
                        '<textarea class="form-control" name="comment" cols="30" rows="3" required></textarea>' +
                    '</div>' +
                    '<div class="form-row">' +
                        '<div class="col-md-6 col-12 mb-3">' +
                            '<label>Name *</label>' +
                            '<input class="form-control" type="text" name="author" required>' +
                        '</div>' +
                        '<div class="col-md-6 col-12 mb-3">' +
                            '<label>Email *</label>' +
                            '<input class="form-control" type="text" name="email" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label>Website</label>' +
                        '<input class="form-control" type="text" name="url">' +
                    '</div>' +
                    '<input id="comment-submit-botton" class="btn btn-light" type="submit" name="submit" value="Submit">' +
                    '<input type="hidden" name="comment_post_ID" value="' + comment_post_ID + '">' +
                    '<input type="hidden" name="comment_parent" value="' + comment_parent + '">' +
                '</form>';
    }

    commentFormHandler( comment_post_ID,  comment_parent, data_belowelement){
        // Check if there is a comment form opened, remove it
        const element = document.getElementById("sekelebat-comment-form-child");
        if( element !== null ){
            element.remove();
        }
        document.getElementById(data_belowelement).insertAdjacentHTML( 'beforeend' ,this.commentForm( 'sekelebat-comment-form-child', comment_post_ID,  comment_parent  ));
    }

    addEventListenetCommentReply(){
        const comment_reply = document.querySelectorAll(".comment-reply-link");
        comment_reply.forEach(  el => {
            el.addEventListener( 'click', e => {
                this.commentFormHandler( e.target.attributes['data-postid'].nodeValue, e.target.attributes['data-commentid'].nodeValue, e.target.attributes['data-belowelement'].nodeValue );
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
                this.state.post.yoast_meta.push({postTitle: this.state.post.title['rendered']});
                metas = this.state.post.yoast_meta;
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
                this.state.post.yoast_meta.push({pageTitle: this.state.post.title['rendered']});
                metas = this.state.post.yoast_meta;
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
                    <h4>Join the Conversation </h4>
                    <div dangerouslySetInnerHTML={{ __html: this.commentForm( 'sekelebat-comment-form-post', this.state.post.id, 0 ) }}/>
                </article>
            </Aux>
        );
    }

}

export default Single;