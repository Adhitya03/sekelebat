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

function sekelebat_get_author_name( $object, $field_name, $request ) {
	return get_the_author_meta( 'display_name' );
}

function sekelebat_get_image_src( $object, $field_name, $request ) {
	if($object[ 'featured_media' ] == 0) {
		return $object[ 'featured_media' ];
	}
	$feat_img_array = wp_get_attachment_image_src( $object[ 'featured_media' ], 'thumbnail', true );
	return $feat_img_array[0];
}

function sekelebat_published_date( $object, $field_name, $request ) {
	return get_the_time('F j, Y');
}

// Add various fields to the JSON output
function sekelebat_register_fields() {
	// Add Author Name
	register_rest_field( 'post',
		'author_name',
		array(
			'get_callback'      => 'sekelebat_get_author_name',
			'update_callback'   => null,
			'schema'            => null
		)
	);
	// Add Featured Image
	register_rest_field( 'post',
		'featured_image_src',
		array(
			'get_callback'      => 'sekelebat_get_image_src',
			'update_callback'   => null,
			'schema'            => null
		)
	);
	// Add Published Date
	register_rest_field( 'post',
		'published_date',
		array(
			'get_callback'      => 'sekelebat_published_date',
			'update_callback'   => null,
			'schema'            => null
		)
	);
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