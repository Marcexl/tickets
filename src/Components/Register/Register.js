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
const errorMessage = "Por favor completa todos los datos";
const successMessage = "Te haz registrado con exito!"

function Register() {
  const [loader, setLoader] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false)
  const [message, setMessage] = useState('')
  const [validated, setValidated] = useState(false);
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');

  const RegistrarUsuario = (event) => {
    const form = event.currentTarget;

    // no paso false
    if (form.checkValidity() === false)
    {
      event.preventDefault();
      event.stopPropagation();
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
        setErrorRegister(true)
        setMessage(errorMessage)
        setTimeout( () => {
          setErrorRegister(false)
        },1500);
      },1000);
    }

    setValidated(true);

    // aqui paso true
    if(form.checkValidity() === true)
    {
      event.preventDefault();
      //1) activo spinner
      setLoader(true)

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
          setLoader(false)
          setMessage(successMessage)
          setTimeout( () => {
            window.location.href = `${urlMaster}#/eventos`;
          },800);
        },800);

      })
      .catch((error) => {
        console.error('Error:', error);
        setTimeout(() => {
          setErrorRegister(true)
          setLoader(false)
          setMessage(error)
          setTimeout( () => {
            setErrorRegister(false)
          },1500);
        },1000);
      });
    }
  }


  return (
    <>
    {loader ? <GlobalSpinner display="block"/> :
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
              {errorRegister && <Alert variant={errorRegister ? 'danger' : 'success'} style={{display: 'block'}}> { message } </Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    }
    </>
  );
}

export default Register;
