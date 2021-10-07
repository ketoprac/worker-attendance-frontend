import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainApp from "./pages/MainApp";
import Login from "./pages/Login";
import AttendanceMap from "./pages/AttendanceMap";

function App() {
  return (
    <>
      <Navbar />

      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/main" component={MainApp} />
        <Route path="/attendance" component={AttendanceMap} />
      </Router>
    </>
  );
}

export default App;
