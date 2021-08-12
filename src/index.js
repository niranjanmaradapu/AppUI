
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';


// For requests
axios.interceptors.request.use(
   (req) => {
  //  document.body.classList.add('loading-indicator');
      req.headers.Authorization ="PK12345678"
      console.log("Request to server:::::::::::::::::::");
      return req;
   },
   (err) => {
      return Promise.reject(err);
   }
);

// For response
axios.interceptors.response.use(
   (res) => {
      // Add configurations here
     // document.body.classList.remove('loading-indicator');
      console.log("Response from server:::::::::::::::::::")
      if (res.status === 201) {
         console.log('Posted Successfully');
      }
      return res;
   },
   (err) => {
      return Promise.reject(err);
   }
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


