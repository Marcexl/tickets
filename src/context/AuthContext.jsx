import { async } from 'q'
import { useContext, createContext, useEffect, useState } from 'react'
import { auth } from '../FirabaseConfig'
import { login } from '../utils/FetchToAPI'
import { storage } from '../utils/storage'

export  const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('There is no auth provider')
    return context
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  //const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)
  const signIn = async (user, pass) => {
    const response = await login({user, pass})
    setUser(response.data)
    storage.set('user', response.data)
    return response
  } 

  const signUp = (email, password)  => auth.createUserWithEmailAndPassword(email, password)
  
  //const logOut = () => auth.signOut()
  const logOut = () => {
    setUser(null)
    storage.remove('user')
  }
    
  // useEffect(() => {
  //   auth.onAuthStateChanged(user => setUser(user))
  // }, [])

  

  return <authContext.Provider value={{ signIn, signUp, logOut, user }}>{ children }</authContext.Provider>
}