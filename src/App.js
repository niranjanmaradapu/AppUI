import React, { useEffect } from "react";
import './App.scss';
import Login from './components/login/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from './shared/layout/Layout';
import RetailLayout from "./shared/retail-layout/RetailLayout";
import ElectronicsLayout from "./shared/electronics-layout/ElectronicsLayout";

const App = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  return (
    <Router>
       <Route exact path="/">
         <Login />
       </Route>
    <Switch>
 
       <Route path="/createdeliveryslip">
         <Layout  />
       </Route>
       <Route path="/newsale">
         <Layout />
       </Route>
       <Route path="/promoitemexchange">
         <Layout />
       </Route>
       <Route path="/generatereturnslip">
         <Layout />
       </Route>
       <Route path="/createcustomer">
         <Layout />
       </Route>
       <Route path="/tagcustomer">
         <Layout />
       </Route>
       <Route path="/posdayclose">
         <Layout />
       </Route>
       <Route path="/salereport">
         <Layout />
       </Route>
       <Route path="/listofsalebills">
         <Layout />
       </Route>
       <Route path="/listofdeliveryslips">
         <Layout />
       </Route>
       <Route path="/listofreturnslips">
         <Layout />
       </Route>
       <Route path="/retail">
         <RetailLayout />
       </Route>
       <Route path="/electronics">
         <ElectronicsLayout />
       </Route>
       </Switch>
       </Router>
  );
}

export default App;
