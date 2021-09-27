import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import Button from "./components/Button";
import Avatar from "./assets/images/avatar.jpg";
import Navbar from "./components/Navbar";
import Clock from "react-live-clock";
import "moment-timezone";
import "react-moment";
import useGeoLocation from "./hooks/useGeoLocation";
import Map from "./components/Map";

function App() {
  // const officeLocation = {
  //   address: '1600 Amphitheatre Parkway, Mountain View, california.',
  //   lat: 37.42216,
  //   lng: -122.08427,
  // }
  const [attendances, setAttendances] = useState([]);
  const location = useGeoLocation();
  const URL =
    "https://worker-attendance-app-default-rtdb.asia-southeast1.firebasedatabase.app/absence.json";

  useEffect(() => {
    async function fetchAttendances() {
      try {
        // const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const res = await axios.get(URL);

        console.log(res.data);
        setAttendances(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAttendances();
  }, []);

  const [clock, setClock] = useState(false);

  // console.log(Object.values(attendances));
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
        status: "Clock in",
        day,
        hours,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setClock(true);
  };

  const clockOut = () => {
    axios
      .post(URL, {
        nik: "12345678",
        nama: "John Doe",
        status: "Clock out",
        day,
        hours,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setClock(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.attendance__container}>
          <div className={styles.profile__container}>
            <div className={styles.avatar__container}>
              <img className={styles.avatar} src={Avatar} alt="Profile" />
            </div>
            <div className={styles.name__container}>
              <h3 className={styles.profile__name}>John Doe</h3>
              <p className={styles.profile__role}>Frontend Developer</p>
            </div>
          </div>
          <div className={styles.clock__container}>
            <header>
              <h1>
                {/* Live Clock */}
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} />
              </h1>
              <h4>{day}</h4>
            </header>
            <h3>09:00 AM - 05:00 PM</h3>
            <p>Office Hours</p>
            <p>Your Location</p>
            <p>{location.loaded ? JSON.stringify(location.coordinates) : "Location data not available yet"}</p>
            <Map location={location} zoomLevel={17} />
            <p>Office Location</p>
            <p>Jl. MH. Thamrin No. 69, Jakarta Selatan, DKI Jakarta</p>
            <Button
              onClick={() => clockIn()}
              variant={clock ? "disabled" : null}
              title="Clock in"
            />
            <Button
              onClick={() => clockOut()}
              variant={clock ? null : "disabled"}
              title="Clock out"
            />
          </div>
          <div className={styles.today__container}>
            <ul>
              <h3>Attendance History</h3>
              {Object.values(attendances).map((attendance, index) => (
                <li key={index}>
                  <h4 className={styles.status}>{attendance.status}</h4>
                  <h4>{attendance.day} {attendance.hours}</h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
