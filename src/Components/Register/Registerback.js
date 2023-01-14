import React, {useState} from 'react'; 
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../logo.png';
import GlobalSpinner from '../Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';
import {auth} from '../../FirabaseConfig';
import './register.css';

//var urlMaster = 'http://localhost:3000/';
var urlMaster = 'https://marcexl.com.ar/app/30aniversario/';

function Register() {
  const [email, setEmail] = useState('');
  const pass = '123456789';

  const RegistrarUsuario = (e) =>{
    let spinner = document.getElementById("spinner");
    let salert = document.getElementById("success-alert");
    let dalert = document.getElementById("danger-alert");

    e.preventDefault()
    spinner.style.display = 'block';
    auth.createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // Signed in 

      const userID = userCredential.user.multiFactor.user.uid;
      localStorage.setItem('userId',userID);
      // 1) servicio mallo para ingresar usuarios

      setTimeout(() => {
        spinner.style.display = 'none';
        salert.style.display = 'block';
        setTimeout(() => {
          window.location.href = `${urlMaster}#/eventos`;
        },800);
      },800);

      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      // ..
      setTimeout(() => {
        spinner.style.display = 'none';
        dalert.style.display = 'block';
        dalert.innerHTML = errorMessage;
      },1000);
    });
  }

  return (
    <>
    <GlobalSpinner />
    <Container className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Title className="mt-3">Ingresar Datos</Card.Title>
            <Card.Img variant="top" src={Logo} className="logo-login"/>
            <Card.Body>
              <Form onSubmit={RegistrarUsuario}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control 
                  type="text" 
                  placeholder="Nombre" 
                  className='name'
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lname">
                  <Form.Control 
                  type="text" 
                  placeholder="Apellido" 
                  className='lname'
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Control 
                  type="text" 
                  placeholder="Celular" 
                  className='phone'
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="documento">
                  <Form.Control 
                  type="text" 
                  placeholder="DNI o Nro. identificacion" 
                  className='documento'
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control 
                  type="text" 
                  placeholder="Ingresa un email" 
                  className='email'
                  onChange={(e) => {setEmail(e.target.value)}}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
             
              <Alert variant='success' id="success-alert">
                Te haz registrado con exito!
              </Alert>
              <Alert variant='danger' id="danger-alert"></Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Register;
