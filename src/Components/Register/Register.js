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
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');

  const RegistrarUsuario = (event) => {
    var spinner = document.getElementById("spinner");
    var salert = document.getElementById("success-alert");
    var dalert = document.getElementById("danger-alert");

    const form = event.currentTarget;

    // no paso false
    if (form.checkValidity() === false)
    {
      event.preventDefault();
      event.stopPropagation();
      setTimeout(() => {
        dalert.style.display = 'block';
        dalert.innerHTML = errorMessage;
        setTimeout( () => {
          dalert.style.display = 'none';
        },1500);
      },1000);
    }

    setValidated(true);

    // aqui paso true
    if(form.checkValidity() === true)
    {
      event.preventDefault();
      //1) activo spinner
      spinner.style.display = 'block';

      //2) traigo las variables
      let docuFormated  = documento.replace(/\D/g,'');

      const dataString = {
        "mail": email,
        "dni": docuFormated
      }

      //3) registro el usuario
      var url = "https://www.sgiar.org.ar:3001/ticket/save";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataString),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('se registro el usuario');

        //4) guardo en local storage
        const dataStorage = JSON.stringify(dataString);
        localStorage.setItem("usr",dataStorage);
        localStorage.setItem("usrId",data.id);

        setTimeout( () => {
          dalert.style.display  = 'none';
          spinner.style.display = 'none';
          salert.style.display  = 'block';

          setTimeout( () => {
            window.location.href = `${urlMaster}#/eventos`;
          },800);
        },800);

      })
      .catch((error) => {
        console.error('Error:', error);
        setTimeout(() => {
          spinner.style.display = 'none';
          dalert.style.display = 'block';
          dalert.innerHTML = error;
          setTimeout( () => {
            dalert.style.display = 'none';
          },1500);
        },1000);
      });
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
                  type="email"
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
