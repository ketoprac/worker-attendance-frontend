import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import AttendanceMap from './components/AttendanceMap';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Login /> */}
    {/* <AttendanceMap /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
