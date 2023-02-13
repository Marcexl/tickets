import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { acreditarPersona } from '../../../utils/FetchToAPI';
import { AcreditadoForm } from './AcreditadoForm';
import { Alert } from 'react-bootstrap';
import DisplayAlert from '../../Alert/Alert';

export const AcreditarDNI = ({setShowQr}) => {

  const [dniData, setDniData] = useState('')
  const [dataPersona, setDataPersona] = useState(null)
  const [error, setError] = useState(false)
  
  const idEvento = 3;


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    const data = {
      idEvento,
      dni : dniData
    }
    try{
      const response = await acreditarPersona(data)
      if(response.error != null){
        setError(true)
      }else{
        setDataPersona(response)
      }
    }catch{
      setError(true)
    }
  }

  const volver = () => {
    setShowQr(true)
  }
  

  return (
    <>
      {dataPersona === null || dataPersona === '' ? 
      <>
        <Card.Title className="mt-3">Acreditar con DNI</Card.Title>
        <Card.Body className='dni-acreditar'>
          <Form onSubmit={ handleSubmit }>
            <Form.Control 
              autoFocus={true}
              placeholder='Ingrese DNI'
              type="number" 
              onChange={(e) => setDniData(e.target.value)}
              />
              
              {error && <Alert variant='danger' style={{display: 'block'}}>Ocurrio un Error al intentar acreditar</Alert>}
            <Button type='submit'>Enviar</Button>
            <Button onClick={ volver }>Acreditar con QR</Button>
          </Form>
        </Card.Body>
      </>
      :
      <Form onSubmit={() => setDataPersona(null)}>
        <AcreditadoForm props={dataPersona}/>
        <br />
        <Button type='submit' >Continuar Acreditando</Button>
      </Form>
    }
    </>
  )
}
