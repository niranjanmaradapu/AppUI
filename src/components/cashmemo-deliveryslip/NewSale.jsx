import React, { Component } from 'react';
import barcode from "../../assets/images/barcode.svg";

export default class NewSale extends Component {
    constructor(props){
        super(props)
        console.log(props);
    }
    render() {
        return (
            <div className="maincontent">
                <div className="row">
                    <div className="col-6">
                         <h5>Extract Items</h5>
                    </div>
                    <div className="col-6 text-right pb-1">
                        <button type="button" className="btn-save">SAVE PAYMENT [CTL + 9]</button>
                    </div>
                </div>
        
                <div className="rect">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Delivery Slip Number"/>
                                <button className="btn-nobg"><img src={barcode} /></button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter DS Discount"/>
                            </div>
                        </div>
                    
                        <div className="col-2">
                            <div className="form-group">
                                {/* <input type="number" className="form-control" placeholder="Check Promo Discount [Ctrl + 3]"/> */}
                                <button  className="btn-add" >ADD DS </button>
                            </div>
                        </div>
                        {/* <div className="col-3">
                        <div className="custom-control custom-checkbox V1_checkbox-label mt-3">
                        <input className="custom-control-input" type="checkbox" id="remember"/>
                        <label className="custom-control-label V1_custom-control-label p-t-0 fs-14 p-l-3"
                            htmlFor="remember">Remember Sales Man</label>
                    </div>
                        </div> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h5 className="mt-4">Billing Details</h5>
                    </div>
                    <div className="col-6 text-right">
                        <button type="button" className="btn-bdr active m-r-2">TAG CUSTOMER <p>CTL+6</p></button>
                        <button type="button" className="btn-bill">BILL LEVEL DISCOUNT</button>
                    </div>
                
                </div>
                <div className="row">
                    <div className="col-3">
                    <div className="rect p-0 pb-3">
                        <div className="d-flex">
                        <button type="button" className="btn-bdr m-l-2 mt-2">CASH <p>CTL+1</p></button>
                        <button type="button" className="btn-bdr m-l-1 mt-2">CARD <p>CTL+2</p></button>
                        <button type="button" className="btn-bdr m-l-1 mt-2">OTHER PAYMENTS</button>
                        </div>
                        <hr className="mt-3 mb-2" />
                        <div className="p-2">
                        <table className="table table-borderless">
                            <thead>
                            <tr className="row m-0 p-0">
                                <th className="col">Payment Type</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr className="row m-0 p-0">
                                    <td className="col-6">Collected Cash</td>
                                    <td className="col-6 text-right font-bold">₹ 200:00</td>
                                </tr>
                                <tr className="row m-0 p-0">
                                    <td className="col-6">Card-1234</td>
                                    <td className="col-6 text-right font-bold">₹ 200:00</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="rect-grey">
                            <label>Net</label> <span className="font-bold text-right">₹ 200:00</span>
                            <label>Received</label> <span className="font-bold text-right">₹ 200:00</span>
                            <hr className="w-100 mt-2 mb-2"/>
                            <label className="fs-16 font-bold">Balance</label> <span className="fs-16 font-bold text-right">₹ 200:00</span>
                            <hr className="w-100 mt-2 mb-2"/>
                            <label className="text-red">Return Cash</label> <span className="text-red font-bold text-right">₹ 200:00</span>
                        </div>
                        </div>

                    </div>
                    </div>
                    <div className="col-9">
                    <div className="rect p-0 pb-3">
                      <div className="d-flex">
                        <button type="button" className="btn-bdr m-l-2 mt-2">RT SLP <p>CTL+3</p></button>
                        <button type="button" className="btn-bdr m-l-2 mt-2">PKT PENDING <p>CTL+4</p></button>
                        <button type="button" className="btn-bdr m-l-2 mt-2">PKT ADVANCE <p>CTL+5</p></button>
                        <button type="button" className="btn-bdr m-l-1 mt-2 pt-2">PHR GVS</button>
                        <button type="button" className="btn-bdr m-l-2 mt-2 pt-2">LOYALTY POINT</button>
                    </div>   
                    <hr className="mt-3 mb-2" />
                        <div className="p-2">
                        <table className="table table-borderless">
                            <thead>
                            <tr className="row m-0 p-0">
                                <th className="col-1">S.No</th>
                                <th className="col-2">Barcode</th>
                                <th className="col-2">Gross</th>
                                <th className="col-1">Qty</th>
                                <th className="col-2">Promo Disc</th>
                                <th className="col-2">Manual Disc</th>
                                <th className="col-2">Net Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr className="row m-0 p-0">
                                    <td className="col-1">01</td>
                                    <td className="col-2">COA268106</td>
                                    <td className="col-2">₹ 900:00</td>
                                    <td className="col-1">01</td>
                                    <td className="col-2">₹ 70:00</td>
                                    <td className="col-2">₹ 10:00</td>
                                    <td className="col-2">₹ 820:00</td>
                                </tr>
                                <tr className="row m-0 p-0">
                                    <td className="col-1">01</td>
                                    <td className="col-2">COA268106</td>
                                    <td className="col-2">₹ 900:00</td>
                                    <td className="col-1">01</td>
                                    <td className="col-2">₹ 70:00</td>
                                    <td className="col-2">₹ 10:00</td>
                                    <td className="col-2">₹ 820:00</td>
                                </tr>
                                {/* <tr className="row m-0 p-0">
                                    <td className="col-1">01</td>
                                    <td className="col-2">COA268106</td>
                                    <td className="col-2">₹ 900:00</td>
                                    <td className="col-1">01</td>
                                    <td className="col-2">₹ 70:00</td>
                                    <td className="col-2">₹ 10:00</td>
                                    <td className="col-2">₹ 820:00</td>
                                </tr> */}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-5">
                             <div className="rect-grey">
                                 <h6 className="text-blue fs-16 font-bold mb-2">Customer Details</h6>
                                <h6>Name</h6> <p className="font-bold">ASHOK MODDUKURI</p>
                                <hr className="w-100 mt-2 mb-2"/>
                                <h6>Phone Number</h6> <p className="font-bold">+91 9642 949 201</p>
                                <hr className="w-100 mt-2 mb-2"/>
                                <h6>Loyalty Points</h6> <p className="font-bold text-blue">200</p>
                             </div>
                            </div>
                            <div className="col-7">
                            <div className="rect-lightgrey">
                                <label>Gross Amount</label> <span className="font-bold text-right">₹ 600:00</span>
                                <label>Promo Discount</label> <span className="font-bold text-right">₹ 0:00</span>
                                <label>Manual Discount</label> <span className="font-bold text-right">₹ 0:00</span>
                                <hr className="w-100 mt-2 mb-2"/>
                                <label className="fs-16 font-bold text-green">Net Payable</label> <span className="fs-16 text-green font-bold text-right">₹ 600:00</span>
                                <hr className="w-100 mt-2 mb-2"/>
                                <label className="">Return Cash</label> <span className="font-bold text-right">₹ 200:00</span>
                             </div>
                            </div>
                        </div>
                     
                        </div>
                    </div>
                    </div>
                </div>
                
                    </div>
        )
    }
}
