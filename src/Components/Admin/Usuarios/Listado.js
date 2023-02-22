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
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { listadoPorEvento } from '../../../utils/FetchToAPI';


export const Listado = () =>{
    const [tickets, setTickets] = useState(null);

    const getListado = async (idEvento) => {
        const data = await listadoPorEvento(idEvento)
        data !== null && setTickets(data)
    }

    useEffect(() => {
        getListado(6)
    }, [])

    return (
        <>
        <Nabvar />
        {tickets === null ? <GlobalSpinner/> :
            <Container className='container-login'>
                <Row>
                    <Col className='col-login'>
                        <Card className="card-login">
                        <ReactHTMLTableToExcel
                        id="download-button"
                        className="download-button"
                        table="listado-final"
                        filename="listado"
                        sheet="tablexls"
                        buttonText="Download Excel File"/>
                        <Table striped bordered hover id="listado-final">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Celular</th>
                                <th>DNI</th>
                                <th>Barrio</th>
                                <th>Email</th>
                                <th>Acreditado</th>
                                {/* <th>Evento</th> */}
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
                                                <td>{ticket.barrioLocalidad}</td>
                                                <td>{ticket.mail}</td>
                                                <td>{ticket.verificado === 0 ? 'No' : 'Si'}</td>
                                                {/* <td>{ticket.evento.nombre}</td> */}
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