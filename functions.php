<?php

function sekelebat_load_scripts() {
	wp_enqueue_style( 'bootstrap-style', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');

	wp_enqueue_script( 'sekelebat-script', get_stylesheet_directory_uri() . '/dist/app.js' , array(), '1.0', true );

	$url = trailingslashit( home_url() );
	$path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

	wp_scripts()->add_data( 'sekelebat-script', 'data', sprintf( 'var SekelebatSettings = %s;', wp_json_encode( array(
		'title' => get_bloginfo( 'name', 'display' ),
		'path' => $path,
		'domain' =>  esc_url_raw( $url ),
	) ) ) );
}
add_action( 'wp_enqueue_scripts', 'sekelebat_load_scripts' );

function get_sekelebat_get_author_name( $object, $field_name, $request ) {
	return get_the_author_meta( 'display_name' );
}

function get_sekelebat_get_image_src( $object, $field_name, $request ) {
	if($object[ 'featured_media' ] == 0) {
		return $object[ 'featured_media' ];
	}
	$feat_img_array = wp_get_attachment_image_src( $object[ 'featured_media' ], 'thumbnail', true );
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
	$postType = get_post_type( url_to_postid( $data['url'] ) );
	$route = $postType === 'post' ? '/wp/v2/posts/'.url_to_postid( $data['url'] ) : '/wp/v2/pages/'.url_to_postid( $data['url'] );
	$request = new WP_REST_Request( 'GET', $route );
	$response = rest_do_request( $request );
	$post = $response->data;

	return $post;
}

function category_route_handler( $data )
{
	$request = new WP_REST_Request( 'GET', '/wp/v2/posts?categories='.url_to_postid( $data['url'] ) );
	$response = rest_do_request( $request );
	$post = $response->data;

	return $post;
}

function tag_route_handler( $data )
{
	$request = new WP_REST_Request( 'GET', '/wp/v2/posts?tags='.url_to_postid( $data['url'] ) );
	$response = rest_do_request( $request );
	$post = $response->data;

	return $post;
}

// Add various fields to the JSON output
function sekelebat_register_fields() {
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
	register_rest_route('sekelebat/v1', '/post/(?P<url>[a-zA-Z0-9-+/:]+)', array(
		'methods' => 'GET',
		'callback' => 'post_route_handler',
	));

	register_rest_route('sekelebat/v1', '/category/(?P<url>[a-zA-Z0-9-+/:]+)', array(
		'methods' => 'GET',
		'callback' => 'category_route_handler',
	));

	register_rest_route('sekelebat/v1', '/tag/(?P<url>[a-zA-Z0-9-+/:]+)', array(
		'methods' => 'GET',
		'callback' => 'tag_route_handler',
	));
}
add_action( 'rest_api_init', 'sekelebat_register_fields' );

function sekelebat_config(){

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'sekelebat' ),
		)
	);

	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'align-wide' );

}
add_action( 'after_setup_theme', 'sekelebat_config', 0 );

?>