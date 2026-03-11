import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './css/react-leaflet.css';
import { MarkerIcon } from './react-leaflet-icon.js';

function FlyToLocation({ coordinates, shouldFly }) {
    const map = useMap();

    useEffect(() => {
        if (shouldFly) {
            map.flyTo(coordinates, map.getZoom(), { animate: true });
        }
    }, [coordinates, map, shouldFly]);

    return null;
}

function MapView({ fosa }) {
    const defaultCenter = [20.1281, -98.76437];
    const hasValidCoordinates = Array.isArray(fosa?.coordenadas)
        && fosa.coordenadas.length === 2
        && Number.isFinite(fosa.coordenadas[0])
        && Number.isFinite(fosa.coordenadas[1])
        && !(fosa.coordenadas[0] === 0 && fosa.coordenadas[1] === 0);
    const markerPosition = hasValidCoordinates ? fosa.coordenadas : defaultCenter;

    return (
        <MapContainer
            center={defaultCenter}
            zoom={17}
            style={{
                position: "relative",
                width: "100%",
                height: "calc(100vh - 85px)",
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={markerPosition} icon={MarkerIcon}>
                <Popup>
                    Cuartel: {fosa?.cuartel} Lote: {fosa?.lote} Clase: {fosa?.clase} Fosa: {fosa?.fosa}
                </Popup>
            </Marker>
            <FlyToLocation coordinates={markerPosition} shouldFly={hasValidCoordinates} />
        </MapContainer>
    );
}

export default MapView;
