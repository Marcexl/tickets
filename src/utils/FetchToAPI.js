import { useAuth } from "../context/AuthContext";
import { storage } from "./storage";


const user = storage.get('user')
const token = user !== null ? user.token : '';


const login = async (data) => {
  const url = 'https://localhost:3001/auth/login'
  const url2 = 'https://www.sgiar.org.ar:3001/auth/login'
  const response = await fetch(url2, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  storage.set('user', response)
  return response.json()
}



const acreditarPersona = async (data) => {
  const url = "https://localhost:3001/ticket/event/acreditate";
  const url2 = "https://www.sgiar.org.ar:3001/ticket/event/acreditate";
  const response = await fetch(url2, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(data)
  })
  return response.json()
}



const listadoPorEvento = async (idEvento) => {
  
  const url = `https://localhost:3001/ticket/getAll/evento/${idEvento}`;
  const url2 = `https://www.sgiar.org.ar:3001/ticket/getAll/evento/${idEvento}`;
  try{
    const response = await fetch(url2, {
      headers: {Authorization: token}
    })
    return response.json()
  }catch{
    return null
  }

}



export {acreditarPersona, login, listadoPorEvento}