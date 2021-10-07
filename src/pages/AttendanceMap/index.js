import React, {useState, useEffect} from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
import Button from "../../components/Button";
import Map from "../../components/Map";
import Navbar from "../../components/Navbar";
import styles from "./AttendanceMap.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const AttendanceMap = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [allow, setAllow] = useState(false);
  const [distance, setDistance] = useState("");
  const officeLocation = {
    lat: -6.399494, 
    lng: 106.821583,
    address: "Jl. Griya Lembah Timur 2 No.10, RW.24, Abadijaya, Sukmajaya, Depok City, West Java 16417"
  }
  const API_KEY = "AIzaSyDgofvac-Kp97jLBU7pJZVLkXqL0nIZJo8";
  const location = useGeoLocation();
  const URL =
    "https://worker-attendance-app-default-rtdb.asia-southeast1.firebasedatabase.app/attendance.json";
  
  useEffect(() => {
    async function fetchLocation(){
      try {
        // const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=-6.4024844, 106.7942405&key=${API_KEY}`);
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coordinates.lat + " " + location.coordinates.lng}&key=${API_KEY}`);
        console.log(res.data.results[0].formatted_address);
        const address = res.data.results[1].formatted_address;
        setCurrentLocation(address);
      } catch (err) {
        console.log(err);
      }
    }

    // async function checkDistance() {
    //   try {
    //     const res = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${officeLocation.lat + "," + officeLocation.lng}&destinations=${location.coordinates.lat + "," + location.coordinates.lng}&key=${API_KEY}`);
    //     console.log(res)
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }


    console.log(currentLocation);
    fetchLocation();
    // checkDistance();

  }, [location])

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const day =
    days[today.getDay()] +
    ", " +
    today.getDate() +
    " " +
    months[today.getMonth()] +
    " " +
    today.getFullYear();
  const hours = today.getHours() + ":" + today.getMinutes();

  const clockIn = () => {
    axios
      .post(URL, { 
        nik: "12345678",
        nama: "John Doe",
        clock: true,
        day,
        hours,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.location__container}>
      <h3>Clock In</h3>
      <div className={styles.location__card}>
        <h3>Office Location</h3>
        <p>{officeLocation.address}</p>
        <p>{officeLocation.lat + " " + officeLocation.lng}</p>
      </div>
      <div className={styles.location__card}>
        <h3>Your Location</h3>
        <p>{currentLocation}</p>
        <p>{location.loaded ? Object.values(location.coordinates.lat + ", " + location.coordinates.lng) : "Location data not available yet"}</p>
      </div>
      <div className={styles.map__container}>
        <p>You are in Office Area, now you are allowed to Clock In</p>
      </div>
        <Link exact to="/" ><Button onClick={() => clockIn()} variant="primary block" title="Clock In" /></Link>
      </div>
    </div>
    </>
  )
}

export default AttendanceMap;
