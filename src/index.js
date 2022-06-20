import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Navbar} from './Components';
import {FormaContacto} from './Components';
import {Mapa} from './Components';
import InfoPago from './Components/InfoPago/InfoPago';
import Servicios from './Components/Servicios';

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Mapa />} />
      <Route path="/InfoPago" element={<InfoPago/>} />
      <Route path="/Contacto" element={<FormaContacto />} />
      <Route path="/Servicios" element={<Servicios />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
