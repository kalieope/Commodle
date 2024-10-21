//pk.eyJ1IjoiamFjb2J5ZWUiLCJhIjoiY20yM2cxeG9qMDViNzJxcHNrMDl0eDhrNSJ9.64obJH6vBfs70H6SL31XHw

import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl,GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import bathrooms from './markerTest.json';
import toilet_icon from './toilet.png';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from 'mapbox-gl';
import './index.css';
const key = 'pk.eyJ1IjoiamFjb2J5ZWUiLCJhIjoiY20yM2cxeG9qMDViNzJxcHNrMDl0eDhrNSJ9.64obJH6vBfs70H6SL31XHw'

const Map = () => {

    //initial map
  const [viewPort, setViewport] = useState({
    latitude: 32.526204537278296,
    longitude: -92.64369263529309,
    zoom: 18,
  });


  const [selectedToilet, setSelectedToilet] = useState(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationMarked, setLocationMarked] = useState(false);

  useEffect(() => {
    // Get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        if(!locationMarked){
        // Move the map to the user's location
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude,
          longitude,
          zoom: 18, // Adjust zoom level as needed
        }));
        setLocationMarked(true);
      }
      });
    } else {
      console.log('Geolocation not available');
    }


  initializeGeocoder(mapRef);
  }, []);


const initializeGeocoder = (mapRef) => {
  if(!mapRef.current){
    console.log("Map reference is not ready.");
    return;
  }
  const geocoder = new MapboxGeocoder({
    accessToken: key,
    mapboxgl: mapboxgl,
    marker: false,
    placeholder: "Search for places",
  });

  const geocoderContainer = document.getElementById("geocoder-container").appendChild(geocoder.onAdd(mapRef.current.getMap()));

  if (geocoderContainer && !geocoderContainer.hasChildNodes()) {
    // Container exists, append the geocoder to it
    geocoderContainer.appendChild(geocoder.onAdd(mapRef.current.getMap()));
    console.log("Geocoder successfully appended to container.");

  } else {
    // Container not found, log an error message
    console.error("Error: Geocoder container not found in the DOM.");
    console.log("container for geocoder not found");
  }

  geocoder.on("result", (e) => {
    if (e.result && e.result.geometry && e.result.geometry.center) {
      const { center } = e.result.geometry; // Extract center if it exists
  
      // Update the map's viewport to the center
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: center[1],  // Mapbox returns [lng, lat], so center[1] is latitude
        longitude: center[0], // center[0] is longitude
        zoom: 18,             // Set a suitable zoom level
      }));
    } else if (e.result && e.result.bbox) {
      // Handle cases where no center is present but a bounding box (bbox) is available
      const [minLng, minLat, maxLng, maxLat] = e.result.bbox;
  
      // Set the viewport to fit the bounding box
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: (minLat + maxLat) / 2, // Calculate the midpoint for latitude
        longitude: (minLng + maxLng) / 2, // Calculate the midpoint for longitude
        zoom: 12, // Adjust zoom as needed based on the result
      }));
    } else {
      console.error("Error: Geocoder result does not contain a valid center or bbox.");
    }
  });
  }
  return (

    <div style={{ width: "100%", height: "75vh", zIndex: 999}}> 

    <div id="geocoder-container" style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}></div>

      <ReactMapGL
      {...viewPort}
      mapboxAccessToken={key}
      width='100%'
      height='100%'
      mapStyle={"mapbox://styles/mapbox/standard"}
      onMove={(evt) => setViewport(evt.viewState)}
    //Allows to move around map
      onViewportChange={(viewPort)=>setViewport(viewPort)}
      ref={mapRef}
      onLoad={() => {
        console.log("Map loaded");
        initializeGeocoder(mapRef); // Initialize geocoder only after the map has loaded
      }}
      >
    
    //nav control
    <NavigationControl style={{right: 10, top: 10}}></NavigationControl>

    //follow the user
    <GeolocateControl 
    positionOptions={{ enableHighAccuracy: true}}
    trackUserLocation={true}
    style={{right: 10, top: 10}}
    ></GeolocateControl>

    

    {bathrooms.features.map((restroom) =>(
        <Marker key={restroom.properties.ID} 
            latitude={restroom.properties.Coordinates[1]}
            longitude={restroom.properties.Coordinates[0]}>
            
            <button class="marker-btn" onClick={(e) => {
                e.preventDefault();
                setSelectedToilet(restroom);
                console.log('opening button')
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
