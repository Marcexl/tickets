import React from "react";
import {
    HashRouter,
    Routes,
    Route
  } from "react-router-dom";
import Welcome from './Welcome/Welcome';
import Register from './Register/Register';
import Eventos from './Eventos/Eventos';
import Cuenta from './Cuenta/Cuenta';
import Gracias from './Gracias/Gracias';
import Listado from './Admin/Usuarios/Listado';
import { ProtectedRoute } from "./ProtectedRoute";
import Login from './Admin/Login/Login';
import Acreditacion from "./Admin/Acreditacion/Acreditacion";
import { AuthProvider } from "../context/AuthContext";

export default function App() {
    return (
      <AuthProvider>
        <HashRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/cuenta" element={<Cuenta />} />
              <Route path="/gracias" element={<Gracias />} />
              <Route path="/acreditacion" element={ 
                  <ProtectedRoute redirectTo="/login" >
                    <Acreditacion />
                  </ProtectedRoute>
                } />
              <Route path="/listado" element={
                <ProtectedRoute redirectTo="/login" >
                  <Listado />
                </ProtectedRoute>
              } />
              <Route path='/' element={<Welcome />} />
            </Routes>
        </HashRouter>
      </AuthProvider>
  );
}