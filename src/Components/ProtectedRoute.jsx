import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import { storage } from '../utils/storage';

export const ProtectedRoute = ({ children, redirectTo = "/admin/login" }) => {
  const {user} = useAuth()
  const location = useLocation();
  const userStorage = storage.get('user')
  //  console.log('context', user)
  //  console.log('storage', userStorage)
  //
  return user && user.token || userStorage && userStorage.token ? (
    children ? children : <Outlet />
  ): (
    <Navigate to= { redirectTo } replace state={{ from: location}} />
  );
}