<?php
error_reporting(0);
header("Content-Type: application/json;");
require('../../../../wp-load.php');
echo get_option('live2d_customkoto');
?>