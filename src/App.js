import React, { useEffect } from "react";
import './App.scss';
import Login from './components/login/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from './shared/layout/Layout';
import RetailLayout from "./shared/retail-layout/RetailLayout";
import ElectronicsLayout from "./shared/electronics-layout/ElectronicsLayout";
// import { withTranslation } from 'react-i18next';

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
       <Route path="/usermanagement">
         <Layout />
       </Route>
       <Route path="/listofPromotions">
         <Layout />
       </Route>
       <Route path="/inventoryList">
         <Layout />
       </Route>
       <Route path="/barcodeList">
         <Layout />
       </Route>
       <Route path="/users">
         <Layout />
       </Route>

       <Route path="/roles">
         <Layout />
       </Route>

       <Route path="/stores">
         <Layout />
       </Route>

       <Route path="/domain">
         <Layout />
       </Route>

       <Route path="/createHSN">
         <Layout />
       </Route>

       <Route path="/createNotes">
         <Layout />
       </Route>

       <Route path="/createTaxMaster">
         <Layout />
       </Route>

       <Route path="/debitNotes">
         <Layout />
       </Route>
       <Route path="/listOfPools">
         <Layout />
       </Route>
       <Route path="/loyaltyPoints">
         <Layout />
       </Route>
       <Route path="/managePromo">
         <Layout />
       </Route>

       <Route path="/hrPortal">
         <Layout />
       </Route>

       <Route path="/accountingDashboard">
         <Layout />
       </Route>

       <Route path="/reportsDashboard">
         <Layout />
       </Route>

       <Route path="/urmDashboard">
         <Layout />
       </Route>

       <Route path="/retail">
         <RetailLayout />
       </Route>
       <Route path="/electronics">
         <ElectronicsLayout />
       </Route>
       <Route path="/dashboard">
         <Layout />
       </Route>


       </Switch>
       </Router>
  );
}

export default App;
