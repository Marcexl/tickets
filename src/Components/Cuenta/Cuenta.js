import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GlobalSpinner from '../Spinner/Spinner';
import Entrada from './entrada-empty.png';
import { ConfettiCanvas } from "react-raining-confetti";
import QRCode from "react-qr-code";
import './cuenta.css';
 
function Cuenta() {
  const userID = localStorage.getItem('userId');
  const url = 'https://marcexl.com.ar/gracias.php?uid='+userID;
  console.log(url);
  return (
    <>
    <GlobalSpinner />
    <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={5000} />
    <Container fluid className=''>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Title className="mt-3">¡Felicitaciones!</Card.Title>
            <Card.Body>
              <QRCode value={url} className='qr-uid'/>
              <img src={Entrada} className="ticket" alt='ticket'/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Cuenta;