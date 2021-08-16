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
import cashmemo from "../../assets/images/cash_memo.svg";
import bigarrow from "../../assets/images/arrow_big_left.svg";
import arrow_sm from "../../assets/images/arrow_sm.svg";
import notes from "../../assets/images/notes.svg";
import notesadd from "../../assets/images/notes_add.svg";
import Transfers from "../../assets/images/transfer.svg";
import stock from "../../assets/images/stock.svg";
import Rebarcoading from "../../assets/images/rebarcoading.svg";
import audits from "../../assets/images/audit.svg";
import ecommerce from "../../assets/images/ecommerce.svg";
import masters from "../../assets/images/management.svg";
import pramotions from "../../assets/images/pramotions.svg";
import loyalty from "../../assets/images/loyalty_promo.svg";
import users from "../../assets/images/user_privileges.svg";
import reports from "../../assets/images/chart.svg";
import r_brand from "../../assets/images/r_brand.svg";
import Hsn from "../../assets/images/hsn.svg";

class Sidebar extends Component {
    
     constructor(props){
         super(props)
         this.state={
            slideValue:"slide-in"
         }
     }
    newSale = () => {
        this.props.history.push("newsale");
    }
    createDeliverySlip = () => {
        this.props.history.push("createdeliveryslip");
    }
    promoExchange = () => {
        this.props.history.push("promoitemexchange");
    }
    login = () => {
        this.state.slideValue="slide-in"
    }
    slideOut = () => {
        document.body.classList.add('slide');
        // document.body.classList.add('slide');
    }
    render() {
        return (
            <div className="">
                <div className="sidebar-logo text-center">
                <img src={logosm}/>
                </div>
            <div className="sidebar-menu">
                <ul>
                    <li onClick={this.login}>
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
            <div className={this.state.slideValue}>
                <div className="row">
                    <div className="col-6 slide-head">
                        <h6 className="text-blue fs-20 font-bold">List Of Modules</h6>
                    </div>
                    <div className="col-6 text-right slide-head">
                        <button className="btn-transparent" onClick={this.slideOut} type="button"><img src={bigarrow}/></button>
                    </div>
                </div>
                <div className="slide-body">
                    <ul>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>                           
                                <img src={cashmemo} />
                                <h6>Cash Memo & Delivery Slips</h6>
                        </li>
               
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={notes} />
                                <h6>Customer Credit Notes</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={notesadd} />
                                <h6>Customer Debit Notes</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={Transfers} />
                                <h6>Transfers</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>                           
                                <img src={stock} />
                                <h6>Stock</h6>
                        </li>
               
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={Rebarcoading} />
                                <h6>Rebarcoading</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={audits} />
                                <h6>Stock audits</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={ecommerce} />
                                <h6>Ecommerce</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={users} />
                                <h6>Users & privileges</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>                           
                                <img src={masters} />
                                <h6>Manage Masters</h6>
                        </li>
               
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={pramotions} />
                                <h6>Manage Pramotions</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={loyalty} />
                                <h6>Loyalty promo Settings</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={reports} />
                                <h6>Reports</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={r_brand} />
                                <h6>R - Brand</h6>
                        </li>
                        <li>
                                <img className="arrow-align"src={arrow_sm}/>  
                                <img src={Hsn} />
                                <h6>Text & HSN Master</h6>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
            


        )
    }
}
export default withRouter(Sidebar);
