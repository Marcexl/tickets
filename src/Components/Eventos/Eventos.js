import React, {useState}from 'react';
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

import './eventos.css';

const urlHost = process.env.REACT_APP_HOST;
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const emptyEvento = "Por favor seleccioná una opción";
const alreadyRegister = "'Registramos que ya haz generado tu entrada. En breve te va a llegar el email.";
const successMessage = "Te anotaste con exito!";

const options = [
  {value: '', text: '--Selecciona la actividad--'},
  {value: '3', text: 'Reunión Gral. de Líderes de Han (Concierto Conmemorativo) 14 de Febrero 19:00 hs'}
];

function Eventos() {
  const [selected, setSelected] = useState(options[0].value);
  const [loader, setLoader] = useState(false);
  const [sendEvento, setSendEvento] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const handleChange = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  const AgendarEvento = (e) =>{
    
    e.preventDefault()
    if(selected === '')
    {
      setLoader(false)
      setSendEvento(2)
      setMessage(emptyEvento)
      return false;
    }
    else
    {
      //1) activo spinner
      setLoader(true)
    
      //2) registro el usuario con el evento
      const apiRegister = `${apiEndpoint}/ticket/save`;

      //3) traigo variable evento + user
      let userData = storage.get("usrTicket");
      const dataString = {
        "dni" : userData.dni,
        "mail" : userData.mail,
        "evento": {
          "id": selected
        }
      }

      fetch(apiRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataString),
      })
      .then((response) => response.json())
      .then((data) => {
        if(data === true)
        {
          //si pudo anotarse succesmessage
          setTimeout( () => {
            setLoader(false)
            setSendEvento(1)
            setMessage(successMessage)
            setTimeout( () => {
              navigate("/cuenta")
            },800);
          },800);
        }
        else
        {
          //si no pudo anotarse xq ya esta anotado alreadymessage
          setTimeout(() => {
            setLoader(false)
            setSendEvento(2)
            setMessage(alreadyRegister)
          },1000);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // si no pude conecarme
        setTimeout(() => {
          setLoader(false)
          setSendEvento(2)
          setMessage(error)
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
            <Card.Title className="mt-3">Anotate en las actividades</Card.Title>
            <Card.Img variant="top" src={Logo} className="logo-login"/>
            <Card.Body>
              <Form onSubmit={AgendarEvento}>
                <Form.Select value={selected} onChange={handleChange}>
                    {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </Form.Select>
                <Button variant="primary" type="submit">
                  Anotarse
                </Button>
              </Form>
              {sendEvento && <Alert variant={sendEvento === 1 ? 'success' : 'danger'} style={{display: 'block'}}> { message } </Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    }
    </>
  );
}
export default Eventos;
