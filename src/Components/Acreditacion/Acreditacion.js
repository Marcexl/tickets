import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Acreditacion() {

  return (
    <>
    <Container fluid className=''>
      <Row>
        <Col className='col-login'>
          <Card className="card-login" >
            <Card.Title className="mt-3">Acreditacion</Card.Title>
            <Card.Body className="card-gracias">
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Acreditacion;
