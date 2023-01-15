import React from "react";
import {
    HashRouter,
    Routes,
    Route
  } from "react-router-dom";
import Welcome from './Welcome/Welcome';
import Register from './Register/Register';
import Login from './Login/Login';
import Eventos from './Eventos/Eventos';
import Cuenta from './Cuenta/Cuenta';
import Gracias from './Gracias/Gracias';

export default function App() {
    return (
      <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/cuenta" element={<Cuenta />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path='/' element={<Welcome />} />
          </Routes>
      </HashRouter>
    );
  }