import React from 'react'; 
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../logo.png';
import GlobalSpinner from '../Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';
import './eventos.css';

//var urlMaster = 'http://localhost:3000/';
var urlMaster = 'https://sgiar.org.ar/dialogos/eventos/';


function Eventos() {
    const AgendarEvento = (e) =>{
        let spinner = document.getElementById("spinner");
        let salert = document.getElementById("success-alert");
        //let dalert = document.getElementById("danger-alert");
    
        e.preventDefault()
        spinner.style.display = 'block';
       
        setTimeout(() => {
            spinner.style.display = 'none';
            salert.style.display = 'block';
            setTimeout(() => {
              window.location.href = `${urlMaster}#/cuenta`;
            },800);
        },800);
    }
  return (
    <>
    <GlobalSpinner />
    <Container className='container-login'>
      <Row>
        <Col className='col-login'>
          <Card className="card-login">
            <Card.Title className="mt-3">Anotate en las actividades</Card.Title>
            <Card.Img variant="top" src={Logo} className="logo-login"/>
            <Card.Body>
              <Form onSubmit={AgendarEvento}>
                <Form.Select aria-label="Default select example">
                    <option>Selecciona la actividad</option>
                    <option value="1">Encuentro Coral Soka Sabado 21 Enero 18:00 hs</option>
                    <option value="2">Encuentro Coral Soka Sabado 21 Enero 20:00 hs</option>
                </Form.Select>
                <Button variant="primary" type="submit">
                  Anotarse
                </Button>
              </Form>
              <Alert variant='success' id="success-alert">
                Te anotaste con exito!
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Eventos;
