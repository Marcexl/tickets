import React, { useEffect, useState } from "react";
import Nabvar from '../Menu/Menu';
import Sidebar from '../Menu/Sidebar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './account.css';
import { Button } from "react-bootstrap";

function MiCuenta() {
    const [aside, setSidebar] = useState('sidebar')

  return (
    <>
    <Nabvar />
    <Sidebar />
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