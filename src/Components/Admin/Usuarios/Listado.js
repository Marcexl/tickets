import React from 'react';
import Nabvar from '../Menu/Menu';
import Sidebar from '../Menu/Sidebar';
import Footer from "../Footer";
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
import { EventosList } from "../../Eventos/EventosList";


export const Listado = () =>{
    const [aside, setSidebar] = useState('sidebar')
    const [tickets, setTickets] = useState(null);
    const [idEvento, setIdEvento] = useState(3);
    const [acreditados, setAcreditados] = useState(null);
    const [noAcreditados, setNoAcreditados] = useState(null);

    const getListado = async (idEvento) => {
        const data = await listadoPorEvento(idEvento)
        data !== null && setTickets(data)
        getVerificados(idEvento)
        getNoVerificados(idEvento)
    }

    //get cantidad de verificados
     const getVerificados = async (idEvento) => {
        await fetch('https://www.sgiar.org.ar/dialogos/eventos/fetch/getVerificados.php?idEvento=' + idEvento)
        .then((response) => response.json())
        .then((data) => {
            setAcreditados(data.verificados);
        });
    }

    const getNoVerificados = async (idEvento) => {
        await fetch('https://www.sgiar.org.ar/dialogos/eventos/fetch/getNoVerificados.php?idEvento=' + idEvento)
        .then((response) => response.json())
        .then((data) => {
            setNoAcreditados(data.verificados);
        });
    }

    useEffect(() => {
        getListado(idEvento)
    }, [])

    return (
        <>
        <Nabvar page="Acreditados por Evento"/>
        <Sidebar />
        {tickets === null ? <GlobalSpinner display="block"  /> :
            <Container fluid className={aside}>
                 <Row className="h-1">
                    <Col>
                    <div className="card-admin">
                        <label>Ver listado por evento:</label>
                        <EventosList setIdEvento={setIdEvento} onChange={getListado(idEvento)}/>
                    </div>
                    </Col>
                </Row>
                <Row className="h-2">
                    <Col>
                    <div className="card-admin">
                        <Table striped bordered hover id="listado-final" className='listado'>
                                <thead>
                                    <tr>
                                        <th>Evento</th>
                                        <th>Acreditados</th>
                                        <th>No Acreditados</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>{acreditados}</td>
                                        <td>{noAcreditados}</td>
                                    </tr>
                                </tbody>
                        </Table>
                    </div>
                    </Col>
                </Row>
                <Row className="h-9 row-overflow">
                    <Col>
                    <div className="card-admin-column">
                        <ReactHTMLTableToExcel
                        id="download-button"
                        className="download-button"
                        table="listado-final"
                        filename="listado"
                        sheet="tablexls"
                        buttonText="Download Excel File"/>
                        <Table striped bordered hover id="listado-final" className='listado'>
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
                                                <td>{ticket.verificado === 0 ? 'No' : 'Si'}</td>
                                                <td>{ticket.evento.nombre}</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        }
        </>
    )
}