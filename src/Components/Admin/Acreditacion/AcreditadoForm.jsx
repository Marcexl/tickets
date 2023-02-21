import React from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import DisplayAlert from '../../Alert/Alert';
import './acreditacion.css';

export const AcreditadoForm = (props) => {
    console.log(props)
    const {nombre, apellido, mail, dni, region} = props.props;
  return (
    <>
        <Card.Title className="mt-3 a-c">Datos de la persona</Card.Title>
        <Card.Body className="card-acreditacion">
            <h2 className='pb-3' id="nombre">{nombre ? nombre : ''} {apellido ? apellido : ''}</h2>
            { mail &&
              <Form.Group className="mb-3" controlId="email">
                <Form.Label id="email">Email: {mail}</Form.Label>
              </Form.Group>
            }
            { dni && 
              <Form.Group className="mb-3" controlId="dni">
                <Form.Label id="dni">DNI: {dni}</Form.Label>
              </Form.Group>
            }
            {
              region && 
              <Form.Group className="mb-3" controlId="region">
                <Form.Label id="region">Region: {region}</Form.Label>
              </Form.Group>
            }
            <DisplayAlert type='success' display="block"  title="Ya puede acceder al evento!" />
        </Card.Body>
    </>
  )
}

