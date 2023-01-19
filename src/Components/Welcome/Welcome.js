import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Logo from './maitainance.jpg';
import './welcome.css';

function Welcome() {

  return (
    <Container className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Body>
              <Card.Text>
                <img src={Logo} alt="imagen"/>
                <p>Estamos <b>actualizando</b> el sistema de entradas.</p>
                <p>En breve vas a poder volver a generar tu invitacion.</p>  
                <p>Disculpe las molestias.</p>  
                <p>Muchas gracias!</p>  
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Welcome;
