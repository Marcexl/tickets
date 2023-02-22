import { useAuth } from "../context/AuthContext";
import { storage } from "./storage";


const getToken = async () => {
  const user = await storage.get('user')
  const token = user !== null ? user.token : '';
  return token
}

const login = async (data) => {
  const url = 'https://localhost:3001/auth/login'
  const url2 = 'https://www.sgiar.org.ar:3001/auth/login'
  const url3 = 'http://192.168.0.101:8080/auth/login'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

const acreditarPersona = async (data) => {
  const url = "https://localhost:3001/ticket/event/acreditate";
  const url2 = "https://www.sgiar.org.ar:3001/ticket/event/acreditate";
  const url3 = 'http://192.168.0.101:8080/ticket/event/acreditate'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken()
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

const savePersona = async (data) => {
  const url = "https://localhost:3001/ticket/save";
  const url2 = "https://www.sgiar.org.ar:3001/ticket/save";
  const url3 = `http://192.168.0.101:8080/ticket/save`

  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getToken()
    },
    body: JSON.stringify(data)
  })
  return response.json()
}



const listadoPorEvento = async (idEvento) => {

  const url = `https://localhost:3001/ticket/getAll/evento/${idEvento}`;
  const url2 = `https://www.sgiar.org.ar:3001/ticket/getAll/evento/${idEvento}`;
    const url3 = `http://192.168.0.101:8080/ticket/getAll/evento/${idEvento}`


  try{
    const response = await fetch(url, {
      headers: {Authorization: await getToken()}
    })
    return response.json()
  }catch{
    return null
  }
}

const getEventosActivos = async () => {
  const url = `https://localhost:3001/eventos`;
  const url2 = `https://www.sgiar.org.ar:3001/eventos`;
  const url3 = 'http://192.168.0.101:8080/eventos'


  try{
    const response = await fetch(url, {
      headers: {Authorization: await getToken()}
    })
    return response.json()
  }catch{
    throw new Error ('Error al intentar obtener eventos')
  }
}

const newEvento = async (data) => {
  const url = `https://localhost:3001/eventos/save`;
  const url2 = `https://www.sgiar.org.ar:3001/eventos/save`;
    const url3 = 'http://192.168.0.101:8080/auth/login'


  try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await getToken()
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }catch{
    throw new Error ('Error al intentar grabar nuevo evento')
  }

}

const acreditarDrive = async (data) => {
  const { dni, idEvento } = data;
  const url = `https://script.google.com/macros/s/AKfycbwmcBPqqlg0RHnDlO-MZ8g3u7iLIXx6E7xWaLmiGQA0omrSIPIvPVqPEKfuXmXHH-Hx/exec?dni=${dni}&idEvento=${idEvento}`;
  try{
    const response = await fetch(url)
    return response.json()
  }catch{
    throw new Error ('Error al intentar grabar nuevo evento')
  }
}


export {acreditarPersona, login, listadoPorEvento, getEventosActivos, newEvento, acreditarDrive, savePersona}