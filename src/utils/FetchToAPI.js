import { storage } from "./storage";
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const getToken = async () => {
  const user = await storage.get('user')
  const token = user !== null ? user.token : '';
  return token
}

const login = async (data) => {
  console.log(apiEndpoint)
  const apiLogin = `${apiEndpoint}/auth/login`
  const response = await fetch(apiLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

const acreditarPersona = async (data) => {
  const apiAcreditate = `${apiEndpoint}/ticket/event/acreditate`
  const response = await fetch(apiAcreditate, {
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
  const apiGetEventos = `${apiEndpoint}/ticket/getAll/evento/${idEvento}`;
  try{
    const response = await fetch(apiGetEventos, {
      headers: {Authorization: await getToken()}
    })
    return response.json()
  }catch{
    return null
  }
}

const getEventosActivos = async () => {
  const apiEventosActivos = `${apiEndpoint}/eventos`;
  try{
    const response = await fetch(apiEventosActivos, {
      headers: {Authorization: await getToken()}
    })
    return response.json()
  }catch{
    throw new Error ('Error al intentar obtener eventos')
  }
}

const newEvento = async (data) => {
  const apiSaveEventos = `${apiEndpoint}/eventos/save`;
  try{
    const response = await fetch(apiSaveEventos, {
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


export {acreditarPersona, login, listadoPorEvento, getEventosActivos, newEvento}