import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login/Login';
import reportWebVitals from './reportWebVitals';
//bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
//Animate
import "../node_modules/animate.css/animate.css";
//Fontawesome
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import Register from './components/Register/Register';
//react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
/*   <React.StrictMode> */
    <Register />
/*   </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
