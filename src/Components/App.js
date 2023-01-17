import React, { useState } from "react";
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
import { ProtectedRoute } from "./ProtectedRoute";
import { Acreditacion } from "./Acreditacion";



export default function App() {

  const [auth, setAuth] = useState(true)
  
    return (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/cuenta" element={<Cuenta />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/acreditacion" element={ 
              <ProtectedRoute
              isAllowed={false}
              redirectTo="/login"
              >
                <Acreditacion />
              </ProtectedRoute>
            } />
            <Route path='/' element={<Welcome />} />
          </Routes>
    );
  }