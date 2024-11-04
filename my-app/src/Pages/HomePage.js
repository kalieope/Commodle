//pk.eyJ1IjoiamFjb2J5ZWUiLCJhIjoiY20yM2cxeG9qMDViNzJxcHNrMDl0eDhrNSJ9.64obJH6vBfs70H6SL31XHw

import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl,GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import toilet_icon from '../Components/Assets/toilet.png';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from 'mapbox-gl';
import '../index.css';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const key = 'pk.eyJ1IjoiamFjb2J5ZWUiLCJhIjoiY20yM2cxeG9qMDViNzJxcHNrMDl0eDhrNSJ9.64obJH6vBfs70H6SL31XHw'

const Map = () => {

    //initial map
  const [viewPort, setViewport] = useState({
    latitude: 32.526204537278296,
    longitude: -92.64369263529309,
    zoom: 18,
  });

  const navigate = useNavigate();
  const handleClick = () =>{
        navigate('/leavereview', {state: {bathroomID: selectedToilet.location_identity}});
        return selectedToilet;
  };


  const [selectedToilet, setSelectedToilet] = useState(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationMarked, setLocationMarked] = useState(false);
  const [bathrooms, setBathrooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/locations/")
      .then((response) => {
        console.log("Fetched location data:", response.data);
        setBathrooms(response.data);
      })
      .catch((error) =>{
        console.error("Error fetching location data:", error);
      });
  }, []);

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
  }, {});


  const initializeGeocoder = () => {
    if (!mapRef.current) {
      console.log("Map reference is not ready.");
      return;
    }
  
    const geocoder = new MapboxGeocoder({
      accessToken: key,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Search for places",
    });
  
    // Directly append geocoder to the container for testing purposes
    const geocoderContainer = document.getElementById("geocoder-container");
    geocoderContainer.appendChild(geocoder.onAdd(mapRef.current.getMap()));
    console.log("Geocoder successfully appended to container.");
  
    geocoder.on("result", (e) => {
      if (e.result && e.result.geometry && e.result.geometry.center) {
        const { center } = e.result.geometry;
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude: center[1],
          longitude: center[0],
          zoom: 18,
        }));
      } else if (e.result && e.result.bbox) {
        const [minLng, minLat, maxLng, maxLat] = e.result.bbox;
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude: (minLat + maxLat) / 2,
          longitude: (minLng + maxLng) / 2,
          zoom: 12,
        }));
      } else {
        console.error("Geocoder result does not contain a valid center or bbox.");
      }
    });
  };

  const handlePopupClose = () => {
    setSelectedToilet(null);
  };

  function handleFavorite() {
    console.log('made a favorite');
  }
  
  return (
    <div style={{ width: "100%", height: "75vh", zIndex: 0}}> 
    <div
      id="geocoder-container"
      style={{
        position: "absolute",
        top: "25%",     //the top and left are the ones that say where the bar goes
        left: "12%",       
        transform: "translate(-50%, -50%)",
        zIndex: 1, 
        width: "300px",  
        backgroundColor: "transparent",
        padding: "8px",    
        borderRadius: "4px" 
      }}
    ></div>

      <ReactMapGL
      {...viewPort}
      mapboxAccessToken={key}

      width='100%'
      height='90%'
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
    />

    {bathrooms.map((restroom) => (
      <Marker
        key={restroom.location_identity}
        latitude={parseFloat(restroom.lat_val)}
        longitude={parseFloat(restroom.long_val)}
        onClick={() => setSelectedToilet(restroom)}
      >
        <img
        src={toilet_icon}
        alt = "Toilet Marker"
        style={{width: '100px', height: '100px', cursor: 'pointer'}}
        />
      </Marker>
    ))}

    {selectedToilet ? (
        <Popup latitude={parseFloat(selectedToilet.lat_val)} 
                longitude={parseFloat(selectedToilet.long_val)}
                onClose={handlePopupClose}
                closeOnClick={false}
              >
            <div>
              <p>Bathroom name: {selectedToilet.loc_name}</p>
              <p>Description: {selectedToilet.Bathroom_desc}</p>
              <p>Reviews: {selectedToilet.Bathroom_rating}</p>
              <button onClick={handleClick}>Leave Review</button>
              <button onclick={handleFavorite()}>Make it a favorite?</button>
            </div>

        </Popup>
    ) : null}
    
      </ReactMapGL>
    </div>
  );
};


export default Map;
