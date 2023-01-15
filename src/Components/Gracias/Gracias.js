import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import People from './people.png';
import './gracias.css';

function Gracias() {

  return (
    <>
    <Container fluid className=''>
      <Row>
        <Col className='col-login'>
          <Card className="card-login" >
            <Card.Title className="mt-3">¡Falta muy poco para el Encuentro Coral!</Card.Title>
            <Card.Body className="card-gracias">
              <img src={People} alt="people" className="people" />
              <p>Te esperamos el Sabado 21 de Enero</p>
              <p>En el Auditorio de la Paz, Donado 2150, Villa Urquiza</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Gracias;
