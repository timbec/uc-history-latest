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

<section class="page-container">
<main id="primary" class="site-main page-memorabilia">

<article class="page-memorabilia__intro">
    <h1 class="page-memorabilia__title">Uranium City Memorabilia</h1>

	<p>UC related things people have sent me over the years.  </p>
</article>
	
		    <?php 
    
    $newsWidget = new WP_Query(array(
        'posts_per_page' => 6,
        'post_type' => 'memorabilia',
        'orderyby' => 'meta_value_num',
        'order' => 'ASC',
    )); 
    while ($newsWidget->have_posts()) {
        $newsWidget->the_post(); ?>
        <li class="page-memorabilia__listing">
        <figure class="page-memorabilia__thumbnail">
            <a href="<?php the_permalink(); ?>">
		<?php echo the_post_thumbnail(); ?>
        </a>
        </figure>
        <div class="page-memorabilia__content">
            		<h3>
		<a href="<?php the_permalink(); ?>">
            <?php the_title(); ?>
        </a>
		</h3>
		<p>
			<?php the_excerpt(); ?>
		</p>
        </div>
        </li>
        
        
    <?php } ?>

	</main><!-- #main -->

<?php
get_sidebar();?>
</section>
<?php
get_footer();
