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
import './login.css';
import { storage } from '../../../utils/storage';

function Login() {
  
  const [email,setEmail] = useState('');
  const [pass,setPass]   = useState('');
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const location = useLocation();


  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const res = await signIn(email,pass);
      storage.set('user', res.user)
      setUser(res.user)

    } catch (err) {
      setError(err.message)
      console.log(error)
    }
    setTimeout(() => {
      console.log(user)
        if(location.state?.from) {
          navigate(location.state.from)
        }
    }, 1500);
    
  }


  return (
    <>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Login;