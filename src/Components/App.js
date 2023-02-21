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
import Login from './Admin/Login/Login';
import Acreditacion from "./Admin/Acreditacion/Acreditacion";
import MiCuenta from "./Admin/Account/Account";
import { Listado } from './Admin/Usuarios/Listado';
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import { EventoForm } from "./Eventos/EventoForm";
import Dashboard from "./Admin/Dashboard/Dashboard";

export default function App() {
    return (
      <AuthProvider>
        <HashRouter>
            <Routes>
              <Route path="/admin/login" element={<Login />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/cuenta" element={<Cuenta />} />
              <Route path="/gracias" element={<Gracias />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/account" element={<MiCuenta />} />
                <Route path="/admin/acreditacion" element={<Acreditacion />} />
                <Route path="/admin/listado" element={<Listado />} />
                <Route path="/admin/nuevoEvento" element={ <EventoForm />} />
              </Route>
              <Route path='/' element={<Welcome />} />
            </Routes>
        </HashRouter>
      </AuthProvider>
  );
}