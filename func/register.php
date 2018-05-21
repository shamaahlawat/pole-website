<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Content-type:application/json");
    include('vars.php');
    $type = $_POST['type'];
    $email = $_POST['email'];
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];

    if(!isAuth()){
        http_response_code(403);
        die('{"status":"not_authorized","satus_code":403}');
    }
    $data = array(
        'uid'=>UID,
        'hash'=>HASH,
        'type'=>$type,
        'email'=>$email,
        'lat'=>$lat,
        'lon'=>$lng,
    );
    echo curl_download(INVITE,$data);
?>
