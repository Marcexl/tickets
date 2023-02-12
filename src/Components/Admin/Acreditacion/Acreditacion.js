import React, { useEffect, useState } from "react";
import Nabvar from '../Menu/Menu';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import './acreditacion.css';
import { Button } from "react-bootstrap";
import { AcreditarDNI } from "./AcreditarDNI";
import { AcreditarQr } from "./AcreditarQR";




function Acreditacion() {

  const [dataPersona, setDataPersona] = useState(null)
  const [qr, setQr] = useState(false)
  const [dni, setDni] = useState(false)


  // setTimeout(function(){
  //   Acrediting()
  // },500);

  const handleSubmitDni = () => {
    console.log("submit dni")
    setDni(true)
  }

  const handleSubmitQr = () => {
    console.log("submit Qr")
    setQr(true)
  }

  useEffect(() => {
    qr && setDni(false)
    dni && setQr(false)
  }, [])
  

  return (
    <>
    <Nabvar />
    <Container fluid className=''>
      <Row>
          <Col className='col-login'>
            <Card className="card-login" >
            {qr ? <AcreditarQr  setDni={setDni}/> : dni && <AcreditarDNI setQr={setQr}/>}
            {dataPersona == null & !qr & !dni && 
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

// function Acrediting(){
//     // obtengo parametros de url
//     const url = window.location.href;
//     const a = url.split('uid=')[1];
//     const uid = a.split('&')[0];
//     const evento = url.split('evento=')[1];
    
//     const nombre   = 'Marcelo';
//     const apellido = 'Gallardo';
//     const div = 'DJM';
//     const email = 'mxlgallardo@gmail.com';

//     const dataString = {
//       "dni": uid,
//       "idEvento": evento
//     }

//     //chequeo si es miembro
//     const url2 = 'https://www.sgiar.org.ar/api/v1-test/public/_p?d=';
//     fetch(url2+uid)
//     .then((response) => response.json())
//     .then((data) => {
//       if(data.data.p === false)
//       {

        
//       }
//       else
//       {

//       } 
//     });
    
//     //registro a la persona
//     const url3 = "https://www.sgiar.org.ar:3001/ticket/event/acreditate";
//     fetch(url3, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(dataString),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       if(data === true)
//       {
//       }
//       else if (data === false)
//       {

//       }
//     })
//     .catch((error) => {
//       setTimeout(() => {
//         setTimeout( () => {
//         },1500);
//       },1000);
//     });
//   }