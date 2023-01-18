import React, {useEffect} from 'react';
import GlobalSpinner from '../Spinner/Spinner';
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
        <GlobalSpinner />
        <Container className='container-login'>
            <Row>
                <Col className='col-login'>
                    <Card className="card-login">
                        <Table striped bordered hover>
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
    let url = "https://www.sgiar.org.ar/dialogos/eventos/db/records.json";
    let table = '';
    let i = 0;
    let evento = '';
    let elem = document.getElementById('result');
    var spinner = document.getElementById("spinner");
    spinner.style.display = 'block';
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        for(var key in data)
        {
            table += '<tr>'
            if(data[key]['nombre'] !== null)
            {
                i++

                table += '<td>'+i+'</td>'
                table += '<td>'+data[key]['nombre']+'</td>'
                table += '<td>'+data[key]['apellido']+'</td>'
                table += '<td>'+data[key]['celular']+'</td>'
                table += '<td>'+data[key]['dni']+'</td>'
                table += '<td>'+data[key]['email']+'</td>'
                table += '<td>no</td>'
                if(data[key]['evento'] == 1){
                    evento = '18:00 hs'
                }else{
                    evento = '20:00 hs'
                }
                table += '<td>'+evento+'</td>'
                table += '</tr>'
            }
        }
        setTimeout(function(){
            spinner.style.display = 'none';
            elem.innerHTML = table;
        },1500)
    })
}

export default Listado;