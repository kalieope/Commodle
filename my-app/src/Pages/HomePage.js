//pk.eyJ1IjoiamFjb2J5ZWUiLCJhIjoiY20yM2cxeG9qMDViNzJxcHNrMDl0eDhrNSJ9.64obJH6vBfs70H6SL31XHw

import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup,NavigationControl,GeolocateControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import toilet_icon from '../Components/Assets/toilet.png';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';// new
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
  
  //toggles the favorite for the user
  const handleFavorite = () =>{
    console.log("made a favorite");
  }
  //constants
  const [selectedToilet, setSelectedToilet] = useState(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationMarked, setLocationMarked] = useState(false);
  const [bathrooms, setBathrooms] = useState([]);
  const [clickedLocation, setClickedLocation] = useState(null);//new
  const [route, setRoute] = useState(null); //new

  //logs the console when the map is clicked
  const handleMapClick = (event) => {
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    setClickedLocation({longitude, latitude});
    console.log('Clicked location: ', longitude, latitude);
    
  }

  //directions part of the map  new
  const getRoute = async (start, end) => {

      // Check if start and end coordinates are valid

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/-122.4194,37.7749;-118.2437,34.0522?geometries=geojson&access_token=YOUR_MAPBOX_ACCESS_TOKEN`;
    
    try {
      const response = await axios.get(url);
      const routeData = response.data.routes[0].geometry;
      setRoute(routeData);
      console.log('its working')
    } catch (error) {
      console.log('its not working')
    }

  };

  //makes a route
  useEffect(() => {
    if (userLocation && clickedLocation) {
      getRoute(userLocation, clickedLocation);
    }
  }, [userLocation, clickedLocation]);

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
      //gets the location data of the click on the map
      onClick={handleMapClick}

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
              <button onClick={handleFavorite}>Make it a favorite?</button>
            </div>

        </Popup>
    ) : null}
    
    //display the root
    {route && (
        <Source id="route" type="geojson" data={{ type: 'Feature', geometry: route }}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              'line-color': '#3b9ddd',
              'line-width': 4,
            }}
          />
        </Source>
      )}

      </ReactMapGL>
    </div>
  );
};


export default Map;
