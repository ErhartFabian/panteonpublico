import React from 'react';
import './index.css';
import MapView from './react-leaflet.js';
import * as serviceWorker from './serviceWorker';

function Mapa() {

  return (
      <div className="mapa">
          <MapView />
      </div>
  )
}
serviceWorker.unregister();

export default Mapa;