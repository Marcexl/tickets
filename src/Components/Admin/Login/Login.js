import { useState } from 'react'; 
import { useAuth } from '../../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../../logo.png';
import Alert from 'react-bootstrap/Alert';
import GlobalSpinner from '../../Spinner/Spinner';

import './login.css';
import { storage } from '../../../utils/storage';
import GlobalSpinner from '../../Spinner/Spinner';
import DisplayAlert from '../../Alert/Alert'


function Login() {
  var spinner = document.getElementById("spinner");
  var salert = document.getElementById("success-alert");
  var dalert = document.getElementById("danger-alert");

  const [email,setEmail] = useState('');
  const [pass,setPass]   = useState('');
  const [loader, setLoader] = useState(false);
  const [msjAlert, setMsjAlert] = useState('');
  const [variant, setVariant] = useState('');
  const [display, setDisplay] = useState('none');
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate()

  let displayMsj = '';

  const handleSubmit = async (e) =>{
    e.preventDefault()
    spinner.style.display = 'block';
    try {
      const res = await signIn(email,pass);
      storage.set('user', res.user)
      setLoader(true)
      displayMsj = "Bienvenido nuevamente " + res.user;
      setDisplay('block')
      setVariant('success')
      setMsjAlert(displayMsj)

    } catch (err) {
      setLoader(false)
      displayMsj = err.message;
      setDisplay('block')
      setVariant('danger')
      setMsjAlert(displayMsj)
    }
    setTimeout(() => {
        /*if(location.state?.from) {
          navigate(location.state.from)
        }*/
    }, 1500);
    
  }

  return (
    <>
    {loader === true ? <GlobalSpinner /> :
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
                  onClick={handleSubmit}>
                  Ingresar
                </Button>
              </Form>
              <Alert variant='success' id="success-alert">
                Ya puedes acceder al panel admin!
              </Alert>
              <Alert variant='danger' id="danger-alert"></Alert>
            </Card.Body>
           <DisplayAlert title={setMsjAlert(msjAlert)} variant={setVariant(variant)} display={setDisplay(display)} /> 
          </Card>
        </Col>
      </Row>
    </Container>
    }

    </>
  );
}

export default Login;