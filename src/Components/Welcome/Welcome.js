import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Logo from './welcome.png';
import './welcome.css';

function Welcome() {
  return (
    <Container className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Body>
              <Card.Title className="mt-3">Bienvenidos</Card.Title>
              <Card.Img variant="top" src={Logo} className="welcome-avatar"/>
              <Card.Text>
                <Link to="/register">
                  <Button variant="primary" type="button" className='register-button'>
                    Registrarse
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" type="button" className='login-button'>
                    Login
                  </Button>
                </Link>                
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Welcome;
