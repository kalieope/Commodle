//pk.eyJ1IjoiamFjb2J5ZWUiLCJhIjoiY20yM2cxeG9qMDViNzJxcHNrMDl0eDhrNSJ9.64obJH6vBfs70H6SL31XHw

import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import bathrooms from './markerTest.json';
import toilet_icon from './toilet.png';

const Map = () => {

    //initial map
  const [viewPort, setViewport] = useState({
    latitude: 32.526204537278296,
    longitude: -92.64369263529309,
    zoom: 18,
  });


  const [selectedToilet, setSelectedToilet] = useState(null);

  return (
    <div style={{ width: "100%", height: "75vh", zIndex: 999}}> 
      <ReactMapGL
      {...viewPort}
      mapboxAccessToken='pk.eyJ1IjoiamFjb2J5ZWUiLCJhIjoiY20yM2cxeG9qMDViNzJxcHNrMDl0eDhrNSJ9.64obJH6vBfs70H6SL31XHw
'
      width='100%'
      height='100%'
      mapStyle={"mapbox://styles/mapbox/standard"}
      onMove={(evt) => setViewport(evt.viewState)}
    //Allows to move around map
      onViewportChange={(viewPort)=>setViewport(viewPort)}
      >

    {bathrooms.features.map((restroom) =>(
        <Marker key={restroom.properties.ID} 
            latitude={restroom.properties.Coordinates[1]}
            longitude={restroom.properties.Coordinates[0]}>
            
            <button class="marker-btn" onClick={(e) => {
                e.preventDefault();
                setSelectedToilet(restroom);
            }}>
                <img src={toilet_icon}
                    alt='Toilet' />
            </button>
        </Marker>
    ))}

    {selectedToilet ? (
        <Popup latitude={selectedToilet.properties.Coordinates[1]} 
                longitude={selectedToilet.properties.Coordinates[0]}
                onClose={() => setSelectedToilet(null)}>
            <div>Toilet</div>
        </Popup>
    ) : null}
    
      </ReactMapGL>
    </div>
  );
};

export default Map;
