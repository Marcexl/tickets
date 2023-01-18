import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const {user} = useAuth()
  console.log(user)
    if(!user){
        return <Navigate to= { redirectTo } />
    }
  return children ? children : <Outlet />
}
