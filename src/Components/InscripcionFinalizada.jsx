import React from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Welcome/welcome.css';
import Logo from './Welcome/logo.png'

export const InscripcionFinalizada = () => {
  return (
    <Container className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Body class="text-center">
              <Card.Img className="logoInscFin mt-2" src={Logo} />
              <Card.Title className="mt-3">Ha finalizado la inscripción a la Reunión General de Líderes.</Card.Title>
              <Card.Title>¡Muchísimas Gracias!</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
