import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { QrReader } from 'react-qr-reader';
import { acreditarPersona, savePersona } from '../../../utils/FetchToAPI';
import { AcreditadoForm } from './AcreditadoForm';
import { useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

export const AcreditarQr = ({setShowDni, idEvento}) => {

  const [qr, setQr] = useState(false)
  const [dataQr, setDataQr] = useState('')
  const [dataPersona, setDataPersona] = useState(null)
  const [error, setError] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [timer, setTimer] = useState(null)
  const [sent, setSent] = useState(false)
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')
  

  const handleResults = (result, error) => {
    setError(false)
    setDataQr('')

    if (!!result) {
      setDataQr(result?.text);
      setQr(false)
    }

    if (!!error) {
      console.info(error);
    }
  }
  // useEffect(() => {
  //   if(dataQr.length > 70){
  //     const string = dataQr.slice(0, -1)
  //     const dni = string.replace(/[^0-9]+/g, "");
  //     const idEvento = 3;
  //     const data = {
  //       idEvento,
  //       dni
  //     }
  //     acreditarPersona(data)
  //       .then(response => setDataPersona(response))
  //       .catch(error => setError(true))
  //   }

  // }, [dataQr])

  const acreditar = async (data) => {
    
    const {nombre, apellido, dni, fechaNac} = data;
    setLoader(true)
    try{
    const response = await acreditarPersona({idEvento, dni })
    setLoader(false)
    setSent(true)
    if(response){
      if(response.status == 'error'){//si da error la guardo como una nueva persona
        const data = {
          nombre,
          apellido,
          dni,
          evento : {
            id : idEvento
          },
          fechaNacimiento : fechaNac,
          verificado : 1
        }
        console.log(data)
        setLoader(true)
        setSent(true)
        const res = await savePersona(data)
        if(res){
          setDataPersona(dataQr)
        }else{
          setError(true)
        }
        setLoader(false)
      }else{
        setDataPersona(response.data)
        setLoader(false)
      }
      //setMessage(response.message)
    }
  }catch{
    setError(true)
    setMessage("Ocurrio un error al intentar acreditar.")
    setLoader(false)
  }
  }

  const getData = async () => {
    var  nombre = ''
    var  apellido = ''
    var  dni = ''
    var  sexo = ''
    var  fechaNac = ''
    let data = inputValue.split('@');
    if( data.length == 8 ||  data.length == 9 ) {
      // Formato nuevo
      apellido = data[1].trim()
      nombre   = data[2].trim()
      sexo     = data[3].trim()
      dni      = data[4].trim()
      fechaNac = data[6].trim()
  
    } else if (data.length == 15) {
      // Formato anterior
      apellido = data[4].trim()
      nombre   = data[5].trim()
      sexo     = data[8].trim()
      dni      = data[1].trim()
      fechaNac = data[7].trim()
    } else {
      // Formato NO identificado
      throw "formato no identificado."
    }
    const newData = {apellido, nombre, dni, fechaNac }
    setDataQr(newData)
    acreditar(newData)

}

  const handleChange = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  const handleSubmit = async () => {
    setError(false)
    
    if(idEvento < 1){
      setError(true)
      setMessage("Debe seleccionar un evento.")
      setSent(true)
      return null;
    }
    await getData(inputValue)
  }

  const volver = () => {
    setShowDni(true)
  }


  return (
    <>
      {loader && <Spinner /> }
      {dataPersona === null || dataPersona == '' || dataPersona == {} ?
      <>
      <Card.Title className="mt-3">Acreditar con QR</Card.Title>
      <Card.Body>
        <Form >
          {qr && (<QrReader
                constraints={{facingMode: 'environment'}}
                onResult={ handleResults }
                style={{ width: '100%' }}
            />) }
          <Form.Control
            autoFocus={true}
            placeholder='Leer QR'
            type="text"
            onChange={ handleChange }
            />
            {error && <Alert variant='danger' style={{display: 'block'}}>{message ? message : 'Ocurrio un Error al intentar acreditar'}</Alert>}
          {/* <Button onClick={() => setQr(true)}>Abrir Camara</Button> */}
          <Button type='Submit' onClick={ handleSubmit }>Enviar</Button>
          <Button onClick={ volver } className="btn-secondary">Acreditar con DNI</Button>
        </Form>
      </Card.Body>
    </>
    :
    <>
        <AcreditadoForm props={dataPersona} />
        <br />
        <Button type='submit' onClick={setDataPersona(null)}>Continuar Acreditando</Button>
    </>
    }

    </>
  )
}
