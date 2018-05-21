<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Content-type:application/json");
    include('vars.php');
    $last_value = $_POST['last_value'];
    $location = [$_POST['lng'], $_POST['lat']];

    if(!isAuth()){
        http_response_code(403);
        die('{"status":"not_authorized","satus_code":403}');
    }

    $data = array(
        'uid'=>UID,
        'hash'=>HASH,
        'last_value'=>$last_value,
        'location'=>$location
    );
    echo curl_download(POLLS,$data);
?>
