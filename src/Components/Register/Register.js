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
import './register.css';

//var urlMaster = 'http://localhost:3000/';
var urlMaster = 'https://sgiar.org.ar/dialogos/eventos/';
var errorMessage = 'Por favor completa todos los datos';


function Register() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [documento, setDocumento] = useState('');

  const RegistrarUsuario = (event) => {

    var spinner = document.getElementById("spinner");
    var salert = document.getElementById("success-alert");
    var dalert = document.getElementById("danger-alert");

    const form = event.currentTarget;
    if (form.checkValidity() === false) 
    {
      event.preventDefault();
      event.stopPropagation();

      setTimeout(() => {
        spinner.style.display = 'none';
        dalert.style.display = 'block';
        dalert.innerHTML = errorMessage;
        setTimeout( () => {
          dalert.style.display = 'none';
        },1500);
      },1000);
      
    }
    else
    {
      const data = {
        nombre: name,
        apellido: lname,
        dni: documento,
        email: email,
        celular: phone,
      }
      const dataStorage = JSON.stringify(data);
      localStorage.setItem("usr",dataStorage);

      // Ejemplo implementando el metodo POST:
      event.preventDefault();
      setValidated(true);
  
      spinner.style.display = 'block';
      localStorage.setItem('userId',email);
      // 1) servicio mallo para ingresar usuarios
      
      setTimeout( () => {
        dalert.style.display = 'none';
        spinner.style.display = 'none';
        salert.style.display = 'block';
        console.log(data);
  
      setTimeout( () => {
          window.location.href = `${urlMaster}#/eventos`;
        },800);
      },800);
    }
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
              <Form noValidate validated={validated} onSubmit={RegistrarUsuario}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control 
                  required
                  type="text" 
                  placeholder="Nombre" 
                  className='name'
                  onChange={(e) => {setName(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lname">
                  <Form.Control 
                  required
                  type="text" 
                  placeholder="Apellido" 
                  className='lname'
                  onChange={(e) => {setLname(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Control 
                  required
                  type="text" 
                  placeholder="Celular" 
                  className='phone'
                  onChange={(e) => {setPhone(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="documento">
                  <Form.Control 
                  required
                  type="text" 
                  placeholder="DNI o Nro. identificacion" 
                  className='documento'
                  onChange={(e) => {setDocumento(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control 
                  required
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
