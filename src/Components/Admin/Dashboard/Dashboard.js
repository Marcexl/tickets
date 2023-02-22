import React, { useState } from "react";
import Menus from '../Menu/Menu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";

function Dashboard() {
    const [aside, setSidebar] = useState('sidebar')

  return (
    <>
    <Menus page="Escritorio" />
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