import { useContext, createContext, useEffect, useState } from 'react'
import { auth } from '../FirabaseConfig'


export  const authContext = createContext()



export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('There is no auth provider')
    return context
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)

  const signUp = (email, password)  => auth.createUserWithEmailAndPassword(email, password)
    
  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user))

  }, [])


  return <authContext.Provider value={{ signIn, signUp, user }}>{ children }</authContext.Provider>
}