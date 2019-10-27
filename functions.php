<?php

// Remove title
remove_action('wp_head', '_wp_render_title_tag', '1');

// Rewrite archives url
add_action( 'init', 'rewritePostTypeArchive' );
function rewritePostTypeArchive() {
	global $wp_rewrite;
	return $wp_rewrite->date_structure = 'archives/%year%/%monthnum%/%day%';
}

// Remove Yoast Meta SEO will call using react-helmet
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
if (is_plugin_active('wordpress-seo/wp-seo.php')) {
	function sekelebat_remove_yoast_meta($filter){
		return false;
	}

	add_filter( 'wpseo_title', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_robots', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_canonical', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_metadesc', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_locale', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_opengraph_title', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_opengraph_desc', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_opengraph_url', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_opengraph_type', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_opengraph_image', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_opengraph_image_size', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_opengraph_site_name', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_opengraph_author_facebook', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_opengraph_show_publish_date', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_twitter_card_type', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_twitter_title', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_twitter_description', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_twitter_site', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_twitter_image', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_twitter_creator_account', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_json_ld_output', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_next_rel_link', 'sekelebat_remove_yoast_meta');
	add_filter( 'wpseo_prev_rel_link', 'sekelebat_remove_yoast_meta');
}

function sekelebat_load_scripts() {
	wp_enqueue_style( 'bootstrap-style', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', '', '4.3.1', 'all');
	wp_enqueue_style( 'fontawesome-style', 'https://use.fontawesome.com/releases/v5.3.1/css/all.css', '', '5.3.1', 'all');

	wp_enqueue_script( 'sekelebat-script', get_stylesheet_directory_uri() . '/dist/app.js' , array(), '1.0', true );
	wp_enqueue_script( 'bootstrap-js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', array( 'jquery' ), '4.3.1', true );

	$url = trailingslashit( home_url() );
	$path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );
	$logo = null;
	$custom_logo_id = get_theme_mod( 'custom_logo' );
	if( !empty( $custom_logo_id ) ){
		$logo = wp_get_attachment_image_src( $custom_logo_id , 'full' );
	}
	wp_scripts()->add_data( 'sekelebat-script', 'data', sprintf( 'var SekelebatSettings = %s;', wp_json_encode( array(
		'title' => get_bloginfo( 'name', 'display' ),
		'description' => get_bloginfo( 'description', 'display' ),
		'path' => $path,
		'domain' =>  esc_url_raw( $url ),
		'logo' => $logo,
	) ) ) );
}
add_action( 'wp_enqueue_scripts', 'sekelebat_load_scripts' );

// replaces the excerpt "[...]" to be "..."
function sekelebat_excerpt_more() {
	return esc_html__( '...', 'sekelebat' );
}
add_filter( 'excerpt_more', 'sekelebat_excerpt_more' );

function sekelebat_config(){

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'sekelebat' ),
			'footer' => __( 'Footer Menu', 'sekelebat' ),
		)
	);

	$args = array(
		'height'      => 90,
		'width'      => 350,
		'flex-width'  => true,
		'header-text' => array( 'site-title', 'site-description' )
	);
	add_theme_support( 'custom-logo', $args);

	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'align-wide' );

}
add_action( 'after_setup_theme', 'sekelebat_config', 0 );

// registering sidebar
function sekelebat_sidebar(){

	register_sidebar(
		array(
			'name' => 'Sidebar',
			'id' => 'sidebar-area',
			'description' => esc_html__( 'This is the blog sidebar. You can add your widgets here', 'buildx' ),
			'before_widget' => '<div class="widget-wrapper">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>'
		)
	);

}
add_action('widgets_init', 'sekelebat_sidebar');

/**
 * Generate custom search form
 *
 * @param string $form Form HTML.
 * @return string Modified form HTML.
 */
function sekelebat_search_form() {
	$form = '<form id="search" role="search" method="get" class="form-inline" action="'.esc_url( home_url( '/search' ) ).'">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="'.esc_attr_x( 'Search here', 'placeholder', 'sekelebat' ).'" name="s">
					<div class="input-group-append">
						<button class="btn" type="submit"><span class="fas fa-search"></span></button>
					</div>
				</div>
			</form>';

	return $form;
}
add_filter( 'get_search_form', 'sekelebat_search_form' );

function sekelebat_post_archive( $args, $request ) {

	if( ! empty( $request['year'] ) ) $args['date_query'][0]['year'] = $request['year'];
	if( ! empty( $request['monthnum'] ) ) $args['date_query'][0]['monthnum'] = $request['monthnum'];
	if( ! empty( $request['day'] ) ) $args['date_query'][0]['day'] = $request['day'];
	if( ! empty( $request['date_query_column'] ) ) $args['date_query'][0]['column'] = $request['date_query_column'];

	return $args;
}
add_filter( 'rest_post_query', 'sekelebat_post_archive' , 10, 2 );

add_filter( 'rest_post_collection_params', function( $query_params ) {
	$query_params['date_query_column'] = [
		'description' => __( 'The date query column.' ),
		'type'        => 'string',
		'enum'        => [ 'post_date', 'post_date_gmt', 'post_modified', 'post_modified_gmt', 'comment_date', 'comment_date_gmt' ],
	];
	return $query_params;
} );

function get_sekelebat_webinfo() {
	return get_bloginfo('name');
}

function get_sekelebat_get_author_name( $object, $field_name, $request ) {
	return get_the_author_meta( 'display_name' );
}

function get_sekelebat_get_image_src( $object, $field_name, $request ) {
	if($object[ 'featured_media' ] == 0) {
		return $object[ 'featured_media' ];
	}
	$feat_img_array = wp_get_attachment_image_src( $object[ 'featured_media' ], 'medium', true );
	return $feat_img_array[0];
}

function get_sekelebat_published_date( $object, $field_name, $request ) {
	return get_the_time('F j, Y');
}

function get_sekelebat_post_categories( $object, $field_name, $request ){

	$postCategory = [];
	foreach ( (array)$object['categories'] as $category ){
		array_push( $postCategory, [ get_category( $category )->name , get_category( $category )->slug ] );
	}

	return $postCategory;
}

function get_sekelebat_post_tags( $object, $field_name, $request ){

	$postTag = [];
	foreach ( (array)$object['tags'] as $tag ){
		array_push( $postTag, [ get_tag( $tag )->name , get_tag( $tag )->slug ] );
	}

	return $postTag;
}

function post_route_handler( $data )
{
	$postURL = site_url().'/'.$data['url'];
	$postID = url_to_postid( $postURL );
	$postType = get_post_type( $postID );
	$route = $postType === 'post' ? '/wp/v2/posts/'.$postID : '/wp/v2/pages/'.$postID;
	$request = new WP_REST_Request( 'GET', $route );
	$response = rest_do_request( $request );
	$post = $response->data;

	return $post;
}

function category_route_handler( $data )
{
	$slug = $data['url'];
	if( strpos( $slug, '/page/' ) ){
		$getSlug = explode( '/page/', $slug);
		$slug = $getSlug[0];
		$page = '&page='.$getSlug[1];
	}else{
		$page = '';
	}
	$categoryID = get_category_by_slug($slug)->cat_ID;
	if( $categoryID == null ){
		$categoryID = 0; // Impossible to Category's/Tag's taxonomy use this ID, WordPress default Category's ID start from 1, return empty json
	}
	$url = site_url().'/wp-json/wp/v2/posts?categories='.$categoryID.$page;
	$request = WP_REST_Request::from_url( $url );
	$response = rest_do_request( $request );
	$post = $response->data;
	$headers = $response->get_headers();

	return array( $categoryID, $post, $headers );
}

function tag_route_handler( $data )
{
	$slug = $data['url'];
	if( strpos( $slug, '/page/' ) ){
		$getSlug = explode( '/page/', $slug);
		$slug = $getSlug[0];
		$page = '&page='.$getSlug[1];
	}else{
		$page = '';
	}
	$tagID = get_term_by( 'slug', $slug, 'post_tag' )->term_id;
	if( $tagID == null ){
		$tagID = 0; // Impossible to Category's/Tag's taxonomy use this ID, WordPress default Tag's ID start from 2, return empty json
	}
	$url = site_url().'/wp-json/wp/v2/posts?tags='.$tagID.$page;
	$request = WP_REST_Request::from_url( $url );
	$response = rest_do_request( $request );
	$post = $response->data;
	$headers = $response->get_headers();

	return array($tagID, $post, $headers);
}

function author_route_handler( $data ){
	$explodeUrl = $data['url'];
	if( strpos( $explodeUrl, '/page/' ) ){
		$getSlug = explode( '/page/', $explodeUrl);
		$slug = $getSlug[0];
		$page = '&page='.$getSlug[1];
	}else{
		$slug = $explodeUrl;
		$page = '';
	}
	$authorID = $slug;
	$authorDisplayName = get_the_author_meta( 'display_name', $authorID );
	$url = site_url().'/wp-json/wp/v2/posts?author='.$authorID.$page;
	$request = WP_REST_Request::from_url( $url );
	$response = rest_do_request( $request );
	$post = $response->data;
	$headers = $response->get_headers();

	return array($authorDisplayName, $post, get_bloginfo( 'name' ), $headers);
}

// Add various fields to the JSON output
function sekelebat_register_fields() {

	// Add Author Name
	register_rest_field( array( 'post', 'page' ),
		'sekelebat_webinfo',
		array(
			'get_callback'      => 'get_sekelebat_webinfo',
			'update_callback'   => null,
			'schema'            => null
		)
	);

	// Add Author Name
	register_rest_field( array( 'post', 'page' ),
		'sekelebat_author_name',
		array(
			'get_callback'      => 'get_sekelebat_get_author_name',
			'update_callback'   => null,
			'schema'            => null
		)
	);

	// Add Featured Image
	register_rest_field( array( 'post', 'page' ),
		'sekelebat_featured_image',
		array(
			'get_callback'      => 'get_sekelebat_get_image_src',
			'update_callback'   => null,
			'schema'            => null
		)
	);

	// Add Published Date
	register_rest_field( array( 'post', 'page' ),
		'sekelebat_published_date',
		array(
			'get_callback'      => 'get_sekelebat_published_date',
			'update_callback'   => null,
			'schema'            => null
		)
	);

	// Add Post Category
	register_rest_field( 'post',
		'sekelebat_post_categories',
		array(
			'get_callback'      => 'get_sekelebat_post_categories',
			'update_callback'   => null,
			'schema'            => null
		)
	);

	register_rest_field( 'post',
		'sekelebat_post_tags',
		array(
			'get_callback'      => 'get_sekelebat_post_tags',
			'update_callback'   => null,
			'schema'            => null
		)
	);

	// Custom EndPoint
	register_rest_route('sekelebat/v1', '/post/(?P<url>[a-zA-Z0-9-+/:?]+)', array(
		'methods' => 'GET',
		'callback' => 'post_route_handler',
	));

	register_rest_route('sekelebat/v1', '/category/(?P<url>[a-zA-Z0-9-+/:?]+)', array(
		'methods' => 'GET',
		'callback' => 'category_route_handler',
	));

	register_rest_route('sekelebat/v1', '/tag/(?P<url>[a-zA-Z0-9-+/:?]+)', array(
		'methods' => 'GET',
		'callback' => 'tag_route_handler',
	));

	register_rest_route('sekelebat/v1', '/author/(?P<url>[a-zA-Z0-9-+/:?]+)', array(
		'methods' => 'GET',
		'callback' => 'author_route_handler',
	));

}
add_action( 'rest_api_init', 'sekelebat_register_fields' );


?>