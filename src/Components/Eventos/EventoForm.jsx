import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { newEvento } from '../../utils/FetchToAPI';

export const EventoForm = () => {
    const [nombre, setNombre] = useState('')
    const [dia, setDia] = useState('')
    const [hora, setHora] = useState('')
    const [capacidad, setCapacidad] = useState('')
    const [save, setSave] = useState(false)
    const [message, setMessage] = useState('')

    const clearInputs = () => {
        setNombre('')
        setDia('')
        setHora('')
        setCapacidad('')
    }

    const handleSubmit = async () => {
        const data = {
            nombre,
            diaEvento: dia,
            horaEvento: hora,
            capacidadMaxima: capacidad
        }
        const eventSave = await newEvento(data)
        if(eventSave){
            setMessage(eventSave.message)
            setSave(true)
            clearInputs()
        }
    }

  return (
    <>
    <Container className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Title className="mt-3">Ingresar Evento</Card.Title>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                  <Form.Control
                  required
                  type="text"
                  placeholder="Nombre del Evento"
                  onChange={(e) => {setNombre(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                  required
                  type="date"
                  placeholder="Ingresar día"
                  onChange={(e) => {setDia(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                  required
                  type="time"
                  placeholder="Ingresar hora"
                  onChange={(e) => {setHora(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                  type="number"
                  placeholder="Capacidad máxima"
                  onChange={(e) => {setCapacidad(e.target.value)}}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            {
                save && 
                <Alert variant={ save ? 'success' : 'danger'} style={{display: 'block'}}>
                    { message }
                </Alert>
            }
              
              <Alert variant='danger' id="danger-alert"></Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}
