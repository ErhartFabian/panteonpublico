import L from 'leaflet';
import icon from './dist/images/marker-icon.png';
import iconShadow from './dist/images/marker-shadow.png';

export const MarkerIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});