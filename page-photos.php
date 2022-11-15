<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package uc-history-2022
 */

get_header();
?>

	<main id="primary" class="site-main page-photos">

    <article class="page-photos__intro">
        	<h1>Photo Galleries</h1>

	<p>Photographs, taken by me and other people, from UC and area.</p>
    </article>

    <section class="page-photos__content">
        	    <?php 
    
    $photoWidget = new WP_Query(array(
        'posts_per_page' => -1,
        'post_type' => 'photos',
        'orderyby' => 'meta_value_num',
        'order' => 'ASC',
    )); 
    while ($photoWidget->have_posts()) {
        $photoWidget->the_post(); ?>
        <li class="page-photos__listing">
        <figure class="page-photos__thumbnail">
            <a href="<?php the_permalink(); ?>">
		<?php echo the_post_thumbnail(); ?>
        </a>
        </figure>
        <div class="page-photos__meta">
            		<h3>
		<a href="<?php the_permalink(); ?>">
            <?php the_title(); ?>
        </a>
		</h3>
		<!-- <p>
			<?php //the_excerpt(); ?>
		</p> -->
        </div>
        </li>
        
        
    <?php } ?>
    </section>

	</main><!-- #main -->

<?php
get_footer();
