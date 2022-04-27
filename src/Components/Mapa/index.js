import React from "react";
import './Mapa.css';
import Leaflet from 'leaflet';


function Mapa() {
    let map = Leaflet.map('map').setView([0, 0], 0);
    return (
        <React.Fragment>
            <div id="map">
                {map}
            </div>
        </React.Fragment>
    )
}

export default Mapa;