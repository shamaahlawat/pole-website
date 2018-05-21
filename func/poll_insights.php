<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Content-type:application/json");
    include('vars.php');
    $poll_id = (string)$_POST['poll_id'];

    if(!isAuth()){
        http_response_code(403);
        die('{"status":"not_authorized","satus_code":403}');
    }

    $data = array(
        'poll_id'=>$poll_id
    );

    echo curl_download(INSIGHTS,$data);
?>
