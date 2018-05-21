<?php include('func/detect_mobile.php'); ?>
<!DOCTYPE html>
<html>
<head>
    <?php include('_head.php'); ?>
    <meta name="google-site-verification" content="BDvbOhynUbTQnFAmiDdynhyddL2suyJLcqvlGF-BjBo" />
</head>
<body>
    <div itemscope itemtype="http://schema.org/MobileApplication" class="richdata">
        <span itemprop="name">Poletalks</span> -
        For <span itemprop="operatingSystem">Android</span>
        <span itemprop="availableOnDevice">Android</span>
        Size: <span itemprop="fileSize">5.0MB</span>
        Version: <span itemprop="softwareVersion">1.2.2</span>
        <span itemprop="applicationCategory">Social</span>
        RATING:
        <div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
          <span itemprop="ratingValue">5.0</span> (
          <span itemprop="ratingCount">16</span> ratings )
        </div>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
          Price: <span itemprop="price">0</span>
          <meta itemprop="priceCurrency" content="INR" />
        </div>
        <span itemprop="installUrl">https://play.google.com/store/apps/details?id=com.pole1.demo</span>
        <span itemprop="screenshot">https://lh3.googleusercontent.com/-Ld5o4A4aWw7SMHx1rFQafpokN8nGrWNn-YyByyQncNtPSfrY5OyfhuiUuvYVCSdWHg=h900-rw</span>
    </div>

    <div class="preloader">
        <div class="content">
          <img src="img/logo.png"><br/>
          <img class="text" src="img/preloader-text.png">
          <img src="img/preloader.gif">
        </div>
    </div>

    <div class="header">
        <div class="logo">
          <img src="img/logo.png">
        </div>
        <div class="social animated">
          <a href="https://www.facebook.com/poletalks/" target="_blank"><i class="fa fa-facebook"></i></a>
          <a href="https://www.twitter.com/poletalks/" target="_blank"><i class="fa fa-twitter"></i></a>
        </div>
        <div class="map-stuff">
            <div class="status-container">
                <div class="popup-spark">
                    <span class="animated fadeOutUp">You just created a spark!</span>
                </div>
                <span class="map-marker-drop" style="display:none;">
                    <div class="map-marker-inner"></div>
                </span>
                <textarea type="text" class="status" maxlength='160' placeholder="What does your location speak?"></textarea>
                <span class="status-length">160</span>
                <span class="start-spark"><i class="fa fa-send"></i></span>
                <div class="tags-list">
                    <ul class="tags" title="Click to pulse">
                        <li>#Chatter</li>
                        <li>#Food | Drinks</li>
                        <li>#Entertainment</li>
                        <li>#Activities</li>
                        <li>#Discussions</li>
                        <li>#Winks</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="sec3-stuff">
            <div class="popup-validation">
                <span class="animated fadeOutUp">Please enter a valid email id.</span>
            </div>
        </div>
    </div>

    <!--- fullpage start -->
    <div id="fullpage">

        <!--- section Outer start -->
        <div class="section outer">
            <div class="single-video">
                <div class="bg-section"></div>
                <img src="img/bg.png">
            </div>

            <div class="videos-array">
                <div class="video-close animated"><i class="fa fa-times"></i></div>

                <div class="video-one video-p">
                    <div class="video-wrapper">
                        <img src="videos/p/video.jpg" class="letters-img">
                    </div>
                    <div class="video-info animated">
                        <div class="video-heading">People</div>
                        <div class="video-desc">The "Who" of the interaction. Anyone who has the power of expression - the life around us. The usual office guy, the college gang, the kid at home, the dog on the street or the flying birds.<br/>Lets hear them all</div>
                    </div>
                </div>

                <div class="video-one video-o">
                    <div class="video-wrapper">
                        <img src="videos/o/video.jpg" class="letters-img">
                    </div>
                    <div class="video-info animated">
                        <div class="video-heading">Object</div>
                        <div class="video-desc">The "What" of the interaction. Random Thoughts, Important Information, News, Spicy Gossip, Sweet Secrets, Usual Chatter, Many Moods.<br/>Lets engage them all</div>
                    </div>
                </div>

                <div class="video-one video-l">
                    <div class="video-wrapper">
                        <img src="videos/l/video.jpg" class="letters-img">
                    </div>
                    <div class="video-info animated">
                        <div class="video-heading">Location</div>
                        <div class="video-desc">The "Where" of the interaction. Office Buildings, Housing Societies, Busy Shops, Happening Pubs, Simple Cafes, College Campuses, Buzzing Streets, Tourist Destinations.<br/>Lets live them all</div>
                    </div>
                </div>

                <div class="video-one video-e">
                    <div class="video-wrapper">
                        <img src="videos/e/video.jpg" class="letters-img">
                    </div>
                    <div class="video-info animated">
                        <div class="video-heading">Event</div>
                        <div class="video-desc">The "Why" of the interaction. Visiting, Meeting, Discussing, Enjoying, Talking, Thinking, Eating, Playing, Wishing.<br/>Lets witness them all</div>
                    </div>
                </div>
            </div>

            <div class="letters">
                <div class="letters-wrapper animated">
                    <div class="letter-big hiddden letter-p animated zoomOut"><div>P</div></div>
                    <div class="letter-big hiddden letter-o animated zoomOut"><div>O</div></div>
                    <div class="letter-big hiddden letter-l animated zoomOut"><div>L</div></div>
                    <div class="letter-big hiddden letter-e animated zoomOut"><div>E</div></div>
                    <div class="desc hiddden animated zoomOut">Bringing Locations To Life</div>
                </div>
            </div>

            <div class="go-next hidden">
                <span class="go-arrow canimated cfadeOutDown cinfinite"><i class="fa fa-chevron-down"></i></span>
            </div>
        </div>
        <!--- section Outer end -->

        <!---  section-map start -->
        <div class="section section-map">
            <div class="mobile iphone">
                <img src="img/nexus5-2.png" width="100%">
                <div class="mobile-inner" id="mobile-inner">
                    <div style="width:100%; height:120%;top:-10%; overflow:hidden; position:absolute" id="map-inner">
                        <!-- <div class="map-upper drag"></div> -->
                    </div>
                </div>
            </div>

            <div class="map" id="map">
                <!-- <div class="map-inner drag"></div> -->
            </div>

            <div class="drag-the-map">
                <div class="map-img">
                    <div class="_hand"></div>
                    <div class="_arrow_left"></div>
                    <div class="_arrow_right"></div>
                    <div class="_arrow_top"></div>
                    <div class="_arrow_bottom"></div>
                </div>
                <div class="drag-desc">Drag Map</div>
            </div>

            <div class="go-next hidden">
                <span class="interesting-text">Interesting concept? Get the app here</span><br/>
                <span class="go-arrow hidden canimated cfadeOutDown cinfinite"><i class="fa fa-chevron-down"></i></span>
            </div>
        </div>
        <!-- section-map end  -->

        <!-- Invitation start-->
        <div class="section invitation">
            <div class="bg"></div>
            <div class="sections-heading animated fadeOutDown">What does your location speak?</div>
            <div class="sections-subheading animated fadeOutDown">Be the first to decide. Become an ambassador</div>
            <div class="subscribe animated fadeOutDown">
                <!-- <input type="text" class="email" placeholder="Your email address" data-stage="1"/>
                <button class="submit"><i class="fa fa-sign-in"></i></button><br/>
                <button onclick="auth()" class="get-contacts">Feeling lazy, get contacts from Google</button> -->
                <button class="applyNowBtn"><a href="pole_awesomeness_program.php" target="_blank"/>Apply Now</a></button>
            </div>

            <div class="go-next hidden">
                <span class="go-arrow canimated cfadeOutDown cinfinite"><i class="fa fa-chevron-down"></i></span>
            </div>
        </div>
        <!-- Invitation end-->

        <!-- poll start -->
        <div class="section poll">
            <div class="bg"></div>
            <div class="sectionContent">
                <div class="sliderContainer">
                    <div id="pollSlider">
                        <div class="pollItemContainer pollEmptyContainer">
                            <div class="pollItem">
                                <div class="pollEmptyContainer">
                                    <div class="content">
                                      <img src="img/preloader.gif">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="pollItemContainer pollEmptyContainer">
                            <div class="pollItem">
                                <div class="pollEmptyContainer">
                                    <div class="content">
                                      <img src="img/preloader.gif">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="pollItemContainer pollEmptyContainer">
                            <div class="pollItem">
                                <div class="pollEmptyContainer">
                                    <div class="content">
                                      <img src="img/preloader.gif">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pollFooter">
                    <div class="title">Have a question in mind? We'll ask it on Poletalks.</div>
                    <div class="btnContainer">
                        <button class="applyNowBtn">
                            <a  href="https://docs.google.com/forms/d/e/1FAIpQLScTG-RBTeFjxUvyISfHhMTnCFLe19vtR39xNDj0lmDa8RZnQQ/viewform?c=0&w=1" target="_blank"/>Submit a Poll</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Poll end -->

        <!-- share start -->
        <div class="section share">
            <div class="bg"></div>
            <div class="large-mesh" id="large-mesh"><canvas id="mesh-canvas"></canvas></div>
            <div class="sections-heading animated fadeOutDown">Spread the Word</div>
            <div class="sections-subheading animated fadeOutDown"><img src="img/share.png" width="400px"></div>
            <div class="share-buttons">
                <a href="https://www.facebook.com/poletalks/" target="_blank"><div class="share-button facebook"><i class="fa fa-facebook"></i></div></a>
                <a href="https://www.twitter.com/poletalks/" target="_blank"><div class="share-button twitter"><i class="fa fa-twitter"></i></div></a>
                <a href="https://www.instagram.com/poletalks/" target="_blank"><div class="share-button instagram"><i class="fa fa-instagram"></i></div></a>
            </div>
        </div>
        <!-- share end -->

    </div>
    <!--- fullpage end -->

    <div class="footer animated fadeDownOut">
        <div class="footer-left">
            <a href="https://play.google.com/store/apps/details?id=com.pole1.demo" target="_blank"><img class="playstore-img" src="img/googleplay.png" alt="GET IT ON Google Play"></a>
            <a href="https://itunes.apple.com/dm/app/poletalks/id1173321333?mt=8" target="_blank"><img class="playstore-img" src="img/app_store.png" alt="GET IT ON APP STORE"></a>
        </div>
        <div class="footer-right">
            <ul class="footer-links">
                <li><a href="https://blog.poletalks.com" target="_blank">Blog</a></li>
                <li><a href="http://poletalks.com/blog/terms-and-conditions/" target="_blank">Terms</a></li>
                <li><a href="http://poletalks.com/blog/privacy-policy/" target="_blank">Privacy</a></li>
            </ul>
        </div>
    </div>

    <div class="pollItemContainer" id="pollItemContainer" style="display: none;">
        <div class="pollItem">
            <div class="pollContainer">
                <div class="pollContent"></div>
                <div class="pollOptionChartContainer">
                    <div class="pollChart">
                        <canvas class="myChart" width="300" height="300"></canvas>
                    </div>
                    <div class="btnContainer">
                        <button class="applyNowBtn">HeatMap</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="pollEmptyContainer" class="pollItemContainer pollEmptyContainer" style="display: none;">
        <div class="pollItem">
            <div class="pollEmptyContainer">
                <div class="content">
                  <img src="img/preloader.gif">
                </div>
            </div>
        </div>
    </div>

    <div id="heatmapNode" class="heatmapNode" style="display: none;">
        <div class="heatmapContainer">
            <div class="content">
                <img src="img/preloader.gif">
            </div>
            <div class="map" id="heatmap"></div>
        </div>
    </div>

    <div id="popUpModal" class="pop-up-box modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="model-close-btn">&times;</span>
            <p id="pollTitle">The poll title will be displayed here...</p>
            <div id="heatmapContainerDiv"></div>
        </div>
    </div>

    <script type="text/javascript" src="js/mesh.js"></script>
    <!-- <script async type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCchfj2QcIk4ScKAGVeVe6aWR5MJzLgRHI&callback=initMap"></script> -->
    <?php if(getenv('ENV')!='dev'){ ?>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-75160033-1', 'auto');
            ga('send', 'pageview');
        </script>
    <?php } ?>
</body>
</html>
