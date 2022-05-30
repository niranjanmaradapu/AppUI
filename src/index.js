
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider } from "react-i18next";

import i18n from "../src/commonUtils/i18n";

// For requests
axios.interceptors.request.use(
   (req) => {
      document.body.classList.add('loading-indicator');
      const token = JSON.parse(sessionStorage.getItem('token'));
      if(token !== null){  
         req.headers.Authorization = 'Bearer' + ' ' + token;
      }
      
      console.log("Request to server:::::::::::::::::::");
      return req;
   },
   (err) => {
      return Promise.reject(err);
   }
);

// For response
axios.interceptors.response.use(
   (res ) => {
      if(res&& res.data && (res.data.isSuccess === 'true' || res.data.isSuccess === null||res.data.isSuccess === undefined)){
         document.body.classList.remove('loading-indicator');
         if(res.data.result == null){
            toast.success(res.data.message);
         }
         // if (res.data && res.data.statusCode === 200) {
         //    console.log('Posted Successfully');
         // } else {
         //    toast.error(res.data.body);
         // }
         return res;
      }else{
         document.body.classList.remove('loading-indicator');
         toast.error(res.data.message);
      }
   },
   (err) => {
      toast.error(( err.response &&  err.response.data && err.response.data.message)?err.response.data.message:"Something went Wrong");
      document.body.classList.remove('loading-indicator');
      return Promise.reject(err);
   }
);
ReactDOM.render(
  <React.StrictMode>
     <I18nextProvider i18n={i18n}>
     <App />
     <ToastContainer 
     position="top-right"
     autoClose={3000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover />
     </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


