import React, { createRef } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import GlobalSpinner from '../Spinner/Spinner';
import { ConfettiCanvas } from "react-raining-confetti";
import QRCode from "react-qr-code";
import { useScreenshot, createFileName } from "use-react-screenshot";
import './cuenta.css';

var pathThanks = 'https://marcexl.com.ar/gracias.php?uid=';


function Cuenta() {

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const userID = '123456789';
  const url = pathThanks+userID;

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
  const SendEmail = (e) =>{
    let userData = localStorage.getItem('usr');
    let user = JSON.parse(userData);
    let email = user.email;
    let elem = document.getElementById('ticket');
    console.log(elem.innerHTML);
    const data = "email=" + email + "&html=" + elem.innerHTML;
  
    fetch('./Mail/mail.php', {
        method: 'POST',
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
  return (
    <>
    <GlobalSpinner />
    <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={5000} />
    <Container fluid className=''>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Title className="mt-3">¡Ya tenés tu entrada , te esperamos!</Card.Title>
            <Card.Body ref={ref} id="ticket">
              <QRCode value={url} className='qr-uid' />
              <img src="https://marcexl.com.ar/app/30aniversario/static/media/entrada-empty.c5dc0866af6e2c0eab56.png" className="ticket" alt='ticket'/>

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
    {SendEmail}
    </>
  );
}

export default Cuenta;

 

