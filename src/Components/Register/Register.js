import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { storage } from '../../utils/storage';
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

const errorMessage = "Por favor completa todos los datos";
const successMessage = "Te haz registrado con exito!"
const urlHost = process.env.REACT_APP_HOST;
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function Register() {
  const [loader, setLoader] = useState(false);
  const [sendRegister, setSendRegister] = useState(false)
  const [message, setMessage] = useState('')
  const [validated, setValidated] = useState(false);
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

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
        setSendRegister(2)
        setMessage(errorMessage)
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

      //3) guardo en local storage
      storage.set("usrTicket",dataString)

      setTimeout( () => {
        setLoader(false)
        setSendRegister(1)
        setMessage(successMessage)
        setTimeout( () => {
          navigate("/eventos")
        },800);
      },800);

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
              {sendRegister && <Alert variant={sendRegister === 1 ? 'success' : 'danger'} style={{display: 'block'}}> { message } </Alert>}
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
