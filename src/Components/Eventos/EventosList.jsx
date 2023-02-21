import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { getEventosActivos } from '../../utils/FetchToAPI';

export const EventosList = ({setIdEvento}) => {

    const [eventos, setEventos] = useState(null)

    useEffect(() => {
        const getEventos = async () => {
          const eventos = await getEventosActivos()
          eventos && setEventos(eventos)
        }
        getEventos()
    }, [])
    

    return (
            <Form.Select  onChange={ (e) => setIdEvento(e.target.value) } aria-label="Default select example">
                <option value={0}>Seleccione evento</option>
                {
                    eventos && eventos.map((e) => {
                        return <option key={e.id} value={e.id}>{e.nombre} {e.horaEvento.slice(0, -3)}hs. ({e.diaEvento})</option>
                    })
                }
            </Form.Select>
    )
}
