import React, { useState } from "react";
import Nabvar from '../Menu/Menu';
import Sidebar from '../Menu/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";

function Dashboard() {
    const [aside, setSidebar] = useState('sidebar')

  return (
    <>
    <Nabvar page="Escritorio" />
    <Sidebar />
    <Container fluid className={aside}>
      <Row className="h-1">
        <Col>
          <div className="card-admin-column">
            <label>Bienvenido</label>
            <p>Que quieres hacer hoy?</p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Dashboard;