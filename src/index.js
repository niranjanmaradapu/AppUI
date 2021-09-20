
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// For requests
axios.interceptors.request.use(
   (req) => {
      document.body.classList.add('loading-indicator');
      const token = JSON.parse(sessionStorage.getItem('token'));
      req.headers.Authorization = 'Bearer' + ' ' + token;
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
      document.body.classList.remove('loading-indicator');
      // if (res.data && res.data.statusCode === 200) {
      //    console.log('Posted Successfully');
      // } else {
      //    toast.error(res.data.body);
      // }
      return res;
   },
   (err) => {
      toast.error("Something Went Wrong");
      document.body.classList.remove('loading-indicator');
      return Promise.reject(err);
   }
);
ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
    
  </React.StrictMode>,
  document.getElementById('root')
);


