<?php
  header("Content-type:application/json");
  include('vars.php');
  $lat = $_GET['lat'];
  $lng = $_GET['lng'];
  $radius = 5000;
  $url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".$lat.",".$lng."&radius=".$radius."&sensor=false&key=AIzaSyABm_gqFXlllgpHmO0VLyUyGgbv2oNB5Sk";//&rankby=distance&types=airport|amusement_park|aquarium|art_gallery|bakery|bank|bar|beauty_salon|bicycle_store|book_store|bowling_alley|bus_station|cafe|campground|casino|church|clothing_store|convenience_store|dentist|department_store|doctor|electrician|embassy|finance|fire_station|florist|food|furniture_store|gas_station|grocery_or_supermarket|gym|hair_care|health|hindu_temple|hospital|insurance_agency|jewelry_store|lawyer|library|lodging|meal_delivery|meal_takeaway|mosque|movie_rental|movie_theater|museum|night_club|park|parking|pet_store|pharmacy|physiotherapist|place_of_worship|police|post_office|real_estate_agency|restaurant|roofing_contractor|rv_park|school|shoe_store|shopping_mall|spa|stadium||subway_station|synagogue|taxi_stand|train_station|university|veterinary_care|zoo";
echo curl_download($url);
?>