import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [center, setCenter] = useState({ lat: 32.526352, lng: -92.643687 }); // Default center (e.g., New York)

  return (
  <div className="map">
    <LoadScript googleMapsApiKey="AIzaSyD2XWVThP5_5oarPrfZ6dCpQGzpmZ-Hl3s">
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={center}
        zoom={800}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
    <div className="button">
    <button type="button">I am the Map Button</button>
      </div>
    </div>
    
  );
};

export default MapComponent;