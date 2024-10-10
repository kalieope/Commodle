import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const [viewPort, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 6,
    width: "100vh",
    height: "100vh",

  });



  return (
    <div style={{ width: "100vh", height: "50vh"}}> 
      <ReactMapGL
      {...viewPort}
      mapboxAccessToken='pk.eyJ1IjoiamFjb2J5ZWUiLCJhIjoiY20yM2cxeG9qMDViNzJxcHNrMDl0eDhrNSJ9.64obJH6vBfs70H6SL31XHw'
      width='100%'
      height='100%'
      mapStyle={"mapbox://styles/mapbox/standard"}
      transitionDuration="200"
      >

      </ReactMapGL>
    </div>
  );
};

export default Map;
