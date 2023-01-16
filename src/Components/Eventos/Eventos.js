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
    let dalert = document.getElementById("danger-alert");

    e.preventDefault()
    spinner.style.display = 'block';
    
    setTimeout(() => {
      var option = document.getElementById("eventos");
      var evento = option.value;
      if(evento == 0)
      {
        spinner.style.display = 'none';
        dalert.style.display = 'block';
        salert.style.display = 'none';
        return false;
      }
      else
      {
        spinner.style.display = 'none';
        dalert.style.display = 'none';
        salert.style.display = 'block';

        localStorage.setItem("evento",evento);
        // levanto los datos
        let userData = localStorage.getItem('usr');
        let user = JSON.parse(userData);
        let id = user.dni;
        let nombre = user.nombre;
        let apellido = user.apellido;
        let celular = user.celular;
        let email = user.email; 

        //armo el json
        let data = JSON.stringify({
          id: id, 
          nombre: nombre, 
          apellido: apellido, 
          dni: id, 
          email: email, 
          celular: celular, 
          evento: evento, 
          validado: 0
        });
        
        //envio
        fetch( urlMaster + 'db/insertUsers.php', {
          method: 'POST',
          headers:{"Content-Type": "application/json" },
          body: data,
          }).then((response) => {
            console.log(response)
            setTimeout(() => {
              window.location.href = `${urlMaster}#/cuenta`;
            },800);
        }).catch((response) => {
          console.log("no se ha podido insertar el usuario");
        })
      }
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
                <Form.Select aria-label="Default select example" id="eventos">
                    <option value="0">Selecciona la actividad</option>
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
              <Alert variant='danger' id="danger-alert">
                Por favor seleccioná una opción
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
