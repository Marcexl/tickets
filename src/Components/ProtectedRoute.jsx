import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import { storage } from '../utils/storage';

export const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const {user} = useAuth()
  const location = useLocation();
  const userStorage = storage.get('user')
  console.log('user', user)
  console.log('userSt', userStorage)
  return user || userStorage ? (
    children ? children : <Outlet />
  ): (
    <Navigate to= { redirectTo } replace state={{ from: location}} />
  );

  //   if(!user && !userStorage){
  //       return <Navigate to= { redirectTo } />
  //   }
  // return children ? children : <Outlet />
}