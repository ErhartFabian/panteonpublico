import React from 'react';
import './css/index.css';
import MapView from './react-leaflet.js';
import BusquedaMapa from './BusquedaMapa.js'
import * as serviceWorker from './serviceWorker';

function Mapa() {

  return (
    <div className="pantalla">
      <div className="Busqueda">
        <BusquedaMapa />
      </div>
      <div className="mapa">
        <MapView />
      </div>
    </div>
  )
}
serviceWorker.unregister();

export default Mapa;