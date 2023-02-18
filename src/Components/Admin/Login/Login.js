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
import { Spinner } from 'react-bootstrap';


function Login() {
  const [email,setEmail] = useState('');
  const [pass,setPass]   = useState('');
  const [loader, setLoader] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false)
  const [message, setMessage] = useState('')
  const { signIn } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();


  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      setLoader(true)
      const res = await signIn(email,pass);
      setMessage(res.message)
      setLoader(false)
      if(res.status == 'ok'){
        if(location.state?.from) {
            navigate(location.state.from)
        }else{
            navigate("/acreditacion")
        }
      }else{
        setErrorLogin(true)
      }
    } catch (err) {
      setLoader(false)
      setErrorLogin(true)
    }
  }

  return (
    <>
    {loader ? <Spinner /> : 
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
              {errorLogin && <Alert variant={errorLogin ? 'danger' : 'success'} style={{display: 'block'}}> { message } </Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    }
    </>
  );
}

export default Login;