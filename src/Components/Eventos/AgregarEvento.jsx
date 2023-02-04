import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../../Components/logo.png'
import GlobalSpinner from '../Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';

export const AgregarEvento = () => {
    const [evento, setEvento] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [capacidad, setCapacidad] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        const newEvent = {evento, date, time}
        alert(JSON.stringify(newEvent))
    }

  return (
    <>
    <GlobalSpinner />
    <Container className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Title className="mt-3">Agregar Evento</Card.Title>
            <Card.Img variant="top" src={Logo} className="logo-login"/>
            <Card.Body>
              <Form onSubmit={ handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control 
                  required
                  type="text" 
                  placeholder="Nombre de Evento" 
                  onChange={(e) => {setEvento(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control 
                  required
                  type="date" 
                  placeholder="Fecha" 
                  onChange={(e) => {setDate(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control 
                  required
                  type="time" 
                  placeholder="Hora" 
                  onChange={(e) => {setTime(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control 
                  type="text" 
                  placeholder="Capacidad Máxima" 
                  onChange={(e) => {setCapacidad(e.target.value)}}
                  />
                </Form.Group>
                <Button type='submit'>Agregar</Button>
              </Form>

              <Alert variant='success' id="success-alert">
                Te haz registrado con exito!
              </Alert>
              <Alert variant='danger' id="danger-alert"></Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}
