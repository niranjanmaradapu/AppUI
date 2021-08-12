import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import logosm from "../../assets/images/logo_01.svg";
import list from "../../assets/images/all_modules.svg";
import arrow from "../../assets/images/circle_arrow.svg";
import deliveryslip from "../../assets/images/create_delivery_slip.svg";
import sale from "../../assets/images/sale.svg";
import promo from "../../assets/images/promo.svg";
import returnslip from "../../assets/images/return_slip.svg";
import addcustomer from "../../assets/images/create_customer.svg";
import tagcustomer from "../../assets/images/tag_customer.svg";
import dayclose from "../../assets/images/close.svg";

class Sidebar extends Component {
    
     
    newSale = () => {
        this.props.history.push("newsale");
    }
    createDeliverySlip = () => {
        this.props.history.push("createdeliveryslip");
    }
    promoExchange = () => {
        this.props.history.push("promoitemexchange");
    }
    render() {
        return (
            <div className="">
                <div className="sidebar-logo text-center">
                <img src={logosm}/>
                </div>
            <div className="sidebar-menu">
                <ul>
                    <li>
                        <img src={list} /><span>All Modules</span> <img src={arrow} />
                    </li>
                     <li className="active" onClick={this.createDeliverySlip}>
                        <img src={deliveryslip} /><span>Create Delivery Slip</span>
                    </li>
                    <li className="" onClick={this.newSale}>
                        <img src={sale} /><span>New Sale</span>
                    </li>
                    <li className=""  onClick={this.promoExchange}>
                        <img src={promo} /><span>Promo Item Exchange</span>
                    </li>
                    <li className="">
                        <img src={returnslip} /><span>Generate Return Slip</span>
                    </li>
                    <li className="">
                        <img src={addcustomer} /><span>Create Customer</span>
                    </li>
                    <li className="">
                        <img src={tagcustomer} /><span>Tag Customer to GV</span>
                    </li>
                    <li className="">
                        <img src={dayclose} /><span>POS Day Close</span>
                    </li>
                </ul>
            </div>
               
            </div>
        )
    }
}
export default withRouter(Sidebar);
