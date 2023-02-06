import React from 'react';
import Nabvar from '../Menu/Menu';
import GlobalSpinner from '../../Spinner/Spinner';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './listado.css';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


export const Listado = () =>{
    const [tickets, setTickets] = useState(null)
    
    const getListado = (idEvento) => {
        const url = `https://www.sgiar.org.ar:3001/ticket/getAll/evento/${idEvento}`;

        fetch(url)
            .then(response => response.json())
            .then(data => setTickets(data));
            }

    useEffect(() => {
        getListado(3)
    }, [])
    

    return (
        <>
        <Nabvar />
        {tickets === null ? <Spinner animation="border" variant="secondary"/> :
            <Container className='container-login'>
                <Row>
                    <Col className='col-login'>
                        <Card className="card-login">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-button"
                            table="listado-final"
                            filename="listado14feb"
                            sheet="tablexls"
                            buttonText="Download as XLS"/>
                        <Table striped bordered hover id="listado-final">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Celular</th>
                                <th>DNI</th>
                                <th>Email</th>
                                <th>Region</th>
                                <th>Han</th>
                                <th>Verificado</th>
                                <th>Evento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tickets !== null &&
                                    tickets.map((ticket, index) => (
                                            <tr>
                                                <td>{index}</td>
                                                <td>{ticket.nombre}</td>
                                                <td>{ticket.apellido}</td>
                                                <td>{ticket.celular}</td>
                                                <td>{ticket.dni}</td>
                                                <td>{ticket.mail}</td>
                                                <td>{ticket.region}</td>
                                                <td>{ticket.han}</td>
                                                <td>{ticket.verificado === 0 ? 'No' : 'Si'}</td>
                                                <td>{ticket.evento.nombre}</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        }
        </>
    )
}