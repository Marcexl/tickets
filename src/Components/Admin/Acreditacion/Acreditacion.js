import React from "react";
import Nabvar from '../Menu/Menu';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pacman from './pacman.gif';
import Alert from 'react-bootstrap/Alert';
import './acreditacion.css';

function Acreditacion() {
  setTimeout(function(){
    Acrediting()
  },500);

  return (
    <>
    <Nabvar />
    <Container fluid className=''>
      <Row>
        <Col className='col-login'>
          <Card className="card-login" >
            <Card.Title className="mt-3">Acreditacion</Card.Title>
            <Card.Body className="card-acreditacion">
              <div id="pacman">
                <img src={Pacman} alt="pacman" />
                <p>Esperando...</p>
              </div>
              <Alert variant='success' id="success-alert">
                Ya puede acceder al evento!
              </Alert>
              <Alert variant='danger' id="danger-alert"></Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Acreditacion;

function Acrediting(){
    //init spinner and alerts
    var salert = document.getElementById("success-alert");
    var dalert = document.getElementById("danger-alert");
    var pacman = document.getElementById("pacman");
    //init data variables
    let mail   = '';
    let uid    = '';

    //first lookin for dni
    uid = localStorage.getItem("uid_get");
    let evento = localStorage.getItem("evento_get");

    //check if this is a email
    if(uid.includes("@") == true)
    {
      mail = uid;
      uid  = '';
    }
    else
    {
      mail = '';
    }

    const dataString = {
      "mail": mail,
      "dni": uid,
      "idEvento": evento
    }

    //registro a la persona
    var url = "https://www.sgiar.org.ar:3001/ticket/event/acreditate";
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataString),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data == true)
      {
        dalert.style.display  = 'none';
        pacman.style.display = 'none';
        salert.style.display  = 'block';
      }
      else if (data == false)
      {
        dalert.style.display  = 'block';
        pacman.style.display = 'none';
        salert.style.display  = 'none';
        dalert.innerHTML = "Ooops... no se ha encontrado el usuario";
      }
    })
    .catch((error) => {
      setTimeout(() => {
        pacman.style.display = 'none';
        dalert.style.display = 'block';
        dalert.innerHTML = error;
        setTimeout( () => {
          dalert.style.display = 'none';
        },1500);
      },1000);
    });

    setTimeout(function(){
      pacman.style.display = 'block';
      dalert.style.display = 'none';
      salert.style.display  = 'none';
    },10000);
}