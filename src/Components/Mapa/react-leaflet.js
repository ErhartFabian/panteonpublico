import React, { Component, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import './dist/leaflet.css';
import { MarkerIcon } from './react-leaflet-icon.js';

class MapView extends Component {
  handleChange(e){
    this.state.map.flyTo(this.props.fosa.coordenadas, 10);
  }

  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
      zoom: 12,
      map: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <MapContainer whenCreated={map => this.setState({ map })} center={[20.1281, -98.76437]} zoom={17} style={{
        position: "relative",
        minWidth: "700px",
        width: "45%",
        aspectRatio: "1 / .7"
      }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={this.props.fosa.coordenadas} icon={MarkerIcon} onChange={this.handleChange}>
          <Popup>
            Cuartel: {this.props.fosa.cuartel} Lote: {this.props.fosa.lote} Clase: {this.props.fosa.clase} Fosa: {this.props.fosa.fosa}
          </Popup>
      </Marker>
      </MapContainer>
    );
  }
}

export default MapView;