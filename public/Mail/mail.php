<?php
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);

    $email  = $data['email'];
    $dni    = $data['dni'];
    $username = strstr($email, '@', true); //"username"
    $evento = $data['evento'];
    $para   = $email;
    $file = 'https://sgiar.org.ar/dialogos/eventos/Generate/'.$evento.'_'.$dni.'.png';
    
    $assume = 'Reunión Gral. de Líderes de han del 30º Aniversario';
    
    $para   = $email;
    $titulo = 'Tu entrada para la Reunión General de Líderes de han del 30º Aniversario';
    $text = '<p>¡Muchas gracias por haber confirmado tu presencia para la <b><i>Reunión General de Líderes de Han</i></b> en conjunto con el <b><i>Concierto Conmemorativo del 30° Aniversario</i></b>!</p>
             <p>Te adjuntamos tu entrada con un código QR y te esperamos con mucha alegría el martes 14 de febrero en nuestro Auditorio de la Paz, para conmemorar los 30 años de la llegada de Ikeda Sensei a nuestro país y renovar nuestro juramento.</p>
             <p>¡Sigamos avanzando juntos, en unión de la Familia Soka!</p>
             <p>¡Muchísimas gracias!</p>';

    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';

    // Additional headers
    $headers[] = 'From: '.$assume.' <no_responder@sgiar.org.ar>';

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
       p{
         font-size:1rem;
       }
     </style>
    </head>
    <body>
    <div class="gracias-image">'.$text.'</div>
    <div class="ticket-container">
      <img src="'.$file .'" alt="querre" class="querre"/>
      <img src="https://sgiar.org.ar/dialogos/eventos/images/entrada-empty-14feb.jpg" class="ticket" alt="ticket"/>
    </div>
    </body>
    </html>
    ';
    $mensaje   = $msj;

    if (mail($para, $titulo, $mensaje, implode("\r\n", $headers)))
    {
      echo 1;
    	exit();
    }
    else
    {
    	echo 0;
    	exit();
    }
?>