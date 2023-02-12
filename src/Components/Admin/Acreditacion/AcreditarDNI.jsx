import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { acreditarPersona } from '../../../utils/FetchToAPI';
import { AcreditadoForm } from './AcreditadoForm';

export const AcreditarDNI = ({setShowQr}) => {

  const [dniData, setDniData] = useState('')
  const [dataPersona, setDataPersona] = useState(null)
  const idEvento = 3;


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      idEvento,
      dniData
    }
    const response = await acreditarPersona(data)
    setDataPersona(response)
  }

  const volver = () => {
    setShowQr(true)
  }
  

  return (
    <>
      {dataPersona === null ? 
      <>
        <Card.Title className="mt-3">Acreditar con DNI</Card.Title>
        <Card.Body className='dni-acreditar'>
          <Form onSubmit={ handleSubmit }>
            <Form.Control 
              placeholder='Ingrese DNI'
              type="number" 
              onChange={(e) => setDniData(e.target.value)}
              />
            <Button type='submit'>Enviar</Button>
            <Button onClick={ volver }>Acreditar con QR</Button>
          </Form>
        </Card.Body>
      </>
      :
      <>
        <AcreditadoForm props={dataPersona} />
        <br />
        <Button onClick={() => setDataPersona(null)}>Continuar Acreditando</Button>
      </>
    }
    </>
  )
}
