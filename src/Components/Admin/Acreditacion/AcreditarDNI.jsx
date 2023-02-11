import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LectorQr = () => {

  const [data, setData] = useState(null)
  const [dni, setDni] = useState('')

  const handleSubmit = () => {
    console.log("Submit " + dni)
  }

  return (
    <>
      <Card className="card-acreditar" id="acreditarDNI">
        <Card.Title className="mt-3">Acreditar con DNI</Card.Title>
        <Card.Body className='dni-acreditar'>
          <Form>
            <Form.Control 
              placeholder='Ingrese DNI'
              type="number" 
              onChange={(e) => setDni(e.target.value)}
              />
            <Button onClick={ handleSubmit }>Enviar</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
