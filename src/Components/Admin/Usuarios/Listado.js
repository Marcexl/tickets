import React from 'react';
import Nabvar from '../Menu/Menu';
import GlobalSpinner from '../../Spinner/Spinner';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './listado.css';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export const Listado = () =>{
    const [tickets, setTickets] = useState(null)

    const columns = [
        {
            name: "Nombre",
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: "Apellido",
            selector: row => row.apellido,
            sortable: true,
        },
        {
            name: "Celular",
            selector: row => row.celular,
        },
        {
            name: "Dni",
            selector: row => row.dni,
        },
        {
            name: "Email",
            selector: row => row.mail,
            sortable: true,
        },
        {
            name: "Region",
            selector: row => row.region,
            sortable: true,
        },
        {
            name: "Han",
            selector: row => row.han,
        },
        {
            name: "Verificado",
            selector: row => row.verificado,
            sortable: true,
        },
        {
            name: "Evento",
            selector: row => row.evento.id,
            sortable: true,
        }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const customStyles = {
        headCells: {
            style: {
                background: '#ff9800',
                position: 'sticky'
            }
        },
    };
    
    const getListado = (idEvento) => {
        const url = `https://www.sgiar.org.ar:3001/ticket/getAll/evento/${idEvento}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTickets(data);
            });
        }

    useEffect(() => {
        getListado(3)
    }, [])
    

    return (
        <>
        <Nabvar />
        {tickets === null ? <GlobalSpinner /> :
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
                        <DataTable
                            id="listado-final"
                            className='dataTable'
                            columns={columns}
                            data={tickets}
                            pagination paginationComponentOptions={paginationComponentOptions}
                            customStyles={customStyles}
                        />
                        </Card>
                    </Col>
                </Row>
            </Container>
         }
        </>
    )
}