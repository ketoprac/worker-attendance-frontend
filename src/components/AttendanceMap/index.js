import Map from "../Map";
import Navbar from "../Navbar";
import styles from "./AttendanceMap.module.css";

const AttendanceMap = () => {
  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <h1>Attendance Map Check Page</h1>
      <Map />
    </div>
    </>
  )
}

export default AttendanceMap;
