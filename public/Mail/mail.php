<?php
    $html   = $_POST['html'];
    $email2 = $_POST['email'];
    $email  = 'netlabelmxl@gmail.com';
    $para      = $email;
    $titulo    = 'Tu entrada para el Encuentro Coral Soka';
    
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=iso-8859-1';
    
    // Additional headers
    $headers[] = 'From: No-reply <no_responder@sgiar.org.ar>';
    

    $msj = '
    <html>
    <head>
      <title>Monky</title>
        <style>
         @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");
         
         body,h1,h3,p{font-family: "Josefin Sans", sans-serif;}
         h3{max-width: 600px;font-weight: 200;}
         .gracias-image{max-width:600px}
        </style>
    </head>
    <body>
    <div class="gracias-image"><img src="https://sgiar.org.ar/dialogos/eventos/images/gracias.png"></div>
    '.$data['html'].'
    </body>
    </html>
    ';
    $mensaje   = $msj;
    
    if (mail($para, $titulo, $mensaje, implode("\r\n", $headers)))
    {
    	echo "ok" . $msj;
    	exit();
    } 
    else
    {
    	echo "no se ha podido mandar";
    	exit();
    }
?>