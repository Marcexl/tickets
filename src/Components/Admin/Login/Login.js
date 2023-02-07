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

//var urlMaster = 'http://localhost:3000/';
var urlMaster = 'https://sgiar.org.ar/dialogos/eventos/';

function Login() {
  var spinner = document.getElementById("spinner");
  var salert = document.getElementById("success-alert");
  var dalert = document.getElementById("danger-alert");

  const [email,setEmail] = useState('');
  const [pass,setPass]   = useState('');
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  //const navigate = useNavigate()
  const [user, setUser] = useState('')
  //const location = useLocation();


  const handleSubmit = async (e) =>{
    e.preventDefault()
    spinner.style.display = 'block';
    try {
      const res = await signIn(email,pass);
      const uid = res.user.multiFactor.user.uid;
    
      setUser(res.user)
      //storage("uid",uid);
      localStorage.setItem("uid",uid);
      
      setTimeout( () => {
        dalert.style.display  = 'none';
        spinner.style.display = 'none';
        salert.style.display  = 'block';

        setTimeout( () => {
          window.location.href = `${urlMaster}#/acreditacion`;
        },800);
      },800);
    } catch (err) {
      //setError(err.message)
      setTimeout(() => {
        spinner.style.display = 'none';
        dalert.style.display = 'block';
        dalert.innerHTML = err;
        setTimeout( () => {
          dalert.style.display = 'none';
        },5000);
      },1000);
    }
  }

  return (
    <>
    <GlobalSpinner />
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
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Login;