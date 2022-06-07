import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './css/react-leaflet.css';

class MapView extends Component {
  render() {
    return (
      <MapContainer center={[20.1281, -98.76437]} zoom={17} onClick={this.handleClick} style={{
        position: "relative",
        minWidth: "700px",
        width: "45%",
        aspectRatio: "1 / .7"
      }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
      </MapContainer>
    );
  }
}

export default MapView;