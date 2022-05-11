import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Home} from './Components';
import {Navbar} from './Components';
import {Busqueda} from './Components';
import {FormaContacto} from './Components';
import {Mapa} from './Components';
import InfoPago from './Components/InfoPago/InfoPago';
import Comprobante from './Components/InfoPago/Comprobante';
import Boleta from './Components/InfoPago/Boleta';

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/InfoPago" element={<InfoPago/>} />
      <Route path="/Comprobante" element={<Comprobante/>} />
      <Route path="/Busqueda" element={<Busqueda />} />
      <Route path="/Contacto" element={<FormaContacto />} />
      <Route path="/Mapa" element={<Mapa />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
