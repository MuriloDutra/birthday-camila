import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Router from './router';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "languages/i18n"

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer autoClose={5000} limit={3} />
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
