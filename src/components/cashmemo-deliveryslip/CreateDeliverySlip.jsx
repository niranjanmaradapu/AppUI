import React, { Component } from 'react';
import barcodebig from "../../assets/images/barcode_big.svg";
import add from "../../assets/images/add_btn.svg";
import midiblue from "../../assets/images/midi_blue.svg";
import midibluenew from "../../assets/images/midi_bluenew.svg";
import mididress from "../../assets/images/midi_dress.svg";
import saree from "../../assets/images/saree.svg";
import deleterecord from "../../assets/images/delete.svg";

export default class CeateDeliverySlip extends Component {
    constructor(props){
        super(props)
        // console.log(props);
    }
    render() {
        return (
            <div className="maincontent">
                <h5>Create Delivery Slip</h5>
                <div className="rect">
                    <div className="row">
                        <div className="col-3">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Barcode [Crtl + 1]"/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="SM Number"/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="Quantity"/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                {/* <input type="number" className="form-control" placeholder="Check Promo Discount [Ctrl + 3]"/> */}
                                <button  className="btn-login btn-create"  >Check Promo Discount </button>
                            </div>
                        </div>
                        <div className="col-3">
                        <div className="custom-control custom-checkbox V1_checkbox-label mt-3">
                        <input className="custom-control-input" type="checkbox" id="remember"/>
                        <label className="custom-control-label V1_custom-control-label p-t-0 fs-14 p-l-3"
                            htmlFor="remember">Remember Sales Man</label>
                    </div>
                        </div>
                    </div>
                </div>
                <h5 className="mt-4">Total Scanned Items</h5>
                <div className="rect p-0 pb-3">
                    <div className="rect-head">
                        <ul>
                            <li>DC Number  : <span className="font-bold pl-3">788 788 90123</span></li>
                            <li><img src={barcodebig} /></li>  
                            <li><button className="btn-nobdr" type="button"><img src={add} /> <span>Create [Crl + 2]</span></button></li>
                        </ul>
                    </div>
                    <div className="rect-card mt-4">
                        <div className="row">
                            <div className="col-1">
                                <img src={midiblue} />
                            </div>
                            <div className="col-2">
                                <h6 className="mb-0 mt-1">strawberry-midi-dress</h6>
                                <label>Single Unit</label>
                            </div>
                            <div className="col-1">
                                <label>MRP</label>
                                <h6>1800 ₹</h6>
                            </div>
                            <div className="col-1">
                                <label>Prices</label>
                                <h6>1 </h6>
                            </div>
                            <div className="col-2">
                                <label>Discount Type</label>
                                <h6>New Year Sale</h6>
                            </div>
                            <div className="col-2">
                                <label>Promo Discount</label>
                                <h6>400 ₹</h6>
                            </div>
                            <div className="col-1">
                                <label>Total</label>
                                <h6>400 ₹</h6>
                            </div>
                            <div className="col-2 text-right pt-2 p-r-4">
                                <img src={deleterecord} />
                            </div>
                        </div>
                    </div>
                    <div className="rect-card">
                        <div className="row">
                            <div className="col-1">
                                <img src={midibluenew} />
                            </div>
                            <div className="col-2">
                                <h6 className="mb-0 mt-1">strawberry-midi-dress</h6>
                                <label>Single Unit</label>
                            </div>
                            <div className="col-1">
                                <label>MRP</label>
                                <h6>1800 ₹</h6>
                            </div>
                            <div className="col-1">
                                <label>Prices</label>
                                <h6>1 </h6>
                            </div>
                            <div className="col-2">
                                <label>Discount Type</label>
                                <h6>New Year Sale</h6>
                            </div>
                            <div className="col-2">
                                <label>Promo Discount</label>
                                <h6>400 ₹</h6>
                            </div>
                            <div className="col-1">
                                <label>Total</label>
                                <h6>400 ₹</h6>
                            </div>
                            <div className="col-2 text-right pt-2 p-r-4">
                                <img src={deleterecord} />
                            </div>
                        </div>
                    </div>
                    <div className="rect-card">
                        <div className="row">
                            <div className="col-1">
                                <img src={mididress} />
                            </div>
                            <div className="col-2">
                                <h6 className="mb-0 mt-1">strawberry-midi-dress</h6>
                                <label>Single Unit</label>
                            </div>
                            <div className="col-1">
                                <label>MRP</label>
                                <h6>1800 ₹</h6>
                            </div>
                            <div className="col-1">
                                <label>Prices</label>
                                <h6>1 </h6>
                            </div>
                            <div className="col-2">
                                <label>Discount Type</label>
                                <h6>New Year Sale</h6>
                            </div>
                            <div className="col-2">
                                <label>Promo Discount</label>
                                <h6>400 ₹</h6>
                            </div>
                            <div className="col-1">
                                <label>Total</label>
                                <h6>400 ₹</h6>
                            </div>
                            <div className="col-2 text-right pt-2 p-r-4">
                                <img src={deleterecord} />
                            </div>
                        </div>
                    </div>
                    <div className="rect-card">
                        <div className="row">
                            <div className="col-1">
                                <img src={saree} />
                            </div>
                            <div className="col-2">
                                <h6 className="mb-0 mt-1">strawberry-midi-dress</h6>
                                <label>Single Unit</label>
                            </div>
                            <div className="col-1">
                                <label>MRP</label>
                                <h6>1800 ₹</h6>
                            </div>
                            <div className="col-1">
                                <label>Prices</label>
                                <h6>1 </h6>
                            </div>
                            <div className="col-2">
                                <label>Discount Type</label>
                                <h6>New Year Sale</h6>
                            </div>
                            <div className="col-2">
                                <label>Promo Discount</label>
                                <h6>400 ₹</h6>
                            </div>
                            <div className="col-1">
                                <label>Total</label>
                                <h6>400 ₹</h6>
                            </div>
                            <div className="col-2 text-right pt-2 p-r-4">
                                <img src={deleterecord} />
                            </div>
                        </div>
                    </div>
                    <div className="rect-cardblue">
                        <div className="row">
                            <div className="col-3 text-center">
                               <h6 className="pt-3">TOTAL</h6>
                            </div>
                        
                            <div className="col-2">
                                <label>MRP</label>
                                <h6>9300 ₹</h6>
                            </div>
                            <div className="col-3">
                                <label>Promo Discount</label>
                                <h6>1900 ₹</h6>
                            </div>
                            <div className="col-2 text-right pt-2 p-r-4">
                                  <h6 className="fs-20">5,400 ₹</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
