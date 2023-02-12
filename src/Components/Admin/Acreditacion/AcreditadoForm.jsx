import React from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import './acreditacion.css';

export const AcreditadoForm = (props) => {
    console.log(props)
    const {nombre, apellido, mail, dni, region} = props.props;
  return (
    <>
        <Card.Title className="mt-3 a-c">Datos de la persona</Card.Title>
        <Card.Body className="card-acreditacion">
            <h2 className='pb-3' id="nombre">{nombre} {apellido}</h2>
            <Form.Group className="mb-3" controlId="email">
            <Form.Label id="email">{mail}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="dni">
            <Form.Label id="dni">{dni}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="region">
            <Form.Label id="region">{region}</Form.Label>
            </Form.Group>
            <Alert variant="success" show="true" id="success-alert">
            Ya puede acceder al evento!
            </Alert>
            <Alert variant='danger'  id="danger-alert"></Alert>
        </Card.Body>
    </>
  )
}

