
import './App.scss';
import Login from './components/login/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from './shared/layout/Layout';

function App() {
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
       </Switch>
       </Router>
  );
}

export default App;
