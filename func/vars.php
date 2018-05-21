<?php
    include('functions.php');
    define('API_URL','http://localhost:1456/websites');
    // define('API_URL','http://app.poletalks.com/websites');
    define('TWEETS', API_URL.'/sparks');
    define('NEW_TWEET', API_URL.'/sparks/add');
    define('INVITE', API_URL.'/register');
    define('POLLS', API_URL.'/polls');
    define('INSIGHTS', API_URL.'/polls/insights');

    define('UID','57b0c9c0be80c8f33895d34f');
    define('HASH','cf71f90a0fb482f7ea2f5295a26347abbc9d6a97');
?>
