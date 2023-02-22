import React, { useEffect, useState } from "react";
import Nabvar from '../Menu/Menu';
import Sidebar from '../Menu/Sidebar';
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
  const [aside, setSidebar] = useState('sidebar')
  const [showDni, setShowDni] = useState(true)
  const [idEvento, setIdEvento] = useState('')

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
    <Nabvar page="Acreditacion"/>
    <Sidebar />
    <Container fluid className={aside}>
      <Row className="h-1">
        <Col>
          <div className="card-admin">
            <label>Selecciona el evento a acreditar:</label>
            <EventosList setIdEvento={setIdEvento} />
          </div>
        </Col>
      </Row>
      <Row className="h-11">
        <Col>
          <div className="card-admin-column">
          {
            (showQr) ? <AcreditarQr  setShowDni={setShowDni}/>
            :
            (showDni) ? <AcreditarDNI setShowQr={setShowQr} idEvento={idEvento} />
            :
            <>
            <label>Acreditacion</label>
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
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Acreditacion;