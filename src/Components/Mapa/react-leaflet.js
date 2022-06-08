import React, { Component } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MarkerIcon } from './react-leaflet-icon.js';

class MapView extends Component {
  handleClick(e){
    this.setState({ currentLocation: e.latlng });
  }
  
  handleChange(e){
    e.flyTo(this.props.fosa.coordenadas);
  }

  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 38.71, lng: -0.48 },
      zoom: 12,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <MapContainer center={[20.1281, -98.76437]} zoom={17} onClick={this.handleClick} onChange={this.handleChange} style={{
        position: "relative",
        minWidth: "700px",
        width: "45%",
        aspectRatio: "1 / .7"
      }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={this.props.fosa.coordenadas} icon={MarkerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
      </Marker>
      </MapContainer>
    );
  }
}

export default MapView;