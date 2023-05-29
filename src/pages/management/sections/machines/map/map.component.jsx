import './map.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faMapLocation } from '@fortawesome/free-solid-svg-icons';

const Map = ({className}) => {
  useEffect(() => {
    setTimeout(() => {
      var map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      L.polyline([
        [51.505, -0.09],
        [51.5, -0.1],
        [51.49, -0.1],
      ], { color: 'orange' }).addTo(map);

      map.getContainer().style.filter = 'grayscale(100%) contrast(70%) brightness(130%)';
    }, 0);
  }, []);

  return <div className={`map-container ${className}`}>
    <div className='header'><p> <FontAwesomeIcon icon={faMapLocation}></FontAwesomeIcon> Machine's Location</p></div>
    <div id="map"></div>
  </div>
};

export default Map;
