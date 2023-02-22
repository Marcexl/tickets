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
import { EventosList } from "../../Eventos/EventosList";

function Acreditacion() {

  const [showQr, setShowQr] = useState(false)
  const [showDni, setShowDni] = useState(true)
  //const [idEvento, setIdEvento] = useState('')
  const idEvento = 6;

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
    <Container fluid className=''>
      <Row>
          <Col className='col-login'>
            <Card className="card-login" >
              {/* <Card.Title className="mt-3">Selecciona el evento a acreditar</Card.Title> */}
              {/* <EventosList setIdEvento={setIdEvento} /> */}
            {
              // (showQr) ? <AcreditarQr  setShowDni={setShowDni} idEvento={idEvento} />
              // :
              (showDni) ? <AcreditarDNI setShowQr={setShowQr} idEvento={idEvento} />
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