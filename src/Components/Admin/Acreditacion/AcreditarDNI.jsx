import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { acreditarPersona } from '../../../utils/FetchToAPI';
import { AcreditadoForm } from './AcreditadoForm';
import { Alert, Spinner } from 'react-bootstrap';
import DisplayAlert from '../../Alert/Alert';

export const AcreditarDNI = ({setShowQr, idEvento}) => {

  const [dniData, setDniData] = useState('')
  const [dataPersona, setDataPersona] = useState(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loader, setLoader] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setSent(false)
    setError(false)
    const data = {
      idEvento,
      dni : dniData
    }
    if(idEvento < 1){
      setError(true)
      setMessage("Debe seleccionar un evento.")
      setSent(true)
      return null;
    }
    try{
      setLoader(true)
      const response = await acreditarPersona(data)
      setLoader(false)
      setSent(true)
      if(response){
        if(response.status == 'error'){
          setError(true)
        }else{
          setDataPersona(response.data)
        }
        setMessage(response.message)
      }
    }catch{
      setError(true)
      setMessage("Ocurrio un error al intentar acreditar.")
    }
  }

  const volver = () => {
    setShowQr(true)
  }


  return (
    <>
      {loader && <Spinner /> }
        {dataPersona === null || dataPersona === '' ?
          <>
            <Card.Title className="mt-3">Acreditar con DNI</Card.Title>
            <Card.Body className='dni-acreditar'>
              <Form onSubmit={ handleSubmit }>
                <Form.Control
                  required
                  autoFocus={true}
                  onFocus={() => setSent(false)}
                  placeholder='Ingrese DNI'
                  type="number"
                  onChange={(e) => setDniData(e.target.value) & setSent(false)}
                  />

                  {sent && <Alert variant={error ? 'danger' : 'success'} style={{display: 'block'}}> { message } </Alert>}
                <Button type='submit'>Enviar</Button>
                <Button onClick={ volver } className="btn-secondary">Acreditar con QR</Button>
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
