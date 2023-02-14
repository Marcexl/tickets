import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { QrReader } from 'react-qr-reader';
import { acreditarPersona } from '../../../utils/FetchToAPI';
import { AcreditadoForm } from './AcreditadoForm';
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

export const AcreditarQr = ({setShowDni}) => {

  const [qr, setQr] = useState(false)
  const [dataQr, setDataQr] = useState('')
  const [dataPersona, setDataPersona] = useState(null)
  const [error, setError] = useState(false)

  const handleResults = (result, error) => {
    setError(false)
    setDataQr('')

    if (!!result) {
      setDataQr(result?.text);
      setQr(false)
    }

    if (!!error) {
      console.info(error);
    }
  }
  useEffect(() => {
    if(dataQr.length > 70){
      const string = dataQr.slice(0, -1)
      const dni = string.replace(/[^0-9]+/g, "");
      const idEvento = 3;
      const data = {
        idEvento,
        dni
      }
      acreditarPersona(data)
        .then(response => setDataPersona(response))
        .catch(error => setError(true))
    }

  }, [dataQr])

  const volver = () => {

    setShowDni(true)
    console.log("dni:true")
  }


  return (
    <>
      {dataPersona === null ?
      <>
      <Card.Title className="mt-3">Acreditar con QR</Card.Title>
      <Card.Body>
        <Form>
          {qr && (<QrReader
                constraints={{facingMode: 'environment'}}
                onResult={ handleResults }
                style={{ width: '100%' }}
            />) }
          <Form.Control
            autoFocus='true'
            placeholder='Leer QR'
            type="text"
            onChange={(e) => setDataQr(e.target.value)}
            />
            {error && <Alert variant='danger' style={{display: 'block'}}>Ocurrio un Error al intentar acreditar</Alert>}
          <Button onClick={() => setQr(true)}>Abrir Camara</Button>
          <Button onClick={ volver } className="btn-secondary">Acreditar con DNI</Button>
        </Form>
      </Card.Body>
    </>
    :
    <>
        <AcreditadoForm props={dataPersona} />
        <br />
        <Button type='submit' onClick={() => setDataPersona(null)}>Continuar Acreditando</Button>
    </>
    }

    </>
  )
}
