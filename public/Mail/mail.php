<?php
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);
  
    $email  = $data['email'];
    $dni    = $data['dni'];
    $username = strstr($email, '@', true); //"username"
    $evento = $data['evento'];
    $para   = $email;
    $file = 'https://sgiar.org.ar/dialogos/test/Generate/'.$evento.'_'.$dni.'.png';
  
    $para   = $email;
    $titulo = 'Tu entrada para el Encuentro Coral Soka';
    
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=iso-8859-1';
    
    // Additional headers
    $headers[] = 'From: Encuentro Coral Soka <no_responder@sgiar.org.ar>';
    
    $msj = '
    <html>
    <head>
      <title>Monky</title>
      <style>
      @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");
      
      body,h1,h3,p{font-family: "Josefin Sans", sans-serif;}
      h3{max-width: 600px;font-weight: 200;}
      .gracias-image{    
         max-width: 600px;
         padding: 30px;
         box-sizing: border-box;
      }
      .gracias-image img{
         width: 100%;
      }
      .ticket-container{
          width: 1100px;
          border: 1px solid #000;
          position: relative;
          display: flex;
      }
      .ticket-container .ticket{
          width: 750px;
       }
       .querre{
          padding: 20px;
          width: 300px;
       }
     </style>
    </head>
    <body>
    <div class="gracias-image"><img src="https://sgiar.org.ar/dialogos/test/images/gracias.png"></div>
    <div class="ticket-container">
      <img src="'.$file .'" alt="querre" class="querre"/>
      <img src="https://sgiar.org.ar/dialogos/test/images/entrada-empty.jpg" class="ticket" alt="ticket"/>
    </div>
    </body>
    </html>
    ';
    $mensaje   = $msj;
    
    if (mail($para, $titulo, $mensaje, implode("\r\n", $headers)))
    {
    	print_r($msj);
    	exit();
    } 
    else
    {
    	echo "no se ha podido mandar";
    	exit();
    }
?>