<?php
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  require('googlePlaces.php');
  $proxy = [];
  $proxy["host"] = "192.162.0.103";
  $proxy["port"] = 3128;
  $proxy["username"] = "your username"; //optional with password
  $proxy["password"] = "your password";
  $apiKey       = 'AIzaSyABm_gqFXlllgpHmO0VLyUyGgbv2oNB5Sk';
  $googlePlaces = new Mills\GooglePlaces\googlePlaces($apiKey);

  // Set the longitude and the latitude of the location you want to search near for places
  $latitude  = $_GET['lat'];
  $longitude = $_GET['lng'];
  $googlePlaces->setLocation($latitude . ',' . $longitude);

  $googlePlaces->setRadius(5000);
  $results = $googlePlaces->search(); //
  var_dump($results);
?>