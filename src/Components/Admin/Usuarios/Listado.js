import React from 'react';
import Nabvar from '../Menu/Menu';
import GlobalSpinner from '../../Spinner/Spinner';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './listado.css';

function Listado(){

    setTimeout(function(){
        getListado()
    },1000)

    return (
        <>
        <Nabvar />
        <GlobalSpinner />
        <Container className='container-login'>
            <Row>
                <Col className='col-login'>
                    <Card className="card-login">
                    <Table striped bordered hover id="listado-final">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Celular</th>
                            <th>DNI</th>
                            <th>Email</th>
                            <th>Verificado</th>
                            <th>Evento</th>
                            </tr>
                        </thead>
                        <tbody id="result">
                        </tbody>
                    </Table>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}

function getListado(){
    let url = "https://www.sgiar.org.ar:3001/ticket/getAll";
    let table = '';
    let i = 0;
    let evento = '';
    let elem   = document.getElementById('result');
    let docuFormated  = '';
    let phoneFormated = '';
    let mailFormated  = '';
    let verificado    = '';
    var spinner = document.getElementById("spinner");
    spinner.style.display = 'block';
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        /*return false;*/
        for(var key in data)
        {
            i++
            table += '<tr>'
            table += '<td>'+i+'</td>'
            table += '<td>'+data[key]['nombre']+'</td>'
            table += '<td>'+data[key]['apellido']+'</td>'

            //format celu
            phoneFormated  = data[key]['celular'].replace(/\D/g,'');
            table += '<td>'+Number(phoneFormated)+'</td>'

            //format dni
            docuFormated  = data[key]['dni'].replace(/\D/g,'');
            table += '<td>'+docuFormated+'</td>'

            //format email
            mailFormated = data[key]['mail'].replace(/\s+/g, '');
            table += '<td>'+mailFormated.toLowerCase()+'</td>'

            verificado = data[key]['verificado'] === 0 ? 'no' : 'si';

            table += '<td>'+verificado+'</td>';

            // me fijo si eligio evento y si es 18 o 20 hs
            if(data[key]['evento'])
            {
                evento = data[key]['evento'].id === 1 ? "18:00 hs" : "20:00 hs";
            }
            table += '<td>'+evento+'</td>'
            table += '</tr>'
        }
        setTimeout(function(){
            spinner.style.display = 'none';
            elem.innerHTML = table;
        },1500)
    })
}

export default Listado;