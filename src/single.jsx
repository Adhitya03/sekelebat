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
                    '<textarea name="comment" cols="30" rows="10"></textarea>' +
                    '<input type="text" name="author">' +
                    '<input type="text" name="email">' +
                    '<input type="text" name="url">' +
                    '<input type="hidden" name="comment_post_ID" value="' + comment_post_ID + '">' +
                    '<input type="hidden" name="comment_parent" value="' + comment_parent + '">' +
                    '<input type="submit" name="submit" value="Submit">' +
                '</form>';
    }

    addCommentForm( comment_post_ID,  comment_parent, data_belowelement){
        // Check if there is a comment form opened, remove it form
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
                this.addCommentForm( e.target.attributes['data-postid'].nodeValue, e.target.attributes['data-commentid'].nodeValue, e.target.attributes['data-belowelement'].nodeValue );
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
                    <div dangerouslySetInnerHTML={{ __html: this.commentForm( 'sekelebat-comment-form-post', this.state.post.id, 0 ) }}/>
                </article>
            </Aux>
        );
    }

}

export default Single;