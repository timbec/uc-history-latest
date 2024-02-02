<section class="single-posts-list single">
    <h2>Latest Posts:</h2>
    <ul class="single__container">
    <?php 
    
    $allPostsWidget = new WP_Query(array(
        'posts_per_page' => 1,
        'post_type' => array( 'news','photos', 'writing', 'post'),
        'orderyby' => 'meta_value_num',
        'order' => 'DESC',
    )); 
    while ($allPostsWidget->have_posts()) {
        $allPostsWidget->the_post(); ?>
         <li class="single__container--item">
                <h3 class="single__container--item__title">
                    <a href="<?php the_permalink(); ?>">
                    <?php the_title(); ?>
                    </a>
                </h3>
                
                <a class="single__container--item__image" href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail(); ?> 
                </a>
        </li>
    <?php } ?>
    </ul>
</section>