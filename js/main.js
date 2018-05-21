var api = {
    tweets: "func/tweets.php",
    tweets_nogeo: "func/tweets_nogeo.php",
    new_tweet: "func/add_tweets.php",
    invite: "func/register.php",
    polls: "func/polls.php",
    insights: "func/poll_insights.php"
}
var start_time = Date.now();
var map,map_inner, initialLocation, initialPosition = {}, loadMore = false, totalPolls = [], heatmapMvcObject;

$(document).ready(function(){
    //$('video').remove();
    /*================================
    =            FullPage            =
    ================================*/
    $('#fullpage').fullpage({
        //Navigation
        menu: '#nav-menu',
        lockAnchors: false,
        anchors:['home', 'location', 'ambassador', 'poll', 'share'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Home', 'Location', 'Ambassador', 'Poll', 'Share'],
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: false,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: false,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: false,
        continuousVertical: false,
        normalScrollElements: '#header, .element2',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize : true,
        sectionsColor: ['#f2f2f2', '#000', '#7BAABE', '#6e7475', '#00AEBD'],
        paddingTop: '0',
        paddingBottom: '0',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){
            /*===================================================
            =            Pause Videos if slide not first        =
            ===================================================*/
            if(nextIndex!=1) {//hide for first slide
                $('video').each(function(){
                    this.pause();
                })
            } else {
                $('video').each(function(){
                    this.play();
                })
            }
            /*===================================================
            =            Header slide down on scroll            =
            ===================================================*/
            if(nextIndex==1) {//hide for first slide
                $('.header').css({'top':'-100px'})
            } else {
                $('.header').css({'top':'0px'})
            }

            /*=====================================================
            =            SLide down create spark input            =
            =====================================================*/
            if(nextIndex == 2){//if next slide is 2nd slide i.e. map
                $('.map-stuff').css({'top':'0','transition-delay':'0.3s'});
            } else{
                $('.map-stuff').css({'top':'-100px','transition-delay':'0'});
            }

            /*=====================================================
            =            SLide down create invitation  / share          =
            =====================================================*/

            //Create fadein fade out effect on section headings
            var animatedin = 'fadeInUp';
            var animatedout = 'fadeOutDown';
            if(index==3 || index == 4 || index == 5) {
                $('.sections-heading').addClass(animatedout).removeClass(animatedin);
                $('.sections-subheading').addClass(animatedout).removeClass(animatedin);
                $('.subscribe').addClass(animatedout).removeClass(animatedin);
            }
            if(nextIndex==3 || nextIndex == 4 || nextIndex == 5) {
                var delayed = 300;

                setTimeout(function(){
                    $('.section').eq(nextIndex-1).find('.sections-heading').removeClass(animatedout).addClass(animatedin);
                    setTimeout(function(){$('.section').eq(nextIndex-1).find('.sections-subheading').removeClass(animatedout).addClass(animatedin);},200);
                    setTimeout(function(){$('.section').eq(nextIndex-1).find('.subscribe').removeClass(animatedout).addClass(animatedin);},300);
                },delayed);

                setTimeout(function(){
                  $('.footer').css({bottom:0}).addClass(animatedin).removeClass(animatedout);
                },delayed);

            } else {
                $('.footer').css({bottom:-60}).addClass(animatedout).removeClass(animatedin);
            }

            if(nextIndex == 4) {
                $('.footer-left').css({display:"none"});
            } else {
                if(nextIndex > 4){
                    $('.footer-left').css({display:"block"});
                }
            }

            if(nextIndex == 5) {
                $('#fp-nav ul li a span, #fp-nav ul li .fp-tooltip').addClass('dark');
                $('.social').addClass('fadeOutUp').removeClass('fadeInDown');
            } else {
                $('#fp-nav ul li a span, #fp-nav ul li .fp-tooltip').removeClass('dark');
                $('.social').addClass('fadeInDown').removeClass('fadeOutUp');;
            }
        }, //onleave function End

        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    }); //$('#fullpage').fullpage()

    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);

    $('.go-next').on('click',function(){
        $.fn.fullpage.moveSectionDown();
    });

    /*=========================================
    =            Video Interaction            =
    =========================================*/
    $('.video-one, .letter-big').on('click',function() {
        var $this = $(this);
        var index = $('.video-one').index($this);
        if(index==-1)
          index = $('.letter-big').index($this);
        $this = $('.video-one').eq(index);
        $this.css({'width':'100%','left':'0','z-index':'105'});
        $this.find('.video-info').removeClass('fadeOutLeft').addClass('fadeInRight');
        //hide down arrow
        $('.outer .go-next').addClass('hidden');
        $('.letters').css({'z-index':'-1'});
        $('.video-close').attr('data-video',index).css({'opacity':'1'});
        $('.video-close').addClass('fadeInRight').removeClass('fadeOutRight');
        $('.letters .letters-wrapper').addClass('fadeOutUp').removeClass('fadeInDown');
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) $('.video-close').trigger('click');   // esc
    });

    $('.video-close').on('click',function(){
    var index = $(this).attr('data-video');
        var pos = index*25;
        //show down arrow
        $('.go-next').removeClass('hidden');
        $('.video-one').css({'z-index':'100'});
        $('.video-one').eq(index).css({'left':pos+'%','width':'25%'});
        $('.video-one').eq(index).find('.video-info').removeClass('fadeInRight').addClass('fadeOutLeft');
        $('.letters').css({'z-index':'110'});
        $('.letters .letters-wrapper').removeClass('fadeOutUp').addClass('fadeInDown');
        $('.video-close').removeClass('fadeInRight').addClass('fadeOutRight');
    });


    /*=======================================================
    =            Letter-Big interaction for POLE            =
    =======================================================*/
    $('.letter-big').on('mouseover',function(){
        var index = $('.letter-big').index(this);
        var letter_full = ['People','Object','Location','Event'];
        var desc = $('.desc');
        desc.addClass('animated fadeOutUp');
        setTimeout(function(){
          desc.html(letter_full[index]);
          desc.removeClass('fadeOutUp zoomIn').addClass('fadeInUp');
        },500);
    });

    $('.letter-big').on('mouseout',function(){
        var desc = $('.desc');
        desc.removeClass('fadeInUp').addClass('fadeOutUp');
        setTimeout(function(){
          desc.html('Bringing Locations To Life');
          desc.removeClass('fadeOutUp zoomIn').addClass('fadeInUp');
        },500);
    });
    /*=====  End of Letter-big interaction  ======*/

    /*========================================
    =           Create Spark Map            =
    ========================================*/
    function autoheight(a) {
        if (!$(a).prop('scrollTop')) {
            do {
                var b = $(a).prop('scrollHeight');
                var h = $(a).height();
                $(a).height(h - 31);
                i++
            }
            while (b && (b != $(a).prop('scrollHeight')));
        };
        var i = 0;
        $(a).height($(a).prop('scrollHeight') - 31);
        int = setInterval(function(){
          $(a).height($(a).prop('scrollHeight') - 31);
          $('.start-spark').height($('.status').height()*0.2 + 25).css({'padding-top':$('.status').height()*0.4, 'padding-bottom':$('.status').height()*0.4})
          if(i++>=10) clearInterval(int);
      }, 200);
    };

    $('.status').keydown(function (e){
        if(e.keyCode == 13){
          $('.start-spark').trigger('click');
        }
    });

    $('.status').keyup(function(event) {
        //$('.status').css('height',$('.status').prop('scrollHeight'))
        autoheight($(this));
        var count = $(this).val().length
        if(count>=160){
          //e.preventDefault();
        }
        $('.status-length').html(160-count);
    });

    var first_spark = true;
    $('.start-spark').on('click',function(){
        $this = $(this);
        if($('.status').val()=='') {
            return false;
        }
        var dispersion = 1000;
        var rand = {};
        if(first_spark == false){
            rand.lat = Math.random()*dispersion/65000;
            rand.lng = Math.random()*dispersion/65000;
        } else{
            rand.lat = 0;
            rand.lng = 0;
        }
        var point = new google.maps.LatLng(initialLocation.lat() + rand.lat, initialLocation.lng() + rand.lng);
        $('.section-map').append('<div class="map-marker-inner marker-dropped"></div>');
        $('.marker-dropped').css({'left':$this.offset().left+20,'top':$this.offset().top+20, 'transform':'translate(0%)','position':'absolute','z-index':200});
        //set Map center
        map.setCenter(point);
        map_inner.setCenter(point);
        //drop marker to center of screen
        var status = $('.status').val();
            $.ajax({
            url: api.new_tweet,
            method: 'POST',
            data: {'text':status,'lat':point.lat(),'lng':point.lng()},
            success: function(data){
                $('.status').val('');
                $('.status').attr('placeholder','What does your location speak?');
                userMarker(status,point,first_spark);
                setTimeout(function(){
                    $('.section-map .go-next').removeClass('hidden');
                },3000);
                first_spark = false;
                //google analytics
                var dimensionValue = 'create_spark';
                if(typeof(ga) != "undefined")
                  ga('set', 'dimension1', dimensionValue);
            }
        });
    });//('.start-spark').on('click')

    /*==================================================
    =            Already selected #hashtags            =
    ==================================================*/
    $('.tags li').on('click',function(){
        $('.status').focus();
        $('.status').val($('.status').val()+' '+$(this).html());
        autoheight($('.status'));
        var count = $('.status').val().length;
        if(count+$(this).html().length>=160){
            $('.status').val($('.status').val().substr(0,160));
            count = $('.status').val().length;
        }
        $('.status-length').html(160-count);
    });

    /*============================================
    =            Slide 3 email submit            =
    ============================================*/

    function submitEmail($this){
        var  validate = function(email){
            var pattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}[\s,;]*)+/ig;
            var test = pattern.test(email);
            return test;
        }

        var input = $this.siblings('input');
        if(input.val() == "") return false;
        var email = "";

        if(input.attr('data-stage')==2){
            $('.invitation .go-next').removeClass('hidden');
        }

        if(input.attr('data-stage')==1){ //user registers for himself
            email = input.val();
            valid = validate(email);
            // input.attr('data-stage',2);
            // email = input.val().split(/[, ;]/);
            // input.attr('data-prev-email',email)
        }else {
            email = (input.attr('data-prev-email')+","+input.val()).split(/[, ;]/);
        }

        // var valid = true;
        // for(var i = 0; i < email.length ; i++){
        //     valid = validate(email[i]);
        // }

        if(!valid){
            $('.popup-validation span').html('Please enter a valid email address.');
            $('.popup-validation').css({'z-index':180,'opacity':1})
            $('.popup-validation .animated').css({'z-index':180}).removeClass('fadeOutUp').addClass('fadeInDown');
            setTimeout(function(){
                //Hide popup spark dialogue after 4s
                $('.popup-validation .animated').removeClass('fadeInDown').addClass('fadeOutUp');
                setTimeout(function(){
                    $('.popup-validation').css({'z-index':0,'opacity':0})
                    $('.popup-validation .animated').css({'z-index':0})
                },500);
            },4000);
            return false;
        }

        $this.addClass('process');
        $this.addClass('fa fa-spin');
        $.ajax({
            url: api.invite,
            method: 'POST',
            data: {'type': 'email', 'email': email, 'lat':initialLocation.lat(), 'lng':initialLocation.lng()},
            success: function(data){
                if(data.status == "already invited!"){
                    $('.popup-validation span').html('You are already registered!');
                    $('.popup-validation').css({'z-index':180,'opacity':1})
                    $('.popup-validation .animated').css({'z-index':180}).removeClass('fadeOutUp').addClass('fadeInDown');
                    setTimeout(function(){
                        //Hide popup spark dialogue after 4s
                        $('.popup-validation .animated').removeClass('fadeInDown').addClass('fadeOutUp');
                        setTimeout(function(){
                            $('.popup-validation').css({'z-index':0,'opacity':0})
                            $('.popup-validation .animated').css({'z-index':0})
                        },500);
                    },4000);
                }
                else {
                    $('.popup-validation span').html('Welcome to Pole. Thanks for your details!');
                    $('.popup-validation').css({'z-index':180,'opacity':1})
                    $('.popup-validation .animated').css({'z-index':180}).removeClass('fadeOutUp').addClass('fadeInDown');
                    setTimeout(function(){
                        //Hide popup spark dialogue after 4s
                        $('.popup-validation .animated').removeClass('fadeInDown').addClass('fadeOutUp');
                        setTimeout(function(){
                            $('.popup-validation').css({'z-index':0,'opacity':0})
                            $('.popup-validation .animated').css({'z-index':0})
                        },500);
                    },4000);
                }

                $this.removeClass('fa fa-spin').removeClass('process');
                $this.css({
                    'height':'x',
                    'width':'x',
                }).html('<i class="fa fa-check"></i>');
                setTimeout(function(){
                    $this.html('<i class="fa fa-sign-in"></i>');
                },500);
                input.val('');
                input.attr('placeholder','More Enthusiasts')
            },
            error: function(data){
                $this.removeClass('fa fa-spin').removeClass('process');
                $('.popup-validation span').html('Some Error Occured! Please try again!');
            }
        });
    };//submitemail

    $('.email').keydown(function (e){
        if(e.keyCode == 13){
            //submitEmail($(this).siblings('.submit'));
            $('.submit').trigger('click');
        }
    });

    $('.submit').on('click',function(){
        submitEmail($(this));
    });

});//document.ready



/*===============================
=            Cookies            =
===============================*/

//called by auth funtion
function onContacts(text) {
    var contacts = [];
    var data = text//JSON.parse(text);
    contacts.push(text.feed.id.$t);
    for (var i = 0, entry; entry = data.feed.entry[i]; i++) {
        var contact = {
            'name' : entry['title']['$t'],
            'id' : entry['id']['$t'],
            'emails' : []
        };

        if (entry['gd$email']) {
            var emails = entry['gd$email'];
            for (var j = 0, email; email = emails[j]; j++) {
                contact['emails'].push(email['address']);
            }
        }

        if (!contact['name']) {
            contact['name'] = contact['emails'][0] || "<Unknown>";
        }
        if(contact.emails.length != 0)
            contacts.push(contact.emails.join(','));
    }
    return contacts;
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
};

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
          setCookie("username", user, 365);
        }
    }
};

function fetch(token) {
    $.ajax({
        url: "https://www.google.com/m8/feeds/contacts/default/full?access_token=" + token.access_token + "&alt=json",
        dataType: "jsonp",
        success:function(data) {
            $('.email').val(onContacts(data).join(' '));
        }
    });
};

function auth() {
    $('.email').val('Waiting...');
    var config = {
        'client_id': '910529120039-kdq6at1sen2sl17rvjskmupe4ciqsioj.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/contacts.readonly'
    };
    gapi.auth.authorize(config, function() {
        fetch(gapi.auth.getToken());
    });
};



/*===============================
=        Map Funtions          =
===============================*/

//called when user submit sparks line #281
function userMarker(status,point,first){
    $('.marker-dropped').css({'transform':'translate(-50%,-50%)'}).animate({'top':'50%','left':'50%','opacity':'1','transform':'translate(-50%,-50%)'},1500,function(){
        //hide it
        $('.marker-dropped').animate({'opacity':'0'},800,function(){
            $('.marker-dropped').remove();
        });
        //create info window
        var marker = new google.maps.Marker({
            position: point,
            title:"MyPulse: "+status,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale:0
            },
            cursor:'pointer',
            zIndex:1000
        });

        var marker_inner = new google.maps.Marker({
            position: point,
            title:"MyPulse: "+status,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale:0
            },
            cursor:'pointer',
            zIndex:1000
        });

        marker_inner.setMap(map_inner);
        map.setCenter(point);
        marker.setMap(map);
        $('.priority').removeClass('priority');
        customIB(status, 35, 66, map_inner, marker, true);
        //"You just created a spark"
        $('.popup-spark').css({'z-index':180})
        $('.popup-spark .animated').css({'z-index':180}).removeClass('fadeOutUp').addClass('fadeInDown');
        setTimeout(function(){
          //Hide popup spark dialogue after 4s
          $('.popup-spark .animated').removeClass('fadeInDown').addClass('fadeOutUp');
          setTimeout(function(){
            $('.popup-spark').css({'z-index':0})
            $('.popup-spark .animated').css({'z-index':0})
          },500)
      },4000);
    });
};

//create info box ; calledby pulseMarker
function customIB(status, likes, shares, map, marker, priority){
    if (typeof(priority)==='undefined' || priority == false) priority = ""; else priority="priority usermarker";
    var myOptions = {
        content: '<div class="location-pulse '+priority+'">\
            <div class="counters"><span class="new">New</span><span class="likes"><i class="fa fa-thumbs-o-up"></i> '+likes+'</span> <i class="fa fa-commenting"></i> <span class="shares">'+shares+'</span></div>\
            <div class="content">'+status+'</div>\
            </div>',
        disableAutoPan: true,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-140, 0),
        zIndex: null,
        boxStyle: {
            opacity: 1,
            width: "120px"
        },
        closeBoxMargin: "10px 2px 2px 2px",
        closeBoxURL: "",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: false
    };

    var ib = new InfoBox(myOptions);
    ib.open(map, marker);
};

//Position pulse marker; called by setMarkers function ; to display sparks on map
pulseMarker = function(lat, lng, status, stats){
    var point = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
        position: point,
        title: "Pulse",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale:0
        },
        map: map,
        cursor: 'pointer'
    });
    customIB(status, stats.likes, stats.commentlen, map_inner, marker);
};

//called by initMap function
function setMarkers(markers){
    for(var i = 0; i < markers.length; i++){
        for(var j = i+1; j < markers.length; j++){
            var lat = (markers[i].lat - markers[j].lat)*111.1;
            var lng = (markers[i].lng - markers[j].lng)*87.87;
            var distance =  Math.sqrt(lat*lat + lng*lng);
            if(distance < 1)
                markers.splice(i,1);
        }
    }
    for(var i = 0; i < markers.length; i++){
        pulseMarker(markers[i].lat, markers[i].lng, markers[i].status, markers[i].stats);
    }
};

//called by getTweets
function getTweetsFromLoc(pos){
    var statuses = [
        "#Mood Bright Sunshine Today.Bliss",
        "#Hungry, any good food place nearby?",
        "#lonely. Anyone up for a random discussion?",
        "I decide what my location speakk Here #firstSpark",
        "The traffic gets really heavy by 7pm here",
        "All that we are, another brick in the wall #Beatles",
        "Instant reaction from people around me #Cool",
        " Can freely express my mind here",
        "Any cool place to find interesting people? #Winks",
        "This place is so relaxing. Complete Bliss",
        "I am looking forward to this event. #Activities",
        "Top 10 things that you hear arnd u #Gossip#Secret",
        "10 minutes study break lasts whole semester.#College",
        "Football session this evening. Any game?",
        "Any shop here sells good non-veg food?",
        "Bus ride home after school is amazing",
        "Joke = 99% sarcasm and 1% sarcasm #bored",
        "At office and I am late. Someone kill my boss!",
        "Beyond race, caste, age, religion, sex -This is an equalizer",
        "Highrise building has so many people yet no one. Anyone up for football?",
        "If i had a dollar for every girl that found me unattractive, they would eventually find me attractive.",
        "Anyone can help me with a PG contact nearby office?",
        "Don't you think we could come in a little later - could try and miss the peak traffic hours - lesser time wasted :P #lovetosleep",
        "Can a teacher be any more boring than repeating the same lecture twice in a week. Need a break!",
        "The manager on the SI Floor is too loud. Sir, if you a reading, you know who you are. Chill out!"
    ];
    $.ajax({
        url: api.tweets ,
        method: 'POST',
        data: {'lat':pos.latitude,'lng':pos.longitude,'radius':20000},
        success: function(data){
            var markers = [];
            if( data.sparks.length > 25) {
                for (var i = 0; i <  data.sparks.length; i++){
                    var stats = {likes: Math.round(Math.random()*100), commentlen: Math.round(Math.random()*Math.random()*50)};
                    markers.push({'lat':  data.sparks[i].lat, 'lng':  data.sparks[i].lng, 'status':  data.sparks[i].content, 'stats': stats});
                    if(i ==  data.sparks.length-1){
                        map.setCenter(initialLocation);
                        map_inner.setCenter(initialLocation);
                    }
                }
            }
            else {
                for (var i = 0; i <  data.sparks.length; i++){
                    var stats = {likes: Math.round(Math.random()*100), commentlen: Math.round(Math.random()*Math.random()*50)};
                    markers.push({'lat':  data.sparks[i].lat, 'lng':  data.sparks[i].lng, 'status':  data.sparks[i].content, 'stats': stats});
                    if(i ==  data.sparks.length-1){
                        map.setCenter(initialLocation);
                        map_inner.setCenter(initialLocation);
                    }
                }
                var i = 0;
                while(markers.length < 25){
                    var randSign = Math.random() < 0.5 ? -1 : 1;;
                    var rand1 = (Math.random()/10).toFixed(7)*parseFloat(randSign);
                    var rand2 = (Math.random()/10).toFixed(7)*parseFloat(randSign);
                    var stats = {likes: Math.round( Math.random() * 100), commentlen: Math.round(Math.random() * Math.random() * 50)};
                    markers.push({'lat': parseFloat(initialLocation.lat())+ rand1, 'lng': parseFloat(initialLocation.lng()) + rand2, 'status': statuses[i], 'stats': stats});
                    i++;
                }
                map.setCenter(initialLocation);
                map_inner.setCenter(initialLocation);
            }
            setMarkers(markers);
        },
        error: function(data){
            var markers = [];
            for (var i = 0; i < statuses.length; i++){
                var randSign = Math.random() < 0.5 ? -1 : 1;;
                var rand1 = (Math.random()/10).toFixed(7)*parseFloat(randSign);
                var rand2 = (Math.random()/10).toFixed(7)*parseFloat(randSign);
                var stats = {likes: Math.round( Math.random() * 100), commentlen: Math.round(Math.random() * Math.random() * 50)};
                markers.push({'lat': parseFloat(initialLocation.lat())+ rand1, 'lng': parseFloat(initialLocation.lng()) + rand2, 'status': statuses[i], 'stats': stats});
                if(i == statuses.length-1){
                    map.setCenter(initialLocation);
                    map_inner.setCenter(initialLocation);
                }
            }
            setMarkers(markers);
        }
    });
};


//called by initMap
function getTweets(type, pos){
    if(type=="geolocation"){
        getTweetsFromLoc(pos); //get sparks from server
        initialPosition.latitude = pos.latitude;
        initialPosition.longitude = pos.longitude;
        getPolls(null, initialPosition);
    }
    else{
        $.ajax({
            url:'func/get_loc.php',
            success: function(data){
                var position = data;
                position.latitude = position.lat;
                position.longitude = position.lon;
                initialLocation = new google.maps.LatLng(position.lat, position.lon);
                initialPosition.latitude = position.lat;
                initialPosition.longitude = position.lon;
                getTweetsFromLoc(initialPosition);
                getPolls(null, initialPosition);
            },
            error: function(data){
                var position = {
                    latitude: 40.750464,
                    longitude: -73.993417
                }
                getTweetsFromLoc(position);
                getPolls(null, initialPosition);
            }
        });
    }
};

//function called when map is initialised
function initMap() {
    var map_options={
        center: {lat:40.750464,lng:-73.993417},
        zoom: 13,
        scrollwheel: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
    };

    var styledMap = new google.maps.StyledMapType(style2,{name: "Styled Map"});
    map = new google.maps.Map(document.getElementById('map'), map_options);

    //MAP STYLE
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    map_inner = new google.maps.Map(document.getElementById('map-inner'), map_options);
    map_inner.mapTypes.set('map_style', styledMap);
    map_inner.setMapTypeId('map_style');

    // if geolocation is possible get current position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
            map_inner.setCenter(initialLocation);
            getTweets("geolocation", position.coords);
        }, function(){
            getTweets("php", []);
        });
    }
    else { //get position from ISP
        getTweets("php", []);
    }

    //syncronized drag
    google.maps.event.addListener(map, 'center_changed', function(){map_inner.panTo(map.getCenter());});
    google.maps.event.addListener(map_inner, 'center_changed', function(){map.panTo(map_inner.getCenter());});
};



/*===============================
=        Poll Funtions          =
===============================*/

function initPollChart(ctx, poll){
    var colors = [ "#FF6384","#36A2EB","#FFCE56", "#AF6384","#6F9C56","#6F9C56"];
    var poll_option = [];
    var poll_count = [];
    var backColors = [];
    poll.poll_details.forEach(function(option, index){
        poll_option.push(option.content);
        poll_count.push(option.poll_count);
        backColors.push(colors[index]);
    });
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: poll_option,
            datasets: [{
                data: poll_count,
                backgroundColor: backColors,
                hoverBackgroundColor:backColors
            }],
            tooltipFontSize: 16
        },
        options: {
            responsive: true,
            animation: {
                animateScale: true,
                animateRotate: true
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        var precentage = Math.floor(((currentValue/total) * 100)+0.5);
                        return poll_option[tooltipItem.index]+" - "+precentage + "%";
                    }
                }
            }
        }
    });
};

function getPollInsights(poll_id, poll_title){
    $("#pollTitle").html(poll_title);
    var clnNd = $("#heatmapNode").clone(true);
    clnNd.css({'display':'block'});
    $("#heatmapContainerDiv").append(clnNd);
    var title = $(".modal .modal-content .pollTitle");
    $.ajax({
        url: api.insights,
        method: 'POST',
        data: {'poll_id': poll_id},
        success: function(data){
            var poll = data.poll;
            var insights = data.insights;
            var map_options = {
                center: {lat: poll.location[1], lng: poll.location[0]},
                zoom: 2,
                disableDefaultUI: true
            };

            function getHeatMapLocations(insights, option_no){
                var result = insights.reduce(function(map, obj) {
                    map[obj._id] = obj.user_locations;
                    return map;
                }, {});

                var user_locations = [];
                if(result[option_no] != null) {
                    result[option_no].forEach(function(loc){
                        user_locations.push(new google.maps.LatLng(loc.latitude, loc.longitude));
                    });
                };
                return user_locations;
            };

            clnNd.find('.content').css({'display': 'none'});
            var htmp = clnNd.find("#heatmap");
            var hmap = new google.maps.Map(htmp[0], map_options);
            heatmapMvcObject = new google.maps.MVCArray( getHeatMapLocations(insights, 0));
            var heatmap = new google.maps.visualization.HeatmapLayer({
               data: heatmapMvcObject
            });
            heatmap.setMap(hmap);

            //create select option dropdown
            var select = $("<select class=\"pollOptionSelect\" name=\"pollOption\"/>");
            poll.poll_details.forEach(function(option){
                 $("<option />", {value: option.option_id , text: option.content}).appendTo(select);
            });
            $(select).appendTo(clnNd.find(".heatmapContainer"));

            $(select).on('change', function() {
                var option_no = parseInt(this.value);
                heatmapMvcObject.clear();
                heatmapMvcObject = new google.maps.MVCArray( getHeatMapLocations(insights, option_no));
                var heatmap = new google.maps.visualization.HeatmapLayer({
                   data: heatmapMvcObject
                });
                heatmap.setMap(hmap);
            });

            $('html').click(function(event) {
                //check up the tree of the click target to check whether user has clicked outside of popup
                if ($(event.target).parents('#popUpModal').length==0) {
                    $("#heatmapContainerDiv #heatmapNode").remove();
                    $("#popUpModal").css({"display": "none"});
                    $(this).unbind(event);
                }
            });
        },
        error: function(data){
            $("<div class='err'>Error fetching heatmap data. Please reload!</div>").appendTo($("#heatmapContainerDiv"));

            $('html').click(function(event) {
                //check up the tree of the click target to check whether user has clicked outside of popup
                if ($(event.target).parents('#popUpModal').length==0) {
                    $("#heatmapContainerDiv #heatmapNode").remove();
                    $("#popUpModal").css({"display": "none"});
                    $(this).unbind(event);
                }
            });
        }
    });
};

function getPolls(last_value, pos){
    $.ajax({
        url: api.polls ,
        method: 'POST',
        data: {'lat':pos.latitude,'lng':pos.longitude,'last_value':last_value || 0},
        success: function(polls){
            if(polls.length > 0 ){
                totalPolls.push.apply(totalPolls, polls);
                var pollItem = $('#pollItemContainer');
                polls.forEach(function(poll){
                    var clnNode = pollItem.clone(true);
                    (function (poll, clonedNode) {
                        clonedNode.css({'display':'block'});
                        clonedNode.find('.pollContent').html(poll.content);

                        //prepare pie chart
                        var ctx = clonedNode.find('.myChart');
                        initPollChart(ctx, poll);

                        //add poll to slider
                        $('#pollSlider').slick('slickAdd',clonedNode);

                        //event listerner for pollcard heatmap button
                        var heatmapBtn = clonedNode.find('.applyNowBtn');
                        heatmapBtn.on('click', function(){
                            $('#popUpModal').css({'display':'block'});
                            getPollInsights(poll._id, poll.content);
                        });

                    }(poll, clnNode));
                });

                if(last_value == null){
                    //remove the empty loader map card from slider once data is fetched
                    $('#pollSlider').slick('slickRemove',0);
                    $('#pollSlider').slick('slickRemove',0);
                    $('#pollSlider').slick('slickRemove',0);
                }
            }
        },
        error: function(data){
            if(totalPolls.length == 0){
                polls = [
                    {
                        "_id":"5853740d7fd3006f5e16530f",
                        "content":"Study shows India has the least cost of living since 2014 in the world. Do you agree?",
                        "poll_count":9,
                        "poll_details":[
                            {
                                "option_id":0,
                                "content":"Yes",
                                "_id":"5853745c7fd3006f5e165312",
                                "poll_count":4
                            },
                            {
                                "option_id":1,
                                "content":"No",
                                "_id":"5853745c7fd3006f5e165313",
                                "poll_count":4
                            },
                            {
                                "option_id":2,
                                "content":"Don't Care",
                                "_id":"5853745c7fd3006f5e165314",
                                "poll_count":1
                            }
                        ]
                    },

                    {
                        "_id":"585372527fd3006f5e165309",
                        "content":"Which Indian language makes the best movies ?",
                        "poll_count":9,
                        "poll_details":[
                            {
                                "option_id":0,
                                "content":"Hindi",
                                "_id":"585375ce7fd3006f5e165325",
                                "poll_count":4
                            },
                            {
                                "option_id":1,
                                "content":"Tamil",
                                "_id":"585375ce7fd3006f5e165326",
                                "poll_count":1
                            },
                            {
                                "option_id":2,
                                "content":"Telugu",
                                "_id":"585375ce7fd3006f5e165327",
                                "poll_count":0
                            },
                            {
                                "option_id":3,
                                "content":"Malayalam",
                                "_id":"585375ce7fd3006f5e165328",
                                "poll_count":4
                            },
                            {
                                "option_id":4,
                                "content":"Others",
                                "_id":"585375ce7fd3006f5e165329",
                                "poll_count":0
                            }
                        ]
                    },

                    {
                        "_id":"5851b51d1851e1750ba0b153",
                        "content":"How often do you receive news or information which later turns out to be fake?",
                        "poll_count":22,
                        "poll_details":[
                            {
                                "option_id":0,
                                "content":"Daily",
                                "_id":"5851b51d1851e1750ba0b157",
                                "poll_count":14
                            },
                            {
                                "option_id":1,"content":"Every few days",
                                "_id":"5851b51d1851e1750ba0b156",
                                "poll_count":5
                            },
                            {
                                "option_id":2,
                                "content":"Weekly",
                                "_id":"5851b51d1851e1750ba0b155",
                                "poll_count":3
                            },
                            {
                                "option_id":3,
                                "content":"Never",
                                "_id":"5851b51d1851e1750ba0b154",
                                "poll_count":0
                            }
                        ]
                    },

                    {
                        "_id":"5851b3661851e1750ba0b14d",
                        "content":"What is your favorite sitcom tv series? Reply with your choice if your favorite is not mentioned here.",
                        "poll_count":13,
                        "poll_details":[
                            {
                                "option_id":0,
                                "content":"Friends",
                                "_id":"5851b3661851e1750ba0b152",
                                "poll_count":10
                            },
                            {
                                "option_id":1,
                                "content":"Himym",
                                "_id":"5851b3661851e1750ba0b151",
                                "poll_count":0
                            },
                            {
                                "option_id":2,
                                "content":"Modern family",
                                "_id":"5851b3661851e1750ba0b150",
                                "poll_count":2
                            },
                            {
                                "option_id":3,
                                "content":"That 70's show",
                                "_id":"5851b3661851e1750ba0b14f",
                                "poll_count":1
                            },
                            {
                                "option_id":4,
                                "content":"The big bang theory",
                                "_id":"5851b3661851e1750ba0b14e",
                                "poll_count":0
                            }
                        ]
                    },

                    {
                        "_id":"5850f2cd8892c35b39e8b5ef",
                        "content":"Qualcomm says none of the mobile payment apps in India are fully secure. Do you have security concerns over the mobile wallet apps you use?",
                        "poll_count":24,
                        "poll_details":[
                            {"option_id":0,
                                "content":"Yes",
                                "_id":"5850f2cd8892c35b39e8b5f2",
                                "poll_count":14
                            },
                            {
                                "option_id":1,
                                "content":"No",
                                "_id":"5850f2cd8892c35b39e8b5f1",
                                "poll_count":7
                            },
                            {
                                "option_id":2,
                                "content":"I don't use E-wallets.",
                                "_id":"5850f2cd8892c35b39e8b5f0",
                                "poll_count":3
                            }
                        ]
                    }
                ];
                totalPolls.push.apply(totalPolls, polls);
                var pollItem = $('#pollItemContainer');
                polls.forEach(function(poll){
                    (function () {
                        var clonedNode = pollItem.clone(true);
                        clonedNode.css({'display':'block'});
                        clonedNode.find('.pollContent').html(poll.content);

                        //prepare pie chart
                        var ctx = clonedNode.find('.myChart');
                        initPollChart(ctx, poll);

                        //add poll to slider
                        $('#pollSlider').slick('slickAdd',clonedNode);

                        //event listerner for pollcard heatmap button
                        var heatmapBtn = clonedNode.find('.applyNowBtn');
                        heatmapBtn.on('click', function(){
                            $('#popUpModal').css({'display':'block'});
                            getPollInsights(poll._id, poll.content);
                        });

                    }());

                });

                if(last_value == null){
                    //remove the empty loader map card from slider once data is fetched
                    $('#pollSlider').slick('slickRemove',0);
                    $('#pollSlider').slick('slickRemove',0);
                    $('#pollSlider').slick('slickRemove',0);
                }
            }

        }
    });
};


/*===============================
=        Init Funtions          =
===============================*/


//called on window.onload;
function lettersAnimation(){
    var delay_vid = 100;
    //Letters appear one by one
    setTimeout(function(){
        $('.letter-big.letter-p').removeClass('zoomOut hidden').addClass('zoomIn');
        setTimeout(function(){
            $('.letter-big.letter-o').removeClass('zoomOut hidden').addClass('zoomIn');
            setTimeout(function(){
                $('.letter-big.letter-l').removeClass('zoomOut hidden').addClass('zoomIn');
                setTimeout(function(){
                    $('.letter-big.letter-e').removeClass('zoomOut hidden').addClass('zoomIn');
                    setTimeout(function(){
                        $('.letters .desc').removeClass('zoomOut').addClass('zoomIn');
                        setTimeout(function(){$('.video-one .video-wrapper').css({'transition':'1s','transform':'rotateY(0deg)','opacity':'1'});}, delay_vid+300)
                    },delay_vid);
                },delay_vid);
            },delay_vid);
        },delay_vid);
    },100);
};

//called on window.onload;
function loadMapScripts(){
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCchfj2QcIk4ScKAGVeVe6aWR5MJzLgRHI&libraries=visualization',
        dataType: 'script',
        cache: true,
        success: function(){
          $.ajax({
            url: 'js/google.infobox.js',
            cache: true,
            dataType: 'script',
            success: function(){
              initMap();
              loadsection3();
              loadsection4();
              loadsection5();
            }
          });
        }
    });
};

//called on window.onload; initialise invitation section
function loadsection3(){
    $('.invitation .bg').css({'background-image':'url(\'img/invite.jpg\')'})
};

//called on window.onload; initialise share section
function loadsection4(){
    $('.share .bg').css({'background-image':'url(\'img/share2.jpg\')'});
    initMesh();
};

//called on window.onload; initialise poll section
function loadsection5(){
    $('.poll .bg').css({'background-image':'url(\'img/poll.jpg\')'});
};

function loadVideos(){
    var time_taken = Date.now()-start_time;
    if(typeof(ga) != "undefined")
    ga('set', 'metric1', time_taken);
    if( time_taken < 10000 ){
        var pole = ["p","o","l","e"];
        $('.video-one .video-wrapper').append('<video></video>');
        var content = function(index){
            if(index>=4) return false
            $('.video-one .video-wrapper video').eq(index).attr({'src':'videos/'+pole[index]+'/video.mp4','loop':'', 'muted':'', 'autoplay':''}).on('loadeddata',function(){
                content(index+1);
                $('.letters-img').eq(index).hide();
            });
        };
        content(0);
    }
};


$(window).on('load',function(){
    $('.preloader').remove();
    setTimeout(function(){
        $('.outer .go-next').removeClass('hidden');
    },15000)//arrow delay

    $("#pollSlider").slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        infinite: false,
        centerMode: false,
        draggable: false,
        responsive: [{
            breakpoint: 850,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
            }
        }]
    });

    // var pollEmptyItem = $('.pollItemContainer.pollEmptyContainer');
    $('#pollSlider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if(nextSlide == totalPolls.length - 6){
            // var emptyContainer = $('#pollEmptyContainer')
            // var clonedNode = emptyContainer.clone(true);
            // clonedNode.css({'display':'block'});
            // $('#pollSlider').slick('slickAdd',clonedNode); //adding loading animation container
            var lastVal = totalPolls[totalPolls.length-1].created_at;
            getPolls(lastVal, initialPosition);
        }
    });

    var modalCLoseBtn = $(".model-close-btn")[0];
    modalCLoseBtn.onclick = function() {
        $("#heatmapContainerDiv #heatmapNode").remove();
        $("#popUpModal").css({"display": "none"});
    }

    lettersAnimation(); //display letters one by one
    loadVideos(); //load letter videos
    loadMapScripts(); //load map
    loadsection3(); //load invitation
    loadsection4(); //load share section
    loadsection5(); //load poll section

    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);

});
