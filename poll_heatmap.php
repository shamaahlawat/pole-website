<?php
    include('func/vars.php');
    $poll_id = (string)$_GET['poll_id'];

    $data = array(
        'poll_id'=>$poll_id
    );

    $poll_insights = curl_download(INSIGHTS,$data);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Poll HeatMap</title>
    <link rel="shortcut icon" href="img/fav.png" />
    <meta charset="UTF-8" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/map-style.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCchfj2QcIk4ScKAGVeVe6aWR5MJzLgRHI&libraries=visualization"></script>
    <style>
        #map {
            min-height: 100%;
            min-width: 100%;
        }
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
        #optionSelect {
            position: absolute;
            top: 5%;
            right: 5%;
            z-index: 5;
            font-size: 15px;
            padding: 5px 10px;
            border: 1px solid #999;
            text-align: center;
        }
        #optionSelect:focus {
            outline: none;
        }

        #map .gmnoprint, #map .gmnoprint.gm-style-cc {
            display: none;
        }
    </style>
    <script>
        var map, heatmap, poll_insights, poll, insights, map_options;

        poll_insights = <?php echo $poll_insights ?>;
        poll = poll_insights.poll;
        insights = poll_insights.insights;

        $(document).ready(function() {
            map_options = {
                center: {lat: poll.location[1], lng: poll.location[0]},
                zoom: 4,
                disableDefaultUI: true
            };

            function getHeatMapLocations(insights, option_no){
                var result = insights.reduce(function(map_array, obj) {
                    map_array[obj._id] = obj.user_locations;
                    return map_array;
                }, {});

                var user_locations = [];
                if(result[option_no] != null) {
                    result[option_no].forEach(function(loc){
                        user_locations.push(new google.maps.LatLng(loc.latitude, loc.longitude));
                    });
                };
                return user_locations;
            };

            var styledMap = new google.maps.StyledMapType(app_dark_style,{name: "Styled Map"});
            map = new google.maps.Map(document.getElementById('map'), map_options);
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');

            heatmapMvcObject = new google.maps.MVCArray( getHeatMapLocations(insights, 0));
            heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapMvcObject
            });
            heatmap.set('radius', 15);
            // var gradient = [
            //     'rgba(0, 255, 255, 0)',
            //     'rgba(0, 255, 255, 1)',
            //     'rgba(0, 191, 255, 1)',
            //     'rgba(0, 127, 255, 1)',
            //     'rgba(0, 63, 255, 1)',
            //     'rgba(0, 0, 255, 1)',
            //     'rgba(0, 0, 223, 1)',
            //     'rgba(0, 0, 191, 1)',
            //     'rgba(0, 0, 159, 1)',
            //     'rgba(0, 0, 127, 1)',
            //     'rgba(63, 0, 91, 1)',
            //     'rgba(127, 0, 63, 1)',
            //     'rgba(191, 0, 31, 1)',
            //     'rgba(255, 0, 0, 1)'
            // ]
            // heatmap.set('gradient', gradient);
            heatmap.setMap(map);

            //create select option dropdown
            var select = $("#optionSelect");
            poll.poll_details.forEach(function(option){
                $("<option />", {value: option.option_id , text: option.content}).appendTo(select);
            });

            $(select).on('change', function() {
                var option_no = parseInt(this.value);
                heatmapMvcObject.clear();
                heatmapMvcObject = new google.maps.MVCArray( getHeatMapLocations(insights, option_no));
                var heatmap = new google.maps.visualization.HeatmapLayer({
                    data: heatmapMvcObject
                });
                heatmap.setMap(map);
            });
        });
    </script>
</head>
<body>
    <div id="floating-panel">
      <select id="optionSelect" name="pollOption"></select>
    </div>
    <div id="map"></div>
</body>
</html>
