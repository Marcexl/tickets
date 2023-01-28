import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GlobalSpinner from '../Spinner/Spinner';
import './gracias.css';

function Gracias() {
  setTimeout(function(){
    RedirectAcreditacion()
  },1000);
  return (
    <>
    <GlobalSpinner />
    <Container fluid className=''>
      <Row>
        <Col className='col-login'>
          <Card className="card-login" >
            <Card.Title className="mt-3">Redireccionando..</Card.Title>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Gracias;

function RedirectAcreditacion(){
  //inicio spinner
  var spinner = document.getElementById("spinner");
  spinner.style.display = 'block';

  // obtengo parametros de url
  var url = window.location.href;
  let a = url.split('uid=')[1];
  let uid = a.split('&')[0];
  let evento = url.split('evento=')[1];
  
  // guardo en local storage
  localStorage.setItem("evento_get",evento);
  localStorage.setItem("uid_get",uid);

  //redirecciono para acreditar
  setTimeout(function(){
    window.location.href = 'https://sgiar.org.ar/dialogos/eventos/#/acreditacion';
    //window.location.href = 'http://localhost:3000/#/acreditacion';
  },2000);
}