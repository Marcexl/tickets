import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Welcome from './Welcome/Welcome';
import Register from './Register/Register';
import Login from './Login/Login';
import Eventos from './Eventos/Eventos';
import Cuenta from './Cuenta/Cuenta';

export default function App() {
    return (
      <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/cuenta" element={<Cuenta />} />
            <Route path='/' element={<Welcome />} />
          </Routes>
      </Router>
    );
  }