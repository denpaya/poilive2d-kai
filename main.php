<?php
    defined('ABSPATH') or exit;
    add_action('wp_enqueue_scripts', 'live2d_scripts');
    function live2d_scripts()
    {
        if (!wp_is_mobile()) {
            wp_enqueue_style('live2d-base', LIVE2D_URL . '/live2d/css/live2d.css', array(), LIVE2D_VERSION, 'all');
            wp_enqueue_script('live2d-jquery', LIVE2D_URL . '/live2d/js/jquery.min.js', array('jquery'), LIVE2D_VERSION, true);
            wp_enqueue_script('live2d-message', LIVE2D_URL . '/live2d/js/message.js', array('live2d-jquery'), LIVE2D_VERSION, true);
			wp_enqueue_script('live2d-base', LIVE2D_URL . '/live2d/js/live2d.js', array('live2d-jquery'), LIVE2D_VERSION, true);
			wp_enqueue_script('live2d-run', LIVE2D_URL . '/live2d/js/run_live2d.js', array('live2d-jquery'), LIVE2D_VERSION, true);
        }
    }

    add_action('wp_head', 'live2d_head');
    function live2d_head()
    {
        if (!wp_is_mobile()) {
            if (get_option('live2d_nohitokoto') == "checked") {
                $nohitokoto = "var nohitokoto = true;";
            } else {
                $nohitokoto = "var nohitokoto = false;";
            }
            if (get_option('live2d_nospecialtip') == "checked") {
                $nospecialtip = "var nospecialtip = true;";
            } else {
                $nospecialtip = "var nospecialtip = false;";
            }
			if (get_option('live2d_nocatalog') == "checked") {
				$nocatalog = "var nocatalog = true;";
			} else {
				$nocatalog = "var nocatalog = false;";
			}
            if (get_option('live2d_localkoto') == "checked") {
                $localkoto = "var localkoto = true;";
            } else {
                $localkoto = "var localkoto = false;";
            }
			echo '<script type="text/javascript">var live2d_Path = "' . LIVE2D_URL . '/live2d/model/夕立/";var message_Path = "' . LIVE2D_URL . '/live2d/";var home_Path = "' . home_url() . '/";'.$nohitokoto.$nospecialtip.$nocatalog.$localkoto.'</script>';
            if (!get_option('live2d_maincolor')) {
                $maincolor = "206,0,255";
            } else {
                $maincolor = hex2rgb(get_option('live2d_maincolor'));
            }
            echo "<style>.message{border-color:rgba($maincolor,.4);background-color:rgba($maincolor,.2);box-shadow:0 3px 15px 2px rgba($maincolor,.4);color:rgba($maincolor,.6);}.l2d-action,.show-button{border-color:rgba($maincolor,.4);background:rgba($maincolor,.2);box-shadow:0 3px 15px 2px rgba($maincolor,.4);color:rgba($maincolor,.6);}.l2d-action:hover,.show-button:hover{border-color:rgba($maincolor,.6);background:rgba($maincolor,.4);color:rgba($maincolor,.8);}</style>";
        }
    }

    add_action('wp_footer', 'live2d_footer');
    function live2d_footer()
    {
        if (!wp_is_mobile()) {
            ?>
            <div id="landlord">
                <div class="message" style="opacity:0"></div>
                <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
            </div>
        <?php
        }
    }

    function hex2rgb($hexColor)
    {
        $color = str_replace('#', '', $hexColor);
        if (strlen($color) > 3) {
            $rgb = (string)(hexdec(substr($color, 0, 2))).','.(string)(hexdec(substr($color, 2, 2))).','.(string)(hexdec(substr($color, 4, 2)));
        } else {
            $color = $hexColor;
            $r = substr($color, 0, 1) . substr($color, 0, 1);
            $g = substr($color, 1, 1) . substr($color, 1, 1);
            $b = substr($color, 2, 1) . substr($color, 2, 1);
            $rgb = (string)hexdec($r).','.(string)hexdec($g).','.(string)hexdec($b);
        }
        return $rgb;
    }
?>