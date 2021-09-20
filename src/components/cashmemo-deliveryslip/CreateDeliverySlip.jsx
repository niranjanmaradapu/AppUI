import React, { Component } from 'react';
import barcodebig from "../../assets/images/barcode_big.svg";
import add from "../../assets/images/add_btn.svg";
import midiblue from "../../assets/images/midi_blue.svg";
import midibluenew from "../../assets/images/midi_bluenew.svg";
import mididress from "../../assets/images/midi_dress.svg";
import saree from "../../assets/images/saree.svg";
import deleterecord from "../../assets/images/delete.svg";
import { BASE_URL } from '../../commonUtils/Base';
import { CREATE_DELIVERY_SLIP_URL } from '../../commonUtils/ApiConstants';
import axios from 'axios';
import CreateDeliveryService from '../../services/CreateDeliveryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';



export default class CeateDeliverySlip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barCode: '',
            smNumber: '',
            dsNumber: '',
            qunatity: 1,    
            itemsList: [],
            barList: [],
            isSMDisable: false,
            isDeliveryCreated: false,
            btnDisable: true,
            isRemember: true,
            mrpAmount: 0,
            promoDisc: 0,
            totalAmount: 0,
            type: '',
            isQuantity: true,
            selectedType: {
                value:"Pieces",
                label:"Pieces"
            },
            typesList: [
                {
                    value:"Pieces",
                    label:"Pieces"
                },
                {
                    value:"Meters",
                    label:"Meters"
                },

            ],
            dropValue: '',
        }
        //  this.getDeliverySlips();
        this.createDeliverySlip = this.createDeliverySlip.bind(this);
        this.remberSalesMan = this.remberSalesMan.bind(this);
        this.checkPromo = this.checkPromo.bind(this);
        //  this.deleteTableRow = this.deleteTableRow.bind(this);
    }

    getDeliverySlips = (e) => {
        this.setState({type : this.state.selectedType.label})
        let mrp = 0;
        let promo = 0;
        let total = 0;
        if (e.key === 'Enter') {
            if (this.state.barCode && this.state.smNumber) {
                CreateDeliveryService.getBarCodeList(this.state.barCode, this.state.smNumber).then((res) => {
                    if (res.data && res.data.statusCodeValue === 200) {
                        this.state.itemsList.push(res.data.body);
                        if (this.state.itemsList.length > 1) {
                            // const barList = this.state.itemsList.filter((test, index, array) =>
                            //     index === array.findIndex((findTest) =>
                            //         findTest.barcode === test.barcode
                            //     )
                            // );
                            // this.setState({ itemsList: barList });
                            // this.setState({ barList: barList });

                            for(let i=0; i<this.state.itemsList.length-1; i++ ) {
                                
                                if(this.state.itemsList[i].barcode === this.state.itemsList[i+1].barcode) {
                                    this.state.itemsList.splice(i,1);
                                    toast.info("Barcode already entered");
                                   
                                    break;
                                }
                            }


                            // for(let i=0; i<this.state.itemsList.length-1; i++ ) {

                            //     for(let j=1; j<=i; j++) {
                            //         if(this.state.itemsList[i].barcode === this.state.itemsList[j].barcode) {
                            //             toast.info("Barcode already entered");
                            //             this.state.itemsList.splice(i,1);
                            //            // break;
                            //         }
                            //     }
                                
                               
                            // }
                        }
                        if (this.state.itemsList.length > 1) {
                            this.state.itemsList.forEach(element => {
                                mrp = mrp + element.mrp;
                                this.setState({ mrpAmount: mrp });
                                promo = promo + element.promoDisc;
                                this.setState({ promoDisc: promo });
                                total = total + element.netAmount;
                                this.setState({ totalAmount: total })
                            });
                        } else {
                            this.setState({ mrpAmount: this.state.itemsList[0].mrp });
                            this.setState({ promoDisc: this.state.itemsList[0].promoDisc });
                            this.setState({ totalAmount: this.state.itemsList[0].netAmount });
                        }

                        this.setState({ barList: this.state.itemsList });
                        this.setState({ barCode: '' });
                        // this.setState({ itemsList: items.data });
                        this.setState({ btnDisable: false });
                        this.setState({ isDeliveryCreated: false });

                        console.log(this.state.barList);



                    } else {
                        toast.error(res.data.body);
                    }
                });
            } else {
                toast.info('Please enter Barcode / SM number');
            }
        }


    }

    remberSalesMan(e) {
        if (e.target.checked) {
            if (this.state.smNumber) {
                //  this.setState({isSMDisable: true});
                this.setState({ isRemember: true });
            } else {
                toast.info("Please Enter SM number");
                this.setState({ isRemember: false });
            }
        } else {
            // this.setState({isSMDisable: false});
            this.setState({ isRemember: false });
        }
    }

    createDeliverySlip() {
        sessionStorage.removeItem('recentDS');
        const obj = {

            qty: this.state.qunatity,

            type: this.state.type,

            salesMan: this.state.smNumber,

            barcode: this.state.barList

        }
        CreateDeliveryService.createDeliverySlip(obj, this.state.type).then((res) => {

            if (res.data.statusCode === "OK") {

                this.setState({ dsNumber: res.data.body.number });

                toast.success(res.data.body.message);
                sessionStorage.setItem('recentDS',res.data.body.message);
                this.setState({
                    barCode: '',
                    smNumber: '',
                    barList: [],
                    itemsList: []

                });
               
            } else {
                toast.error(res.data.body);
            }

        });
    }
    checkPromo() {
        this.setState({ btnDisable: true });
        this.setState({ isDeliveryCreated: true });
        console.log("check promo clicked")
    }
    renderTableData() {
        return this.state.barList.map((items, index) => {
            const { itemDesc, mrp, promoDisc, netAmount } = items
            return (
                <tr key={index} >
                    <td>{itemDesc}</td>
                    <td>{mrp}</td>
                    <td>{"New Year Sale"}</td>
                    <td>{promoDisc}</td>
                    <td>{netAmount}</td>
                </tr>
            )
        });
    }
    renderDeliveryNumber() {
        return this.state.isDeliveryCreated && (
            <div className="rect-head" >
                <div className="col p-l-3 pt-1 p-r-3 pb-3 text-right">
                <button className="btn-nobdr" type="button" onClick={this.createDeliverySlip}>
                    <img src={add} /> <span className="create">Create [Crl + 2]</span></button>
                    </div>
                {/* <ul>
                <li>DC Number  : <span className="font-bold pl-3">{this.state.dsNumber}</span></li>
                <li><img src={barcodebig} /></li>
                <li></li>
            </ul> */}
            </div>
        )
    }

    renderTableDetails() {
        return this.state.barList.length > 0 && (

            <div>
                <h5 className="mt-4">Total Scanned Items:{this.state.barList.length}</h5>
                <div className="rect p-0 pb-3 pt-2" >
                    {this.renderDeliveryNumber()}
                    {/* <div className="rect-head" >
                         <ul>
                             <li>DC Number  : <span className="font-bold pl-3">788 788 90123</span></li>
                             <li><img src={barcodebig} /></li>
                             <li><button className="btn-nobdr" type="button" onClick={this.createDeliverySlip}>
                                 <img src={add} /> <span>Create [Crl + 2]</span></button></li>
                         </ul>
                     </div> */}
                    <div>
                        {this.renderDivData()}
                    </div>
                    <div className="rect-cardblue">
                        <div className="row">
                            <div className="col-3 text-center">
                                <h6 className="pt-3">TOTAL</h6>
                            </div>

                            <div className="col-2">
                                <label>MRP</label>
                                <h6>{this.state.mrpAmount} ₹</h6>
                            </div>
                            <div className="col-3">
                                <label>Promo Discount</label>
                                <h6>{this.state.promoDisc} ₹</h6>
                            </div>
                            <div className="col-2 text-right pt-2 p-r-4">
                                <h6 className="fs-20">{this.state.totalAmount} ₹</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderDivData() {
        return this.state.barList.map((items, index) => {
            const { itemDesc, mrp, promoDisc, netAmount } = items
            return (
                <div className="rect-card mt-4" key={index}>
                    <div className="row">
                        <div className="col-1">
                            <img src={midiblue} />
                        </div>
                        <div className="col-2">
                            <h6 className="mb-0 mt-1">{itemDesc}</h6>
                            <label>Single Unit</label>
                        </div>
                        <div className="col-1">
                            <label>MRP</label>
                            <h6>{mrp} ₹</h6>
                        </div>
                        <div className="col-1">
                            <label>Qty</label>
                            <h6>1 </h6>
                        </div>
                        <div className="col-2">
                            <label>Discount Type</label>
                            <h6>New Year Sale</h6>
                        </div>
                        <div className="col-2">
                            <label>Promo Discount</label>
                            <h6>{promoDisc} ₹</h6>
                        </div>
                        <div className="col-1">
                            <label>Total</label>
                            <h6>{netAmount} ₹</h6>
                        </div>
                        <div className="col-2 text-right pt-2 p-r-4" onClick={(e) => {
                            console.log(index);
                            this.state.itemsList.splice(index, 1);
                            this.setState({ barList: this.state.itemsList });
                            this.calculateTotal();
                        }} >
                            <img src={deleterecord} />
                        </div>
                    </div>
                </div>

            )
        });



    }

    calculateTotal() {
        let mrp = 0;
        let promo = 0;
        let total = 0;
        this.state.itemsList.forEach(element => {
            mrp = mrp + element.mrp;
            this.setState({ mrpAmount: mrp });
            promo = promo + element.promoDisc;
            this.setState({ promoDisc: promo });
            total = total + element.netAmount;
            this.setState({ totalAmount: total })
        });
    }

    //  deleteTableRow(e,index) {
    //      console.log("Delete", index);
    //    //  this.state.itemsList.splice(index, 1);
    //  //   this.setState({barList: this.state.itemsList})
    //  }

    handleChange=(e)=>{
        this.setState({ dropValue: e.label });
        this.setState({ selectedType: e });
        this.setState({type: e.label})
        if(e.label == "Meters") {
            this.setState({isQuantity: false});
        } else {
            this.setState({isQuantity: true, qunatity:1});
            
        }
        
    }


    render() {
        return (
            <div className="maincontent">
                <h5>Create Delivery Slip</h5>
                <div className="rect">
                    <div className="row">
                        <div className="col-3 sele">
                            <div className="form-group">
                            {/* <select className="form-control" onChange={(e) => {
                                this.setState({ type : e.target.value });
                                if(this.state.type == "Meters") {
                                    this.setState({isQuantity: false});
                                }
                        }}>
                                    <option value="Pieces">Pieces</option>
                                    <option value="Meters">Meters</option>
                                </select> */}

                                <Select className="upper-case" placeholder="Select"
                                    value={this.state.selectedType} // set selected value
                                    options={this.state.typesList} // set list of the data
                                    onChange={this.handleChange}// assign onChange function
                                />

                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                {/* <input type="text" className="form-control" name="barCode" value={this.state.barCode} onKeyPress={this.getDeliverySlips}
                                 placeholder="Barcode [Crtl + 1]"/> */}
                                <input type="text" name="barCode" className="form-control" autoFocus value={this.state.barCode}
                                    onChange={(e) => this.setState({ barCode: e.target.value })} autoComplete="off" 
                                    onKeyPress={this.getDeliverySlips} placeholder="Barcode [Crtl + 1]" />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.smNumber}
                                    onKeyPress={this.getDeliverySlips}
                                    placeholder="SM Number" onChange={(e) => this.setState({ smNumber: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <input type="number" className="form-control" value={this.state.qunatity} 
                                    onChange={(e) => this.setState({ qunatity: e.target.value })}
                                disabled={this.state.isQuantity}
                                    placeholder="Quantity" />
                            </div>
                        </div>
                        <div className="col-3 pt-3">
                            <div className="form-group">
                            {/* className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden' */}
                                {/* <input type="number" className="form-control" placeholder="Check Promo Discount [Ctrl + 3]"/> */}
                                <button className={"btn-login btn-create" + (this.state.btnDisable? ' btn-disable': '')} disabled={this.state.btnDisable} onClick={this.checkPromo} >Check Promo Discount </button>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="custom-control custom-checkbox V1_checkbox-label mt-3">
                                <input className="custom-control-input" type="checkbox" id="remember"
                                    checked={this.state.isRemember}
                                    onChange={this.remberSalesMan}
                                />
                                <label className="custom-control-label V1_custom-control-label p-t-0 fs-14 p-l-3"
                                    htmlFor="remember"  >Remember Sales Man</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {this.renderTableDetails()}
                    {/* <h5 className="mt-4">Total Scanned Items</h5> */}
                    {/* <div className="rect p-0 pb-3" >
                    <div className="rect-head">
                        <ul>
                            <li>DC Number  : <span className="font-bold pl-3">788 788 90123</span></li>
                            <li><img src={barcodebig} /></li>  
                            <li><button className="btn-nobdr" type="button" onClick={this.createDeliverySlip}>
                                <img src={add} /> <span>Create [Crl + 2]</span></button></li>
                        </ul>
                    </div>
                    <div>
                        {this.renderDivData()}
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
                                             
                    </div> */}
                </div>

                {/* <ToastContainer /> */}
            </div>

        )

    }
}
