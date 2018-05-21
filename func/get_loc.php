<?php
header("Content-type:application/json");
include('vars.php');
function getClientIP() {
  if (isset($_SERVER)) {
    if (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
      return $_SERVER["HTTP_X_FORWARDED_FOR"];
    if (isset($_SERVER["HTTP_CLIENT_IP"]))
      return $_SERVER["HTTP_CLIENT_IP"];
    return $_SERVER["REMOTE_ADDR"];
  }
  if (getenv('HTTP_X_FORWARDED_FOR'))
    return getenv('HTTP_X_FORWARDED_FOR');
  if (getenv('HTTP_CLIENT_IP'))
    return getenv('HTTP_CLIENT_IP');
  return getenv('REMOTE_ADDR');
}
function getIP(){
  $ip = getClientIP();
  if($ip == "127.0.0.1" || substr($ip,0,7) == "192.168"){
    $public_ip = curl_download("http://checkip.dyndns.org/");
    preg_match("/([\d|.]+)/", $public_ip, $output_array);
    $ip = $output_array[0];
  }
  return $ip;
}
$ip = getIP();
$api = "36ce9a214fe847d4ca8b9b8afe88909f0bbe6dd21ba6ee091aefedd3761dcee4";
$url = "http://ip-api.com/json/".$ip;
echo curl_download($url);
?>
