import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from '../../commonUtils/PrivateRoute';
import CeateDeliverySlip from '../../components/cashmemo-deliveryslip/CreateDeliverySlip';
import NewSale from '../../components/cashmemo-deliveryslip/NewSale';
import PromoItemExchange from '../../components/cashmemo-deliveryslip/PromoItemExchange';
import GenerateReturnSlip  from '../../components/cashmemo-deliveryslip/GenerateReturnSlip';
import Login from '../../components/login/Login';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import CreateCustomer from '../../components/cashmemo-deliveryslip/CreateCustomer';
import TagCustomer from '../../components/cashmemo-deliveryslip/TagCustomer';
import SalesReport from '../../components/reports/SalesReport';
import ListOfSaleBills from '../../components/reports/ListOfSaleBills';
import ListOfDeliverySlips from '../../components/reports/ListOfDeliverySlips';
import PosDayClose from '../../components/cashmemo-deliveryslip/PosDayClose';
import ListOfReturnSlips from '../../components/reports/ListOfReturnSlips';



export default class Layout extends Component {
    constructor(props) {
        super(props)
        //console.log("parent",props);
        this.state = {
            styles: {
                contentDiv: {
                    display: "flex",
                },
                headerTitle: 'Cash Memo & Delivery Slips ',
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
//        console.log("USER",JSON.parse(sessionStorage.getItem('user')));
        this.setState({headerTitle: 'Cash Memo & Delivery Slips'});
    }

    handleCallback = (childData) =>{
        this.setState({headerTitle: childData});
    }

    render() {
        return (
            <Router>
                  <div className="w-100">
                      <div className="sidebar">
                        <div className="row">
                      
                                <div className="sidebarBackground">
                                    <Sidebar headerTitle={this.state.headerTitle}  parentCallback = {this.handleCallback} />
                                </div>
                    </div>
                     </div>
                     <div className="header">
                    <div className="row">
                        <Header user = {this.state.userData} headerTitle={this.state.headerTitle} parentCallback = {this.handleCallback} />
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
                                   <PrivateRoute
                                    path='/generatereturnslip'
                                    exact={true}
                                    component={GenerateReturnSlip}

                                />
                                 <PrivateRoute
                                    path='/createcustomer'
                                    exact={true}
                                    component={CreateCustomer}

                                />
                                 <PrivateRoute
                                    path='/tagcustomer'
                                    exact={true}
                                    component={TagCustomer}

                                />
                                  <PrivateRoute
                                    path='/posdayclose'
                                    exact={true}
                                    component={PosDayClose}

                                />
                                 <PrivateRoute
                                    path='/salereport'
                                    exact={true}
                                    component={SalesReport}
                                />
                                 <PrivateRoute
                                    path='/listofsalebills'
                                    exact={true}
                                    component={ListOfSaleBills}
                                />
                                  <PrivateRoute
                                    path='/listofdeliveryslips'
                                    exact={true}
                                    component={ListOfDeliverySlips}
                                />
                                <PrivateRoute
                                    path='/listofreturnslips'
                                    exact={true}
                                    component={ListOfReturnSlips}
                                />
                                <PrivateRoute
                                    path='/listofreturnslips'
                                    exact={true}
                                    component={ListOfReturnSlips}
                                />
                                   <PrivateRoute
                                    path='/listofreturnslips'
                                    exact={true}
                                    component={ListOfReturnSlips}
                                />
                            </Switch>
                        </div>
                    </div>
                    </div>
            
          
                         
              
            </Router>
        )

    }
}
