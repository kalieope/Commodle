// HomePage.js
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const mapContainerStyle = {
    width: '75%',
    height: '500px'
}

const center = {
    lat: 32.5262,
    lng: -92.6438
}

const HomePage = () => {
  return (
    <div className='map'>
        <LoadScript googleMapsApiKey="AIzaSyD2XWVThP5_5oarPrfZ6dCpQGzpmZ-Hl3s">
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
        >
        </GoogleMap>
    </LoadScript>
    <div className="page">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <h1>HOME</h1>
            <button type="button">Home button idk</button>
        </div>
    </div>
    </div>  
  );
};

export default HomePage;