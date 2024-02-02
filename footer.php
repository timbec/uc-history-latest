<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package uc-history-2022
 */

?>

	<footer id="colophon" class="site-footer">
		<div class="site-footer__content">
			<ul class="site-footer__social-media">
			<h3 class="site-footer__social-media--title">Uranium City and Area Facebook Groups:</h3>
			<li>
				<a href="">Uranium City Friends</a>
			</li>
			<li>
				<a href="">Gunnar Mines Rediscovered</a>
			</li>
			<li>
				<a href="">Port Radium</a>
			</li>
		</ul><!-- .site-info -->
		</div>
		<p class="site-footer__copyright">
			&copy; <?php echo date("Y"); ?> Tim Beckett
		</p>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
