<?php

/* Remove All Yoast SEO OpenGraph Output
 * There is an on/off switch in the plugin Admin > SEO > Social > Facebook
 * Credit: Unknown
 * Last Tested: Apr 01 2017 using Yoast SEO 4.5 on WordPress 4.7.3
 */
add_action('wp_head', 'remove_all_wpseo_og', 1);
function remove_all_wpseo_og() {
	remove_action( 'wpseo_head', array( $GLOBALS['wpseo_og'], 'opengraph' ), 30 );
}

// Remove Yoast Meta SEO will call using react-helmet
function sekelebat_remove_yoast_meta($filter){
	return false;
}
add_filter( 'wpseo_title', 'sekelebat_remove_yoast_meta');
add_filter( 'wpseo_output_twitter_card', 'sekelebat_remove_yoast_meta');
add_filter( 'wpseo_robots', 'sekelebat_remove_yoast_meta');
add_filter( 'wpseo_canonical', 'sekelebat_remove_yoast_meta');
add_filter( 'wpseo_metadesc', 'sekelebat_remove_yoast_meta');

?>