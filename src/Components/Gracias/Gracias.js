import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GlobalSpinner from '../Spinner/Spinner';
import People from './people.png';
import './gracias.css';

function Gracias() {
  
  return (
    <>
    <GlobalSpinner />
    <Container fluid className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login p-5">
            <img src={People} alt="people" className="people"/>
            <h4 className="mt-3 ">Muchas gracias por todo</h4>
            <h4 className="mt-1">Por ahora no hay eventos para anotarse</h4>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Gracias;
