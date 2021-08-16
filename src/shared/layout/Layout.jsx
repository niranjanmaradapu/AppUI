import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from '../../commonUtils/PrivateRoute';
import CeateDeliverySlip from '../../components/cashmemo-deliveryslip/CreateDeliverySlip';
import NewSale from '../../components/cashmemo-deliveryslip/NewSale';
import PromoItemExchange from '../../components/cashmemo-deliveryslip/PromoItemExchange';
import Login from '../../components/login/Login';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';



export default class Layout extends Component {
    constructor(props) {
        super(props)
        // console.log(props);
        this.state = {
            styles: {
                contentDiv: {
                    display: "flex",
                },
                // contentMargin: {
                //     marginLeft: "10px",
                //     width: "100%",
                //     innerHeight: "100%",
                //     marginTop: "10px"
                // },
                



            }
        }

    }
    componentWillMount(){
        this.state.userData=JSON.parse(sessionStorage.getItem('user'));
        console.log(this.state.userData);
    }

    render() {
        return (
            <Router>
                  <div className="w-100">
                      <div className="sidebar">
                        <div className="row">
                      
                                <div className="sidebarBackground">
                                    <Sidebar />
                                </div>
                    </div>
                     </div>
                     <div className="header">
                    <div className="row">
                        <Header user = {this.state.userData} />
                    </div>
                </div>
                     <div className="mainbody">
                        <div style={this.state.styles.contentMargin}>
                            <Switch>
                                <PrivateRoute
                                    path='/createdeliveryslip'
                                    exact={true}
                                    component={CeateDeliverySlip}
                                />
                                <PrivateRoute
                                    path='/newSale'
                                    exact={true}
                                    component={NewSale}
                                />

                                <PrivateRoute
                                    path='/promoitemexchange'
                                    exact={true}
                                    component={PromoItemExchange}

                                />
                            </Switch>
                        </div>
                    </div>
                    </div>
            
          
                         
              
            </Router>
        )

    }
}
