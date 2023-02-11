import React from "react";
import Nabvar from '../Menu/Menu';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import './acreditacion.css';

function Acreditacion() {
  setTimeout(function(){
    Acrediting()
  },500);

  return (
    <>
    <Nabvar />
    <Container fluid className=''>
      <Row>
        <Col className='col-login'>
          <Card className="card-login" >
            <Card.Title className="mt-3 a-c">Datos de la persona</Card.Title>
            <Card.Body className="card-acreditacion">
              <h2 className='pb-3' id="nombre"></h2>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label id="email"></Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="dni">
                  <Form.Label id="dni"></Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="div">
                  <Form.Label id="div"></Form.Label>
                </Form.Group>
                <Alert variant="success" id="success-alert">
                  Ya puede acceder al evento!
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

export default Acreditacion;

function Acrediting(){
    // obtengo parametros de url
    const url = window.location.href;
    const a = url.split('uid=')[1];
    const uid = a.split('&')[0];
    const evento = url.split('evento=')[1];
    
    const nombre   = 'Marcelo';
    const apellido = 'Gallardo';
    const div = 'DJM';
    const email = 'mxlgallardo@gmail.com';

    const dataString = {
      "dni": uid,
      "idEvento": evento
    }

    //chequeo si es miembro
    const url2 = 'https://www.sgiar.org.ar/api/v1-test/public/_p?d=';
    fetch(url2+uid)
    .then((response) => response.json())
    .then((data) => {
      if(data.data.p === false)
      {

        
      }
      else
      {

      } 
    });
    
    //registro a la persona
    const url3 = "https://www.sgiar.org.ar:3001/ticket/event/acreditate";
    fetch(url3, {
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
      }
      else if (data === false)
      {

      }
    })
    .catch((error) => {
      setTimeout(() => {
        setTimeout( () => {
        },1500);
      },1000);
    });
  }