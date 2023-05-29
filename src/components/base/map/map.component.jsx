import './map.css'
import React, { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load the Bing Map
    const map = new Image();
    map.src = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${40.730610},${-73.935242}/13?mapSize=400,400&key=AmHJ990DkSTmS4VPb8H1qblxx3YJYDi0rZ7UEj1DaEL2I1PJIyxdrgVZgG6tVBhG`;
    mapRef.current.appendChild(map);

    return () => {};
  }, []);

  return <div ref={mapRef} style={{ height: "400px", width: "440px" }} />;
};

export default Map;