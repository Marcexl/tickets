import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { QrReader } from 'react-qr-reader';

export const LectorQr = () => {

  const [qr, setQr] = useState(false)
  const [data, setData] = useState(null)

  const handleResults = (result, error) => {
    if (!!result) {
      setData(result?.text);
      setQr(false)
    }

    if (!!error) {
      console.info(error);
    }
  }

  const handleSubmit = () => {
    console.log("Submit " + dni)
  }

  return (
    <>
      <Card className="card-acreditar" id="acreditarQr">
      <Card.Title className="mt-3">Acreditar con QR</Card.Title>
      <Card.Body>
        <Form>
          {qr && (<QrReader
                constraints={{facingMode: 'enviroment'}}
                onResult={ handleResults }
                style={{ width: '100%' }}
            />) }
          <Form.Control 
            disabled
            placeholder='Leer QR'
            type="text" 
            value={data !== null ? data : (e) => e.target.value }
            />
          <Button onClick={() => setQr(true)}>Leer QR</Button>
        </Form>
      </Card.Body>
    </Card>
    </>
  )
}
