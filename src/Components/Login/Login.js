import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../logo.png';
import {auth} from '../../FirabaseConfig';
import './login.css';
import { useState } from 'react';

function Login() {
  
  const [email,setEmail] = useState('');
  const [pass,setPass]   = useState('');

  const LoginUsuario = () =>{
    auth.signInWithEmailAndPassword(email,pass)
    .then( (r) => console.log(r))
    .catch( (err) => {
      console.log(err)
    })
  }

  return (
    <Container className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Title className="mt-3">Login</Card.Title>
            <Card.Img variant="top" src={Logo} className="logo-login"/>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control 
                  type="email" 
                  placeholder="Ingresa un email" 
                  className='email'
                  onChange={(e) => {setEmail(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="password]">
                  <Form.Control 
                  type="password" 
                  placeholder="Contrasenia" 
                  className='password'
                  onChange={(e) => {setPass(e.target.value)}}
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit"
                  onClick={LoginUsuario}>
                  Ingresar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
