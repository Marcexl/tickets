import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { QrReader } from 'react-qr-reader';
import { acreditarPersona } from '../../../utils/FetchToAPI';
import { AcreditadoForm } from './AcreditadoForm';
import { useEffect } from 'react';

export const AcreditarQr = ({setDni}) => {

  const [qr, setQr] = useState(false)
  const [dataQr, setDataQr] = useState('')
  const [dataPersona, setDataPersona] = useState(null)

  const handleResults = (result, error) => {
    debugger
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
    }
  
  }, [dataQr])
  
  const volver = () => {
    setDni(true)
    console.log("volver")
  }


  return (
    <>
      {dataPersona === null ?
      <Card className="card-acreditar" id="acreditarQr">
      <Card.Title className="mt-3">Acreditar con QR</Card.Title>
      <Card.Body>
        <Form>
          {qr && (<QrReader
                //constraints={{facingMode: 'user'}}
                 constraints={{facingMode: 'environment'}}
                //facingMode={'environment'}
                onResult={ handleResults }
                style={{ width: '100%' }}
            />) }
          <Form.Control 
            placeholder='Leer QR'
            type="text" 
            onChange={(e) => setDataQr(e.target.value)}
            />
          <Button onClick={() => setQr(true)}>Abrir Camara</Button>
          <Button onClick={ volver }>Acreditar con DNI</Button>
        </Form>
      </Card.Body>
    </Card>
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
