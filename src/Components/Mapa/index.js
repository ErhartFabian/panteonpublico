import React from 'react';
import './css/index.css';
import MapView from './react-leaflet.js';
import BusquedaMapa from './BusquedaMapa.js'
import * as serviceWorker from './serviceWorker';

function Mapa() {

  return (
    <>
      <div className="container-mapa">
        <BusquedaMapa className="form-mapa" />
        <MapView className="mapa"/>
      </div>
    </>
)}
serviceWorker.unregister();

export default Mapa;