<?php
$data_unitone_layout = array(
	'responsive-grid',
);
if ( ! empty( $attributes['unitone']['gap'] ) ) {
	$data_unitone_layout[] = '-gap:' . $attributes['unitone']['gap'];
}

$style = array();
if ( ! empty( $attributes['columnMinWidth'] ) ) {
	$style[] = '--unitone--column-min-width: ' . $attributes['columnMinWidth'];
}
?>
<div
	data-unitone-layout="<?php echo esc_attr( implode( ' ', $data_unitone_layout ) ); ?>"
	style="<?php echo esc_attr( implode( ' ', $style ) ); ?>"
>
	<?php while ( $wp_query->have_posts() ) : ?>
		<?php $wp_query->the_post(); ?>
		<div data-unitone-layout="decorator -shadow -padding:1" class="has-background has-white-background-color has-text-color has-unitone-text-black-color">
			<div data-unitone-layout="decorator__inner">
				<div>
					<div data-unitone-layout="stack -gap:-1">
						<p><strong><?php the_title(); ?></strong></p>

						<?php if ( ! empty( get_post()->post_excerpt ) ) : ?>
							<p class="has-unitone-xs-font-size"><?php echo wp_kses_post( get_post()->post_excerpt ); ?></p>
						<?php endif; ?>
					</div>
				</div>
				<a data-unitone-layout="decorator__link" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Learn more', 'unitone' ); ?></a>
			</div>
		</div>
	<?php endwhile; ?>
	<?php wp_reset_postdata(); ?>
</div>
