<?php
    function curl_download($Url, $data=""){

        if (!function_exists('curl_init')){
            die('Sorry cURL is not installed!');
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $Url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        // curl_setopt($ch, CURLOPT_VERBOSE, true);
        // curl_setopt($ch, CURLOPT_STDERR, fopen('php://stderr', 'w'));
        if($data!=""){
            $data_string = json_encode($data);
            curl_setopt($ch,CURLOPT_POSTFIELDS, $data_string);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: '.strlen($data_string)
            ));
        }
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    };

    function isAuth(){
      $auth = true;
      define('IS_AJAX', isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
      if(!IS_AJAX)
        return false;
      return true;
    };
?>
