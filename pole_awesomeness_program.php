<?php
    // header("Content-type: application/pdf");
    // header("Content-Disposition: inline; filename=filename.pdf");
    // @readfile('Awesome.pdf');
    // echo "<embed src=\"Awesome.pdf\" width=\"100%\" style=\"height:100%\"/>";

?>

<!DOCTYPE html>
<html>
<head>
    <title>Pole</title>
    <link rel="shortcut icon" href="img/fav.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="theme-color" content="#E84C3D" />

</head>
<body>
    <div class="pdfContainer">
        <div id="pdf"></div>
    </div>
    <script src="js/pdfobject.js"></script>
    <script>PDFObject.embed("pole_awesomeness_program.pdf", "#pdf");</script>
    <style>

        body{
            background-color: #333;
            background-image: url('img/bg.png');
            color: #fff;
            font-family: 'ubuntu';
            font-size: 18px;
            text-align: center;
            padding: 2vh;
            overflow: hidden;
        }

        #pdfContainer {
            min-height: 100vh;
        }

        #pdf {
            margin: 0 auto;
            height: 94vh;
        }

        #errMsg{
            padding: 15vh 0;
            height: 70vh;
        }

        #errMsg p {
            margin: 30px 0;
        }

        .link{
            margin: 0 20px;;
            text-decoration: none;
            color: #fff;
            font-family: 'dosis';
            font-size: 0.9em;
            padding: .3em .7em;
            border: 2px solid #5f8d9e;
            border-radius: 3em;
            color: #fff;
            border-color: #fff;
            background-color: #E84C3D;
        }

    </style>
</body>
</html>
