import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/login';
import Inicio from './components/inicio';
import Registro from './components/registro.jsx'
import Inventario from './components/inventario.jsx'
import Calendario from './components/calendario.jsx'

function App() {
  return (
    <div className="App">
   
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={ <Login />}/>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/calendario" element={<Calendario />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
