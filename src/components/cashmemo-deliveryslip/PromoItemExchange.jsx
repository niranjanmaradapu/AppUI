import React, { Component } from 'react';
import barcode from "../../assets/images/barcode.svg";
import PromoItemExchangeService from '../../services/PromoItemExchangeService';
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';



export default class PromoItemExchange extends Component {
    constructor(props){
        super(props)
        console.log(props);
        this.state = {
            rtSlip: "",
            rtNumbersList:[],
            selectedNumber: {},
            rtNumbersListData: [],
            dropValue:'',
            isAddDS: true,
            isCard: true,
            dsNumber: "",
            dsDetails:{},
            isBillingDetails: false,
            taxAmount: 0,
            grossAmount: 0,
            totalPromoDisc: 0,
            totalManualDisc: 0,
            netPayableAmount: 0,
            openn: false, 
            collectedCash: 0,
            netAmount: 0,
            recievedAmount:0,
            balAmount:0,
            returnCash: 0,
            payType: "Cash",
            mobileData: {
                address: "",
                altMobileNo: "",
                dob: "",
                gender: "",
                gstNumber: "",
                mobileNumber: "",
                name: "",
                email: "",
             
                },

                address: "",
                altMobileNo: "",
                dob: "",
                gender: "",
               gstNumber: "",
               mobileNumber: "",
               customerName: "",
                customerEmail: "",
                isPayment: true,
                isCash: false,
                selectedRTNumber:{},
    
        }
        this.baseState = this.state;
        this.getRTSlips();
        this.getDsNumberDetails = this.getDsNumberDetails.bind(this);
        this.getMobileDetails = this.getMobileDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.tagCustomer = this.tagCustomer.bind(this);
        this.savePayment = this.savePayment.bind(this);
        this.handleRTNumberChange = this.handleRTNumberChange.bind(this);
        
        
    
    }

    savePayment() {
        // const obj = 
        //     {
        //         "approvedBy": "POS-USER",
        //         "biller": "Sudheer",
        //         "customerDetails": this.state.mobileData,
        //         "dlSlip": this.state.dsDetails,
        //         "payType": this.state.payType,
        //         "reason": "string",
        //         "recievedAmount": 900,
        //         "returnSlips": this.state.selectedRTNumber,
        //     }

        const obj = {
            "approvedBy": "POS-USER",
            "biller": "Sudheer",
            "customerDetails": this.state.mobileData,
            "dlSlip": [this.state.dsDetails],
            "grossAmount": this.state.grossAmount,
            "invoiceNumber": 1,
            "netPayableAmount": this.state.netPayableAmount,
            "offlineNumber": 0,
            "payType": this.state.payType,
            "reason": "string",
            "recievedAmount": this.state.selectedRTNumber.amount,
            "returnSlips": [this.state.selectedRTNumber],
            "roundOff": 0,
            "rtNumber": this.state.selectedRTNumber.rtNumber,
            "taxAmount": this.state.taxAmount,
            "totalManualDisc": this.state.totalManualDisc,
            "totalPromoDisc": this.state.totalPromoDisc
        }

        PromoItemExchangeService.savePromoItemExchange(obj).then((res) => {
            if (res.data.statusCodeValue === 200) {
                toast.success(res.data.body);
                this.setState({isBillingDetails: false});
                this.setState(this.baseState);
            } else {
                toast.error(res.data.body);
            }

        });

    }

    getMobileDetails = (e) => {
        if (e.key === 'Enter') {
        PromoItemExchangeService.getMobileData(this.state.mobileNumber).then((res) => {
           if(res.data.statusCodeValue === 200) {
            this.state.mobileData = res.data.body;
            this.setState({
                customerName: res.data.body.name, gender: res.data.body.gender,
                dob: res.data.body.dob,
                customerEmail: res.data.body.email,
                customerGST: res.data.body.gstNumber, address: res.data.body.address
            });
           } else {
               toast.info(res.data.body);
           }
        });
    }
    }

    getCashModel = () => {
        this.setState({payType : 'Cash'});
        this.setState({
            isCash: true
        });
       
    }

    hideCashModal = () => {
        this.setState({
            isCash: false
        });
    }

    getReturnAmount = () => { 
        this.setState({isPayment: false});
        if(this.state.collectedCash > this.state.balAmount) {
            this.state.returnCash = this.state.collectedCash - this.state.balAmount;
        }
        this.hideCashModal();
    }
    
    tagCustomer() {
        this.state.mobileData = {
            address: this.state.address,
            altMobileNo: "",
            dob: this.state.dob,
            gender: this.state.gender,
            gstNumber: this.state.gstNumber,
            mobileNumber: this.state.mobileNumber,
            name: this.state.customerName,
            email: this.state.customerEmail
        }
        // if(this.state.dsNumber && this.state.dsDetails) {
        //     this.setState({isBillingDetails: true});
        // }
       
        this.hideModal();

        // this.setState({
        //     customerName: " ", gender: " ",
        //     dob: " ",
        //     customerGST:" ", address: " ",
        //     mobilenumber: " "
        // });
    }

    
    hideModal = () => {
        this.setState({
            openn: false
        });
        this.setState({
            customerName: "", gender: "", 
            dob:"", 
            customerEmail:"", 
            mobileNumber:"",
            customerGST:"",  address:"", 
        });
    }

    getRTSlips() {
        PromoItemExchangeService.getRTSlips().then((res) => {
            console.log(res);
            this.setState({rtNumbersListData: res.data});
            res.data.forEach((ele,index)=>{
                const obj={
                    value:ele.rtNumber,
                    label:ele.rtNumber + ' ' + '-' + ele.amount
                }
                this.state.rtNumbersList.push(obj);
              });
        });
    }

    handleRTNumberChange=(e)=>{
        console.log(e)
      //  this.setState({ netAmount: 0, recievedAmount: 0, balAmount: 0, selectedRTNumber: {} });
        this.setState({ dropValue: e.label });
        this.setState({rtNumber : e.value});
        this.setState({selectedNumber: e});
        console.log(this.state.selectedRTNumber);
        let amount = 0;
        this.state.rtNumbersListData.forEach(element => {
            if(element.rtNumber == e.value) {
                this.setState({selectedRTNumber: element});
                amount = element.amount;
            }
        });
        console.log(this.selectedRTNumber);
       
        if(amount < this.state.netPayableAmount) {
            this.setState({ netAmount: this.state.netPayableAmount, 
            recievedAmount: amount });
            const balAmount = this.state.netPayableAmount - amount;
            this.setState({ balAmount: balAmount });
        } else {
        //    toast.info("Discount amount is higher than netPayable amount");
        }
      
        // if(this.state.dropValue)
       
     if(this.state.recievedAmount == 0) {
         this.setState({isPayment: false});
     }
       
        this.setButton();
      //  this.setState({discType: e.label}); this.state.isCardSelected && 
    }

    setButton() {
        // console.log(this.state.dsNumber);
        //  if(this.state.dsNumber) {
            this.setState({isAddDS: false});
       //  }
        
        console.log(this.state.selectedRTNumber);
    }

    
    handleChange(event) {
        this.setState({mobileNumber: event.target.value});
    }


    getDsNumberDetails() {
        PromoItemExchangeService.getDSNumber(this.state.dsNumber).then((res) => {
                    this.setState({dsDetails: res.data});
                    this.setState({grossAmount: this.state.dsDetails.mrp,totalPromoDisc: this.state.dsDetails.promoDisc,
                         netPayableAmount: this.state.dsDetails.netAmount })
                    this.setState({isBillingDetails: true});

                    if(this.state.selectedRTNumber.amount < this.state.netPayableAmount) {
                        this.setState({netAmount: this.state.netPayableAmount, recievedAmount: this.state.selectedRTNumber.amount});
                       const balAmount = this.state.netPayableAmount - this.state.selectedRTNumber.amount;
                            this.setState({balAmount: balAmount});
                    }
                });
    }

    toggleModal = () => {
        this.setState({
            openn: true
        });
    }

    renderTable() {
        
        return this.state.dsDetails.barcode.map((items, index) => {
            
            const { barcode, mrp, promoDisc, netAmount, manualDisc, qty } = items
            return (
                <tr key={index} className="row m-0 p-0">
                    <td className="col-1">{index + 1}</td>
                    <td className="col-2">{barcode}</td>
                    <td className="col-2">₹ {mrp}</td>
                    <td className="col-1">{qty}</td>
                    <td className="col-2">₹ {promoDisc}</td>
                    <td className="col-2">₹ {this.state.totalManualDisc}</td>
                    <td className="col-2">₹ {netAmount}</td>
                </tr>
            )
        });
    }

    renderBillingData() {
        return this.state.isBillingDetails && (
            <div>
                            <div className="row">
                <div className="col-6">
                    <h5 className="mt-4">Billing Details</h5>
                </div>
                {/* <div className="col-6 text-right">
                    <button type="button" className="btn-bdr active mt-3">TAG CUSTOMER <p>CTL+6</p></button>
                    <button type="button" className="btn-bill">BILL LEVEL DISCOUNT</button>
                </div> */}
            
            </div>
            <div className="row">
                <div className="col-3">
                <div className="rect p-0 pb-3">
                    <div className="d-flex">
                    <button type="button" className="btn-bdr m-l-2 mt-2" onClick={this.getCashModel}>CASH <p>CTL+1</p></button>
                    <button type="button" className="btn-bdr m-l-1 mt-2" className={"btn-save-ctl" + (this.state.isCard? ' btn-disable': '')}>CARD <p>CTL+2</p></button>
                    {/* <button type="button" className="btn-bdr m-l-1 mt-2">OTHER PAYMENTS</button> */}
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
                                <td className="col-6 text-right font-bold">₹ {this.state.collectedCash}</td>
                            </tr>
                            {/* <tr className="row m-0 p-0">
                                <td className="col-6">Card-1234</td>
                                <td className="col-6 text-right font-bold">₹ 200:00</td>
                            </tr> */}
                        </tbody>
                    </table>
                    <div className="rect-grey">
                        <label>Net</label> <span className="font-bold text-right">₹ 
                        {this.state.netAmount}</span>
                        <label>Received</label> <span className="font-bold text-right">₹ {this.state.recievedAmount}</span>
                        <hr className="w-100 mt-2 mb-2"/>
                        <label className="fs-16 font-bold">Balance</label> <span className="fs-16 font-bold text-right">₹ 
                        {this.state.balAmount}</span>
                        <hr className="w-100 mt-2 mb-2"/>
                        <label className="text-red">Return Cash</label> <span className="text-red font-bold text-right">₹ 
                        {this.state.returnCash}</span>
                    </div>
                    </div>

                </div>
                </div>
                <div className="col-9">
                <div className="rect p-0 pb-3">
                  <div className="d-flex">
                    {/* <button type="button" className="btn-bdr m-l-2 mt-2">RT SLP <p>CTL+3</p></button>
                    <button type="button" className="btn-bdr m-l-2 mt-2">PKT PENDING <p>CTL+4</p></button>
                    <button type="button" className="btn-bdr m-l-2 mt-2">PKT ADVANCE <p>CTL+5</p></button>
                    <button type="button" className="btn-bdr m-l-1 mt-2 pt-2">PHR GVS</button>
                    <button type="button" className="btn-bdr m-l-2 mt-2 pt-2">LOYALTY POINT</button> */}
                </div>   
                {/* <hr className="mt-3 mb-2" /> */}
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
                            {this.renderTable()}
                        </tbody>
                    </table>
                    <div className="row">
                        <div className="col-5">
                         <div className="rect-grey">
                             <h6 className="text-blue fs-16 font-bold mb-2">Customer Details</h6>
                            <h6>Name</h6> <p className="font-bold">
                            {this.state.customerName}
                            </p>
                            <hr className="w-100 mt-2 mb-2"/>
                            <h6>Phone Number</h6> <p className="font-bold">
                            {this.state.mobileNumber}
                            </p>
                            <hr className="w-100 mt-2 mb-2"/>
                            <h6>Loyalty Points</h6> <p className="font-bold text-blue"></p>
                         </div>
                        </div>
                        <div className="col-7">
                        <div className="rect-lightgrey">
                            <label>Gross Amount</label> <span className="font-bold text-right">₹ {this.state.grossAmount}</span>
                            <label>Promo Discount</label> <span className="font-bold text-right">₹ {this.state.totalPromoDisc}</span>
                            <label>Manual Discount</label> <span className="font-bold text-right">₹ {this.state.totalManualDisc}</span>
                            <hr className="w-100 mt-2 mb-2"/>
                            <label className="fs-16 font-bold text-green">Net Payable</label> <span className="fs-16 text-green font-bold text-right">₹ 
                            {this.state.netPayableAmount}</span>
                            <hr className="w-100 mt-2 mb-2"/>
                            {/* <label className="">Return Cash</label> <span className="font-bold text-right">₹ 200:00</span> */}
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
  
    render() {
       
        return (
            <div className="maincontent">

                <Modal isOpen={this.state.isCash} size='lg' onRequestHide={this.hideCashModal}>
                    <ModalHeader>
                        Cash Payment
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-4">
                                <label>Cash Amount: </label>
                            </div>
                            <div className="col-8">

                                <input type="text" name="cash" className="form-control"
                                    value={this.state.collectedCash}
                                    onChange={(e) => this.setState({ collectedCash: e.target.value })}

                                />
                            </div>
                        </div>
                        <br></br>

                    </ModalBody>
                    <ModalFooter>
                        <button className='pt-2 btn-bdr' onClick={this.hideCashModal}>
                            CANCEL
                        </button>
                        <button className='btn btn-bdr active fs-12' onClick={this.getReturnAmount}>
                            SAVE CASH PAYMENT
                        </button>

                    </ModalFooter>

                </Modal>


                 <Modal isOpen={this.state.openn} size='lg'>
        <ModalHeader>
            {/* <ModalClose onClick={this.hideModal}/> */}
            {/* <ModalTitle>Modal title</ModalTitle> */}
            <h5>Customer Details</h5>
        </ModalHeader>
        <ModalBody>
            <div className="row">
                <div className="col-4">
                    <label>Phone Number</label>
                    <input type="text" name="mobile" className="form-control"
                        value={this.state.mobileNumber}
                        onChange={this.handleChange} minLength="10" maxLength="10"
                        onKeyPress={this.getMobileDetails} autoComplete="off"   />
                    
                </div>
                <div className="col-4">
                    <label>Customer Name</label>
                    <input type="text" name="customer" className="form-control"
                        value={this.state.customerName}
                        onChange={(e) => this.setState({ customerName: e.target.value })}
                    />
                </div>
                <div className="col-4 sale">
                    <label>Gender</label>
                    <select className="form-control" onChange={(e) => this.setState({ gender: e.target.value })}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div className="col-4 mt-3">
                    <label>Customer Email </label>
                    <input type="text" name="email" className="form-control"
                        value={this.state.customerEmail}
                        onChange={(e) => this.setState({ customerEmail: e.target.value })}
                    />
                </div>
                <div className="col-4 mt-3">
                    <label>Date of Birth</label>
                    <input type="text" name="dob" className="form-control"
                        value={this.state.dob}
                        onChange={(e) => this.setState({ dob: e.target.value })}
                    />
                </div>
                <div className="col-4 mt-3">
                    <label>Customer GST Number</label>
                    <input type="text" name="gst" className="form-control"
                        value={this.state.customerGST}
                        onChange={(e) => this.setState({ customerGST: e.target.value })}
                    />
                </div>
                <div className="col-4 mt-3">
                    <label>Address</label>
                    <textarea rows="3" name="address" className="form-control"
                        value={this.state.address}
                        onChange={(e) => this.setState({ address: e.target.value })}
                    />
                </div>
                <div className="col-4 mt-3">
                    <div className="d-flex mt-5">
                <input type="checkbox" className="m-r-3 mt-1" name="check"  />
                <label>Customer not interested to give his/her number </label>
                </div>
                </div>
            </div>




        </ModalBody>
        <ModalFooter>
          <button className='pt-2 btn-bdr' onClick={this.hideModal}>
                CANCEL
            </button>
            <button className='btn btn-bdr active fs-12' onClick={this.tagCustomer}>
                TAG CUSTOMER [Ctl+8]
            </button>
          
        </ModalFooter>
    </Modal>

            <div className="row">
                <div className="col-6 pt-2">
                     <h5>Promo Item Exchange</h5>
                </div>
                <div className="col-6 text-right pb-2">
                    <button type="button" className="btn-save" className={"btn-save-ctl" + (this.state.isPayment? ' btn-disable': '')}  
                         onClick={this.savePayment}
                    >SAVE PAYMENT [CTL + 9]</button>
                    <button type="button" className="btn-bdr active m-l-2" onClick={this.toggleModal}>TAG CUSTOMER <p>CTL+6</p></button>
                </div>
            </div>
    
            <div className="rect">
                <div className="row">
                    <div className="col-3 sele">
                        <div className="form-group">
                        {/* <Select className="upper-case" placeholder="Select RT Slip Number"
                                          /> */}
                                           <Select className="upper-case" placeholder="Select RT Slip Number"
                                           value={this.state.selectedNumber} // set selected value
                                           options={this.state.rtNumbersList} // set list of the data
                                           onChange={this.handleRTNumberChange}// assign onChange function
                                            />
                            {/* <input type="text" className="form-control" placeholder="RT Slip Number"/> */}
                            {/* <button className="btn-nobg"><img src={barcode} /></button> */}
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Enter DS Number"
                             value={this.state.dsNumber}
                             onChange={(e) => {
                                 this.setState({ dsNumber: e.target.value });
                                    this.setButton();
                                   
                            }
                                
                             }/>
                        </div>
                    </div>
                
                    <div className="col-3">
                        
                            {/* <input type="number" className="form-control" placeholder="Check Promo Discount [Ctrl + 3]"/> */}
                            <button   className={"btn-add  m-l-1" + (this.state.isAddDS? ' btn-bdr-disable':'')} disabled={this.state.isAddDS}
                            onClick={this.getDsNumberDetails}
                             >ADD DS </button> 
                    
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
                    <div>
                        {this.renderBillingData()}
                    </div>
            
                </div>
        )
    }
}
