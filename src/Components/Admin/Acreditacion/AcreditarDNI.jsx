import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { acreditarPersona, savePersona } from '../../../utils/FetchToAPI';
import { AcreditadoForm } from './AcreditadoForm';
import { Alert, Spinner } from 'react-bootstrap';

export const AcreditarDNI = ({setShowQr, idEvento}) => {

  const [dniData, setDniData] = useState('')
  const [dataPersona, setDataPersona] = useState(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loader, setLoader] = useState(false)
  const [nombreApellido, setNombreApellido] = useState('')
  const [grabar, setGrabar] = useState(false)
  const [barrio, setBarrio] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    setSent(false)
    setError(false)
    const data = {
      idEvento,
      dni : dniData
    }
    if(idEvento < 1){
      setError(true)
      setMessage("Debe seleccionar un evento.")
      setSent(true)
      return null;
    }
    if(nombreApellido !== ''){
      const data = {
        nombre : nombreApellido,
        localidadBarrio : barrio,
        dni : dniData,
        evento : {
          id : idEvento
        },
        verificado : 1
      }
      setLoader(true)
      const response = await savePersona(data)
      setLoader(false)
      if(response){
        setMessage("Persona acreditada correctamente.")
        setDataPersona(response)
      }else{
        setError(true)
        setMessage("No se pudo acreditar a la persona")
      }
      setSent(true)
    }else{
      try{
        
        setLoader(true)
        const response = await acreditarPersona(data)
        setLoader(false)
        setSent(true)
        if(response){
          if(response.status == 'error'){
            setError(true)
            if(response.code == '01'){
              setMessage(response.message)
              return null;
            }else{
              setGrabar(true)
            }
          }else{
            setDataPersona(response.data)
          }
          setMessage(response.message)
        }
      }catch{
        setError(true)
        setMessage("Ocurrio un error al intentar acreditar.")
      }
    }
  }

  const volver = () => {
    setShowQr(true)
  }


  return (
    <>
      {loader && <Spinner /> }
        {dataPersona === null || dataPersona === '' ?
          <>
            <Card.Title className="mt-3">Acreditar con DNI</Card.Title>
            <Card.Body className='dni-acreditar'>
              <Form onSubmit={ handleSubmit }>
                <Form.Control
                  required
                  autoFocus={true}
                  onFocus={() => setSent(false)}
                  placeholder='Ingrese DNI'
                  type="number"
                  onChange={(e) => setDniData(e.target.value) & setSent(false)}
                  />
                  {grabar && 
                  <>
                  <Form.Control
                  placeholder='Ingrese Nombre y Apellido'
                  type="text"
                  onChange={(e) => setNombreApellido(e.target.value) & setSent(false)}
                  />
                  <Form.Control
                  placeholder='Ingrese Barrio o localidad'
                  type="text"
                  onChange={(e) => setBarrio(e.target.value) & setSent(false)}
                  />
                  </>
                  
                  }
                  {sent && <Alert variant={error ? 'danger' : 'success'} style={{display: 'block'}}> { message } </Alert>}
                <Button type='submit'>Enviar</Button>
                <Button onClick={ volver } className="btn-secondary">Acreditar con QR</Button>
              </Form>
            </Card.Body>
          </>
            :
          <>
            <AcreditadoForm props={dataPersona}/>
            <br />
            <Button onClick={() => setDataPersona(null) & setNombreApellido('') & setBarrio('') & setGrabar(false)} >Continuar Acreditando</Button>
          </>
        }
      
    </>
  )
}
