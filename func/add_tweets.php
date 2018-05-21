<?php
    header("Content-type:application/json");
    include('vars.php');
    $text = $_POST['text'];
    $tastes = $_POST['tastes'];
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];

    if(!isAuth()){
        http_response_code(403);
        die('{"status":"not_authorized","status_code":403}');
    }
    $data = array(
        'uid'=>UID,
        'hash'=>HASH,
        'text'=>$text,
        'lat'=>$lat,
        'lon'=>$lng
    );
    echo curl_download(NEW_TWEET,$data);
?>
