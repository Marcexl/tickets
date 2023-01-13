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
import {auth, signInWithGoogle} from '../../FirabaseConfig';
import './register.css';
 
function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const RegistrarUsuario = (e) =>{
    let spinner = document.getElementById("spinner");
    let salert = document.getElementById("success-alert");
    let dalert = document.getElementById("danger-alert");

    e.preventDefault()
    spinner.style.display = 'block';
    auth.createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // Signed in 
      //const user = userCredential.user;
      setTimeout(() => {
        spinner.style.display = 'none';
        salert.style.display = 'block';
        setTimeout(() => {
          window.location.href = 'http://localhost:3000/eventos';
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
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control 
                  type="text" 
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
                <Button variant="primary" type="submit">
                  Registrarme
                </Button>
              </Form>
              <Button  type="button" className='google-but' onClick={signInWithGoogle}>
                Ingresar con Google
              </Button>
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
