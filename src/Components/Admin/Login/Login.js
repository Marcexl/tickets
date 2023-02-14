import { useState, useEffect } from 'react';
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
import './login.css';
import GlobalSpinner from '../../Spinner/Spinner';


function Login() {
  const [email,setEmail] = useState('');
  const [pass,setPass]   = useState('');
  const [loader, setLoader] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false)
  const { signIn } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();

  let displayMsj = '';

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const res = await signIn(email,pass);
      if(!errorLogin){
        if(location.state?.from) {
            navigate(location.state.from)
        }else{
            navigate("/acreditacion")
        }
      }
    } catch (err) {
      setLoader(false)
      displayMsj = err.message;
    }
  }

  return (
    <>
    <GlobalSpinner/>
    <Container className='cotainer-login'>
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
              {errorLogin === null && <Alert variant='danger' id="danger-alert"> Ocurrió un Error al intentar ingresar</Alert>}
            </Card.Body>
           {/* <DisplayAlert title={setMsjAlert(msjAlert)} variant={setVariant(variant)} display={setDisplay(display)} />  */}
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Login;