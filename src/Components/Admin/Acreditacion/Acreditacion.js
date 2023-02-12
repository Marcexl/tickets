import React, { useEffect, useState } from "react";
import Nabvar from '../Menu/Menu';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './acreditacion.css';
import { Button } from "react-bootstrap";
import { AcreditarDNI } from "./AcreditarDNI";
import { AcreditarQr } from "./AcreditarQR";
import GlobalSpinner from '../../Spinner/Spinner';

function Acreditacion() {

  const [showQr, setShowQr] = useState(false)
  const [showDni, setShowDni] = useState(false)



  const handleSubmitDni = () => {
    setShowDni(true)
  }

  const handleSubmitQr = () => {
    setShowQr(true)
  }

  useEffect(() => {
    if(showQr){
      setShowDni(false)
    }
  }, [showQr])

  useEffect(() => {
    if(showDni){
      setShowQr(false)
    }
  }, [showDni])
  

  return (
    <>
    <Nabvar />
    <GlobalSpinner />
    <Container fluid className=''>
      <Row>
          <Col className='col-login'>
            <Card className="card-login" >
            {
              (showQr) ? <AcreditarQr  setShowDni={setShowDni}/> 
              :
              (showDni) ? <AcreditarDNI setShowQr={setShowQr}/>
              :
              <>
              <Card.Title className="mt-3">Acreditacion</Card.Title>
              <Card.Body className='dni-acreditar'>
                <Button
                  onClick={handleSubmitDni}
                >Con DNI</Button>
                <Button
                  onClick={handleSubmitQr}
                >Con QR</Button>
                </Card.Body>
              </> 
              
            }

        </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Acreditacion;