import React, { createRef, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import GlobalSpinner from '../Spinner/Spinner';
import Foto from './entrada-empty.png';
import { ConfettiCanvas } from "react-raining-confetti";
import { QRCodeImg } from '@cheprasov/react-qrcode';
import { useScreenshot, createFileName } from "use-react-screenshot";
import './cuenta.css';

function Cuenta() {
  useEffect(() => {
    SendEmail()
  });
  
  if(localStorage.getItem('usr')){
    let userData = localStorage.getItem('usr');
    let user = JSON.parse(userData);
    let email = user.email;
    var pathThanks = 'https://sgiar.org.ar/gracias.php?uid='+email+'&evento=1';
  }

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <>
    <GlobalSpinner />
    <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={5000} />
    <Container fluid className=''>
      <Row>
        <Col className='col-login'>
          <Card className="card-login" >
            <Card.Title className="mt-3">¡Ya tenés tu entrada , te esperamos!</Card.Title>
            <Card.Body className="card-cuenta" ref={ref}>
                <div class="qr">
                  <QRCodeImg value={pathThanks} id="qr-code"/>
                </div>
                <img src={Foto} className="ticket" alt='ticket'/>
            </Card.Body>
            <div className='entrada-text'>
              <p>Esta entrada fue enviada a tu correo electrónico.</p>
              <p>En caso de no encontrarla revisá tu correo no deseado.</p>
              <Button 
                variant="primary" 
                type="button"
                onClick={downloadScreenshot}>
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
  
  if(localStorage.getItem('usr')){
    let userData = localStorage.getItem('usr');
    let user = JSON.parse(userData);
    let email = user.email;
    var picture = document.getElementsByClassName("QRCodeImg");
    console.log(picture);
    data = JSON.stringify({email: email});
  }
  else
  {
    data = '';
  }
  
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