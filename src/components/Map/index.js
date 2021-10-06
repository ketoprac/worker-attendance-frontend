import React from 'react';
import GoogleMapReact from "google-map-react";
import styles from "./Map.module.css";

const Map = ({ location, zoomLevel }) => {
  // const API_KEY = "AIzaSyB6qSS1b2hTsQEpT-yNXV93X5GtJzoCspM";
  const API_KEY = "AIzaSyDgofvac-Kp97jLBU7pJZVLkXqL0nIZJo8";
  const officeLocation = {
    address: '1600 Amphitheatre Parkway, Mountain View, California.',
    lat: -6.184852814540864, 
    lng: 106.82298469655133
  }

  return (
    <div className={styles.map}>
      <h2 className={styles.mapHeading}>Google Maps Test</h2>

      <div className={styles.googleMap}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={officeLocation}
        defaultZoom={zoomLevel}
      >
        {/* <LocationPin
          lat={officeLocation.lat}
          lng={officeLocation.lng}
          text={officeLocation.address}
        /> */}
      </GoogleMapReact>
    </div>   
    </div>
  )
}

export default Map;
