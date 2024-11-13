
//pk.eyJ1IjoiamFjb2J5ZWUiLCJhIjoiY20yM2cxeG9qMDViNzJxcHNrMDl0eDhrNSJ9.64obJH6vBfs70H6SL31XHw

import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup,NavigationControl, GeolocateControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import toilet_icon from '../Components/Assets/potty.png';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';// new
import mapboxgl from 'mapbox-gl';
import { auth } from "../firebaseConfig";
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
  const Account_email = auth.currentUser.email;
  const handleClick = () =>{
        console.log("bath id:", selectedToilet.location_identity);
        navigate('/leavereview', {state: {bathroomID: selectedToilet.location_identity}});
        return selectedToilet;
  };
  
  //toggles the favorite for the user
  const handleFavorite = async () =>{
    console.log("email:", auth.currentUser.email);
    console.log("bath id:", selectedToilet.location_identity);

    try{
      const Account_email = auth.currentUser.email;
      const bathroomID = selectedToilet.location_identity;
      //check if exists already
      console.log('checkpoint 0');
      const checkResponse = await axios.get("http://localhost:8000/favorites/",{
        params: {
          user_email: Account_email,
          bathroom_keyval: bathroomID
        }
      });
      console.log('checkpoint 1');
      console.log(checkResponse.data);
       //add if not exists
      if(checkResponse.data == false){
        console.log('checkpoint 2');
        const response = await axios.post("http://localhost:8000/favorites/",{        
        user_email: Account_email,
        bathroom_keyval: bathroomID
      });
      console.log("made a favorite");
      console.log(response.data);}

      // delete because it already is favorite
      if(checkResponse.data == true){
        console.log('checkpoint 3')
        const deleteResponse = await axios.delete("http://localhost:8000/favorites/",{
          params: {
            user_email: Account_email,
            bathroom_keyval: bathroomID
          }
        });
        console.log("removed from favorites");
        console.log(deleteResponse.data);
      }
    }catch(error){
      console.log("an error has occured");
    }
  }

  
  //constants
  const [selectedToilet, setSelectedToilet] = useState(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationMarked, setLocationMarked] = useState(false);
  const [bathrooms, setBathrooms] = useState([]);
  const [clickedLocation, setClickedLocation] = useState(null);//new
  const [route, setRoute] = useState(null); //new
  const [Filters, setFilters] = useState('all');

  
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

    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/
                ${userLocation.longitude},
                ${userLocation.latitude};
                ${clickedLocation.longitude},
                ${clickedLocation.latitude}?access_token=${key}`

    //its not showing the line on the map but it is working, fix later.
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

  const handleChangeFilter = async(e) =>{
    const newFiltersVal = e.target.value
    console.log("currently in", Filters)
    setFilters(newFiltersVal)

    setBathrooms([])
    if(newFiltersVal == "all"){
      axios.get("http://localhost:8000/locations/")
      .then((response) => {
        console.log("Fetched location data:", response.data);
        setBathrooms(response.data);
      })
      .catch((error) =>{
        console.error("Error fetching location data:", error);
      });
      console.log("Changing to All")
    }
    if(newFiltersVal == 'favorites'){
      const response = await axios.get("http://localhost:8000/UserFavorites/",{
        params: {
          user_email: Account_email,
        },
      });
      setBathrooms(response.data)
      console.log("Changing to Favorites")
    }
    if(newFiltersVal == 'preferences'){
      const response = await axios.get("http://localhost:8000/users/preferences/",{
        params: {
          user_email: Account_email,
        },
      });
      setBathrooms(response.data)
      console.log("Changing to user's preferences")
    }
  }

  useEffect(() => {
      setBathrooms([])
      axios.get("http://localhost:8000/locations/")
        .then((response) => {
          console.log("Fetched location data:", response.data);
          setBathrooms(response.data);
        })
        .catch((error) =>{
          console.error("Error fetching location data:", error);
        });
        console.log("Setting to All")
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

  //CSS for the dropdown menu
  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
  };
  //style for the block
  const preferencesStyle = {
    position: 'absolute',
    top: '250px',
    left: '20px',
    width: '200px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };
  const selectStyle = {
    width: '100%',
    padding: '5px',
    fontSize: '16px',
  };

  return (
    <div style={{ width: "100%", height: "75vh", zIndex: 0}}> 
    <div
      id="geocoder-container"
      style={{
        position: "absolute",
        top: "15%",     //the top and left are the ones that say where the bar goes
        left: "0%",       
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
        //initialize geocoder only after the map has loaded
        initializeGeocoder(mapRef); 
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
        style={{width: '50px', height: '50px', cursor: 'pointer'}}
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
     <div style={preferencesStyle}>
      <label style={labelStyle}>
          <select value={Filters} onChange={(e) => handleChangeFilter(e)} style={selectStyle}>
            <option value="all">All</option>
            <option value="favorites">Favorites</option>
            <option value="preferences">Preferences</option>
          </select>
        </label>
      </div>
    </div>

  );
};


export default Map;
