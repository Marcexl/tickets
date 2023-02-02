import React, { createRef, useState} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import GlobalSpinner from '../Spinner/Spinner';
import Foto from './entrada-14feb.png';
import { ConfettiCanvas } from "react-raining-confetti";
import { QRCodeImg } from '@cheprasov/react-qrcode';
import './cuenta.css';

function Cuenta() {
  // espero 3 seg y muestro el ticket
  setTimeout(function(){
    let ticket = document.getElementById("ticket-final");
    let bars   = document.getElementById("progressbar");
    ticket.style.display = 'block';
    bars.style.display = 'none';
    SendEmail();
  },3000)

  //armo la url para el QR
  let userData = localStorage.getItem('usr');
  let evento = localStorage.getItem('evento');
  let user = JSON.parse(userData);
  let dni = user.dni;
  var pathThanks = 'https://sgiar.org.ar/dialogos/eventos/#/acreditacion?uid='+dni+'&evento='+evento;

  return (
    <>
    <GlobalSpinner />
    <ProgressBar id="progressbar" animated variant="info" now={0} label='Generando la entrada, espere por favor...'/>
    <Container fluid className='' id="ticket-final">
    <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={9000} />
      <Row>
        <Col className='col-login'>
          <Card className="card-login card-ticket" >
            <Card.Title className="mt-3">¡Ya tenés tu entrada , te esperamos!</Card.Title>
            <Card.Body className="card-cuenta">
              <div className="ticket-container">
                <div className="qr" id="qr">
                  <QRCodeImg
                    value={pathThanks}
                  />
                </div>
                <img src={Foto} className="ticket" alt='ticket'/>
              </div>
            </Card.Body>
            <div className='entrada-text'>
              <p>Esta entrada fue enviada a tu correo electrónico.</p>
              <p>En caso de no encontrarla revisá tu correo no deseado.</p>
              <Button
                id="download-ticket"
                variant="primary"
                type="button"
                onClick={DownloadTicket}>
                  Descarga tu entrada
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Cuenta;

function SendEmail (){
  let data = '';
  let imgsrc = '';
  imgsrc = document.getElementsByClassName("QRCodeImg")[0];

  let userData = localStorage.getItem('usr');
  let user = JSON.parse(userData);
  let email = user.mail;
  let dni = user.dni;
  let evento = localStorage.getItem('evento');
  data = JSON.stringify({email: email, qr: imgsrc.currentSrc, evento: evento, dni:dni});

  // genero el qr enviando el base64
  fetch('./Generate/generate.php', {
    method: 'POST',
    headers:{"Content-Type": "application/json" },
    body: data,
    }).then((response) => {
    console.log(response)
    if (response.ok)
    {
      console.log('ok genero qr');

      //muetro boton para descargar
      let downloadTicket = document.getElementById('download-ticket');
      downloadTicket.style.display = 'block';

      //envio mail
      fetch('./Mail/mail.php', {
        method: 'POST',
        headers:{"Content-Type": "application/json" },
        body: data,
        }).then((response) => {
        if (response.ok)
        {
          console.log('ok envio mail');
        }
        else
        {
          console.log('no se mando el mail');
        }
      })
    }
    else
    {
      console.log('no se creo el querre');
    }
  })
}

function DownloadTicket(){

  let userData = localStorage.getItem('usr');
  let user = JSON.parse(userData);
  let dni = user.dni;
  let evento = localStorage.getItem('evento');
  let data = '?dni='+dni+'&evento='+evento;
  //window.open('http://localhost/apps/tickets/public/Ticket/generateTicket.php'+data, '_blank');
  window.open('https://www.sgiar.org.ar/dialogos/eventos/Ticket/generateTicket.php'+data, '_blank')

  return false;
}
