    <title>Pole - Bringing locations to life</title>
    <link rel="shortcut icon" href="img/fav.png" />
    <meta charset="UTF-8" />
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick-theme.css"/>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/base/jquery-ui.css" type="text/css" media="all" />

    <?php if(getenv('ENV')=='dev'){ ?>
        <link rel="stylesheet/less" type="text/css" href="css/style.less"/>
        <link rel="stylesheet" type="text/css" href="css/fullpage.css"/>
        <link rel="stylesheet" type="text/css" href="css/font-awesome.css"/>
        <link rel="stylesheet" type="text/css" href="css/animate.css"/>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/less.min.js"></script>
        <script type="text/javascript" src="js/fullpage.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
        <script type="text/javascript" src="js/map-style.js"></script>
    <?php } else{/*load only one resource for PROD mode*/?>
        <link rel="stylesheet" type="text/css" href="css/styles.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script type="text/javascript" src="js/scripts.js?v=<?php echo filemtime('js/scripts.js')?>"></script>
    <?php } ?>

    <script src="https://apis.google.com/js/client.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>

    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.poletalks.com" />
    <meta name="keywords" content="poletalks, Pole app, ATM, Locator,Cash,Cash No Cash, Walnut, Anonymous,Polls,Location,ATMwithcash,demonetisation,cashchaos,befikre,Pole kar,Pole it,modi,currency,500 note,2000 note,poletalks map,bulletin,Find ATM nearby, pole,Location based posts,Where can i go,Anonymous local platform,Location based Social Networking,Local news,Location Based app,Social Feed Around me,People around me,social secrets,Instant Review of places,Places around me,Nearby people,anonymous chat,find friends nearby,Nearby places,instant reaction" />
    <meta name="description" content="Location based instant reaction platform to freely share your mind and find interesting hubs. Next time you go a place and see many people around. You can't follow them but always Pole them." />

    <meta property="og:url" content="http://poletalks.com" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Poletalks - Bringing Locations to Life" />
    <meta property="og:description" content="Location based instant reaction platform to freely share your mind and find interesting hubs. Next time you go a place and see many people around. You can't follow them but always Pole them." />
    <meta property="og:image" content="img/cover.jpg" />
    <meta property="og:site-name" content="Poletalks" />
