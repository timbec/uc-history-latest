<section class="places-list list">
    <h2>Latest Places</h2>
    <ul class="list__container">
         <?php 
    
    $placesWidget = new WP_Query(array(
        'posts_per_page' => 6,
        'post_type' => 'places',
        'orderyby' => 'meta_value_num',
        'order' => 'ASC',
    )); 
    while ($placesWidget->have_posts()) {
        $placesWidget->the_post(); ?>
        <li class="list__container--item">
                <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail(); ?> 
                </a>
                <h3 class="list__containter--item__title>
                    <a href="<?php the_permalink(); ?>">
                    <?php the_title(); ?>
                    </a>
                </h3>
        </li>
        
        
    <?php } ?>

    </ul>
</section>