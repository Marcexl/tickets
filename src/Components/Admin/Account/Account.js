import React, { useState } from "react";
import Menus from '../Menu/Menu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './account.css';

function MiCuenta() {
    const [aside, setSidebar] = useState('sidebar')

  return (
    <>
    <Menus page="Mi cuenta"/>
    <Container fluid className={aside}>
      <Row className="h-1">
        <Col>
          <div className="card-admin">
            <label>Datos de la cuenta:</label>
          </div>
        </Col>
      </Row>
      <Row className="h-11">
        <Col>
          <div className="card-admin-column">
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default MiCuenta;