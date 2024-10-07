import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default center (e.g., New York)

  return (
    <LoadScript googleMapsApiKey="AIzaSyD2XWVThP5_5oarPrfZ6dCpQGzpmZ-Hl3s">
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;