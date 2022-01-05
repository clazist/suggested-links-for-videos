<?php
    defined( 'ABSPATH' ) or die;
?>
<style>
    <?php

        function get_mod($mod)
        {
            return get_theme_mod($mod);
        }
    ?>
<?php if(get_mod('suggested_links_for_videos_background')):?>
.suggestion-item,.suggestion-click-active{
    background-color: <?php echo get_mod('suggested_links_for_videos_background')?>;
}
<?php endif;?>
<?php if(get_mod('suggested_links_for_videos_shadow')):?>
.suggestion-click-active{
    box-shadow: 0 0 10px 3px <?php echo get_mod('suggested_links_for_videos_shadow')?>;
}
<?php endif;?>
<?php if(get_mod('suggested_links_for_videos_color')):?>
.suggestion-item a{
    color: <?php echo get_mod('suggested_links_for_videos_color')?>;
}
<?php endif;?>
<?php if(get_mod('suggested_links_for_videos_font_size')):?>
.suggestion-item a{
    font-size: <?php echo get_mod('suggested_links_for_videos_font_size')?>px;
}
<?php endif;?>
</style>