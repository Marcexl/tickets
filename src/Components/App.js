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
import {Listado} from './Admin/Usuarios/Listado';
import { ProtectedRoute } from "./ProtectedRoute";
import Login from './Admin/Login/Login';
import { AuthProvider } from "../context/AuthContext";
import Acreditacion from "./Admin/Acreditacion/Acreditacion";
import { AcreditarDNI } from "./Admin/Acreditacion/AcreditarDNI";
import { EventoForm } from "./Eventos/EventoForm";

export default function App() {
    return (
      <AuthProvider>
        <HashRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/cuenta" element={<Cuenta />} />
              <Route path="/gracias" element={<Gracias />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/register" element={<Register />} />
                <Route path="/acreditacion" element={<Acreditacion />} />
                <Route path="/listado" element={<Listado />} />
                <Route path="/nuevoEvento" element={ <EventoForm />} />
              </Route>
              <Route path='/' element={<Welcome />} />
            </Routes>
        </HashRouter>
      </AuthProvider>
  );
}