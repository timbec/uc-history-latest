<section class="all-posts-list list">
    <h2>Latest Posts</h2>
    <ul class="list__container">
    <?php 
    
    $allPostsWidget = new WP_Query(array(
        'posts_per_page' => 8,
        'post_type' => array( 'places','news','photos', 'writing', 'post'),
        'orderyby' => 'meta_value_num',
        'order' => 'DESC',
    )); 
    while ($allPostsWidget->have_posts()) {
        $allPostsWidget->the_post(); ?>
        <li class="list__container--item">
        <?php the_post_thumbnail(); ?>
        <div class="list__container--item__content">
            <h3 class="list__container--item__title">
            <a href="<?php the_permalink(); ?>">
            <?php the_title(); ?>
            </a>
        </h3>
        <?php the_excerpt(); ?>
        </div>
        </li>
        
        
    <?php } ?>
    </ul>
</section>