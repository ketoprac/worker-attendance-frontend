import React, {useState, useEffect} from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
import Button from "../../components/Button";
import Map from "../../components/Map";
import Navbar from "../../components/Navbar";
import styles from "./AttendanceMap.module.css";
import axios from "axios";

const AttendanceMap = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const API_KEY = "AIzaSyDgofvac-Kp97jLBU7pJZVLkXqL0nIZJo8";
  const location = useGeoLocation();
  
  useEffect(() => {
    async function fetchLocation(){
      try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=-6.4024844, 106.7942405&key=${API_KEY}`);
        console.log(res.data.results[0].formatted_address);
        const address = res.data.results[1].formatted_address;
        setCurrentLocation(address);
      } catch (err) {
        console.log(err);
      }
    }

    console.log(currentLocation);
    fetchLocation();
  }, [])

  
  

  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <div className={styles.location__container}>
      <h3>Clock In</h3>
      <div className={styles.location__card}>
        <h3>Office Location</h3>
        <p>Jl. MH. Thamrin No. 69, Jakarta Selatan, DKI Jakarta</p>
        <p>Latitude and Longitude</p>
      </div>
      <div className={styles.location__card}>
        <h3>Your Location</h3>
        <p>{currentLocation}</p>
        <p>{location.loaded ? Object.values(location.coordinates.lat + ", " + location.coordinates.lng) : "Location data not available yet"}</p>
      </div>
      <div className={styles.map__container}>
        <p>You are in Office Area, now you are allowed to Clock In</p>
      </div>
        <Button variant="primary block" title="Clock In" />
      </div>
    </div>
    </>
  )
}

export default AttendanceMap;
