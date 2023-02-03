import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../Components/logo.png'
import GlobalSpinner from './Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';
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


  return (
    <>
    <GlobalSpinner />
    <Container className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Title className="mt-3">Acreditar con QR</Card.Title>
            <Card.Img variant="top" src={Logo} className="logo-login"/>
            <Card.Body>
              <Form>
                {qr && (<QrReader
                      onResult={ handleResults }
                      style={{ width: '100%' }}
                  />) }
                <Form.Control 
                  required
                  type="text" 
                  value={data !== null ? data : (e) => e.target.value }
                  />
                <Button onClick={() => setQr(true)}>QR</Button>
              </Form>

              <Alert variant='success' id="success-alert">
                Te haz registrado con exito!
              </Alert>
              <Alert variant='danger' id="danger-alert"></Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}
