<?php
    header("Content-type:application/json");
    include('vars.php');
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $radius = $_POST['radius'];

    $data = array(
        'uid'=>UID,
        'hash'=>HASH,
        'lat'=>$lat,
        'lon'=>$lng,
        'radius'=>$radius
    );
    $url = TWEETS;
    echo curl_download($url, $data);
?>
