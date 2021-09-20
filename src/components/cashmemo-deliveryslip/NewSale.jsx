
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import barcode from "../../assets/images/barcode.svg";
import NewSaleService from '../../services/NewSaleService';
import CustomerData from './CustomerData';
import Select from 'react-select';
import ecommerce from "../../assets/images/ecommerce.svg";
import displayRazorpay from "../../commonUtils/PaymentGateway";

export default class NewSale extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openn: false,
            isSubOpen: false,
            dsNumber: '',
            manualDisc: 0,
            isCash: false,
            isCard:false,
            btnDisabled:true,
            isCardSelected:false,
            isCashSelected:false,
            isBillLevelDisc: true,
            isPayment: true,
            cashAmount: 0.00,
            taxAmount: 0,
            cardAmount:0.00,
            cardDigits:'',
            rBarCodeList: [],
            discReasons: [],
            selectedDisc:{},
            deliverySlipData: {
                barcode: [],
                mrp: '',
                netAmount: 0.00,
                promoDisc: '',
                taxAmount: null
            },
            dlslips: [],
            finalList:[],
            barCodeList: [],
            mobilenumber: '',
            customerName: '',
            gender: '',
            customerEmail: '',
            dob: '',
            customerGST: '',
            address: '',
            dropValue:'',
            grandNetAmount: 0.00,
            grandReceivedAmount: 0.00,
            grandBalance: 0,
            returnCash: 0.00,
            input: {},
            isBillingDetails: false,
             errors: {},
             isBillingDisc: false,
             showDiscReason: false,
             discApprovedBy: '',
            // customerDetails: {
            //     mobilenumber: '',
            //     customerName: '',
            //     gender: '',
            //     customerEmail: '',
            //     dob: '',
            //     customerGST: '',
            //     address: '' 
            // },
            // isOpen: false,
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
            grossAmount: 0,
            totalPromoDisc: 0,
            totalManualDisc: 0,
            netPayableAmount: 0,
            genderList : [
                {
                    value:"female",
                    label: "Female"
                },
                {
                    value: "male",
                    label: "Male"
                },

            ],
            customerFullName: "",
            customerMobilenumber: "",
            // open: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.savePayment = this.savePayment.bind(this);
        this.tagCustomer = this.tagCustomer.bind(this);
        this.showDiscount = this.showDiscount.bind(this);
        this.hideDiscount = this.hideDiscount.bind(this);
        this.saveDiscount =  this.saveDiscount.bind(this);
        //this.handler = this.handler.bind(this);
    }

    openModal = () => {
        this.setState({
            openn: true
        });
    };



    openSubModal = () => {
        this.setState({
            isSubOpen: true
        });
    }

    hideModal = () => {
        this.setState({
            openn: false
        });

        this.setState({
            customerName: " ", gender: " ",
            dob: " ",
            customerGST:" ", address: " ",
            mobilenumber: " "
        });
    }

    hideCashModal = () => {
        this.setState({
            isCash: false
        });
    }

    handleSubmit(e) {
        this.setState(state => ({ open: !state.open }))
    }

    toggleModal = () => {
        this.setState({
            openn: true
        });
    }

    getCashModel = () => {
        this.setState({
            isCash: true
        });
        this.setState({
            isCashSelected: true
        });
    }
   getCardModel=()=>{
    
    this.setState({
        isCard: true
    });
    this.setState({
        isCardSelected: true
    });
   }
   hideCardModal = () => {
    this.setState({
        isCard: false
    });
    // const value  =  displayRazorpay(this.state.cardAmount)
    // console.log(value);
}
pay=()=>{
    NewSaleService.payment(this.state.cardAmount).then((res) => { 
        console.log(res.data);
        this.setState({isPayment: false});
        const data = res.data
        const options = {
    // process.env.RAZORPAY_KEY_ID
    key: "rzp_test_z8jVsg0bBgLQer",
    currency: data.currency,
    amount: data.amount,
    name: "OTSI",
    description: "Transaction",
    image: ecommerce,
    order_id: data.id,
    handler: function (response) {
      console.log("PAYMENT ID ::" + response.razorpay_payment_id)
      console.log("ORDER ID :: " + response.razorpay_order_id)
      
     // return response;
      // alert("PAYMENT ID ::" + response.razorpay_payment_id);
      // alert("ORDER ID :: " + response.razorpay_order_id);
    },
    prefill: {
      name: "Kadali",
      email: "kadali@gmail.com",
      contact: "9999999999",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
        // this.setState({taxAmount: res.data});
    });
}

    // Added By Neelima
    getDeliverySlipDetails = (e) => {
        if (e.key === 'Enter') {
            this.state.barCodeList = [];
            this.state.finalList = [];
            this.state.rBarCodeList = [];
            NewSaleService.getDeliverySlipDetails(this.state.dsNumber).then((res) => {
                // if(res.data.statusCodeValue === 200) {
                    this.state.dlslips.push(res.data);
                    if (this.state.dlslips.length > 1) {
                        const barList = this.state.dlslips.filter((test, index, array) =>
                            index === array.findIndex((findTest) =>
                                findTest.dsNumber === test.dsNumber
                            )
                        );

                        // this.state.dlslips = barList;
                        this.setState({ dlslips: barList });
                        this.state.barCodeList = [];
                        this.state.rBarCodeList = [];
                        this.state.dlslips.forEach((dlslip, index) => {
                            this.state.barCodeList.push(dlslip.barcode);
                        });

                        this.state.barCodeList.forEach((data, i) => {
                            if (data.length > 1) {
                                data.forEach((item, id) => {
                                    this.state.finalList.push(item)
                                })

                            } else {
                                this.state.finalList.push(data[0])
                            }

                            this.setState({ rBarCodeList: this.state.finalList });

                        });

                        if(this.state.manualDisc) {
                            this.state.finalList.forEach(element=> {
                                element.manualDisc = this.state.manualDisc;
                            })
                        }

                        this.state.grossAmount = 0;
                        this.state.totalPromoDisc = 0;
                        this.state.netPayableAmount = 0;

                        this.state.dlslips.forEach((slip, index) => {  
                            this.state.grossAmount = this.state.grossAmount + slip.mrp;
                            this.state.totalPromoDisc = this.state.totalPromoDisc + slip.promoDisc;
                            this.state.netPayableAmount = this.state.netPayableAmount + slip.netAmount;
                        });

                        


                    } else {

                        this.state.finalList = this.state.dlslips[0].barcode;
                        if(this.state.manualDisc) {
                            this.state.finalList.forEach(element=> {
                                element.manualDisc = this.state.manualDisc;
                            })
                        }
                        this.setState({
                        grossAmount: this.state.dlslips[0].mrp,
                        totalPromoDisc: this.state.dlslips[0].promoDisc,
                        totalManualDisc: this.state.manualDisc,
                        netPayableAmount: this.state.dlslips[0].netAmount
                    });
                    }

                    console.log(this.state.manualDisc);

                    // if(this.state.manualDisc) {
                    //     const totalDisc = this.state.totalPromoDisc + parseInt(this.state.manualDisc);
                    //     if(totalDisc < this.state.grossAmount) {
                    //         const netPayableAmount = (this.state.grossAmount) - totalDisc;
                    //         this.setState({netPayableAmount: netPayableAmount});
                    //     }
                    // }

                    this.getTaxAmount();

                    this.setState({ deliverySlipData: res.data });

                    this.setState({isBillingDetails: true});

                    this.setState({isBillLevelDisc: false});

                   this.setState({manualDisc: "", dsNumber:""});

                // } else {
                //     toast.error(res.data.body);
                // }
                console.log(this.state.manualDisc);
               
            });
           
           
        }

        

    }

    getTaxAmount() {
        // this.state.taxAmount = 0;
        // this.state.cashAmount = 0;
        // this.state.returnCash = 0;
        // this.state.grandNetAmount = 0;
        // this.state.grandReceivedAmount = 0;
        NewSaleService.getTaxAmount(this.state.netPayableAmount).then((res) => { 
            console.log(res);
            this.setState({taxAmount: res.data});
            console.log(this.state.finalList);
            if(this.state.finalList.length > 0) {
                const grandNet = this.state.netPayableAmount + this.state.taxAmount;
                this.setState({grandNetAmount: grandNet, grandReceivedAmount: grandNet});
                // this.state.grandNetAmount  = 
                // this.state.grandReceivedAmount = this.state.netPayableAmount + this.state.taxAmount;;
                if(this.state.cashAmount > this.state.grandNetAmount) {
                    const returnCash = this.state.cashAmount - this.state.grandNetAmount;
                    this.setState({returnCash: returnCash});
                } else {
                    this.state.cashAmount = 0;
                    this.state.returnCash = 0;
                    this.state.grandNetAmount  = 0;
                    this.state.grandReceivedAmount = 0;
                    this.setState({isPayment: true});
                  //  toast.info("Please enter sufficient amount");
                }
            }
           
        });
    }

    getMobileDetails = (e) => {
        if (e.key === 'Enter') {
            NewSaleService.getMobileData(this.state.mobilenumber).then((res) => {
                console.log(res)
                if(res.data.result) {
                   
                    this.state.mobileData = res.data.result;
                    this.setState({
                        customerName: res.data.result.name, gender: res.data.result.gender,
                        dob: res.data.result.dob,
                        customerEmail: res.data.result.email,
                        customerGST: res.data.result.gstNumber, address: res.data.result.address
                    });
                } else {
                    toast.error("No Data Found");
                }
               
            });
        }
    }

    showDiscount() {
        this.state.totalManualDisc = 0;
        this.setState({isBillingDisc: true});
        
    }

    hideDiscount() {
        this.setState({isBillingDisc: false});
    }

    saveDiscount() {
       // console.log("DIS");
        this.state.netPayableAmount = 0;
        const totalDisc = this.state.totalPromoDisc + parseInt(this.state.totalManualDisc);
        if(totalDisc < this.state.grossAmount) {
            
            const netPayableAmount = (this.state.grossAmount) - totalDisc;
            this.state.netPayableAmount = netPayableAmount;
          //  this.setState({netPayableAmount: netPayableAmount});
            this.getTaxAmount();
            }
            this.getDiscountReasons();
        this.setState({showDiscReason: true});
        
       this.hideDiscount();
    }

    getDiscountReasons() {
        NewSaleService.getDiscountReasons().then((res) =>{
            console.log(res);
            if(res.status === 200){
                //this.setState({discReasons: res.data});
                const discount = res.data;
                console.log(discount);
                discount.forEach((dis,index) => {
                    const obj={
                        value:dis,
                        label:dis
                    }
                    this.state.discReasons.push(obj)
                });
            } else {
                toast.error(res.data);
            }
           
        })
    }


    handleChange(event) {
        this.setState({mobilenumber: event.target.value});
    //     this.setState({

    //         errors: {}
    
    //       });
    //     let errors = {};

    //   let isValid = true;
    //     let input = this.state.input;

    // input[event.target.name] = event.target.value;

    // this.state.errors.phone = " "

    // this.setState({

    //   input

    // });
    // var pattern = new RegExp(/^[0-9\b]+$/);

    // if (!pattern.test(input["phone"])) {

    //   isValid = false;

    //   errors["phone"] = "Please enter only number.";

    // }else if(input["phone"].length != 10){

    //   isValid = false;

    //   errors["phone"] = "Please enter valid phone number.";

    // }
    // this.setState({

    //     errors: errors

    //   });

    //   console.log(this.state.errors.phone);

    
    }

   

    getReturnAmount = () => {
        if(this.state.finalList.length > 0 ){
            this.setState({isPayment: false});
        }
        this.state.grandNetAmount  = this.state.netPayableAmount+ this.state.taxAmount;
        this.state.grandReceivedAmount = this.state.netPayableAmount + this.state.taxAmount;;
        if(this.state.cashAmount > this.state.grandNetAmount) {
            this.state.returnCash = this.state.cashAmount - this.state.grandNetAmount;
        } else {
            this.state.cashAmount = 0;
            this.state.returnCash = 0;
            this.state.grandNetAmount  = 0;
            this.state.grandReceivedAmount = 0;
            this.setState({isPayment: true});
            toast.info("Please enter sufficient amount");
        }

       
        this.hideCashModal();

    }

    savePayment() {
        this.state.discType = this.state.dropValue;
        if(this.state.showDiscReason) {
            if(this.state.discApprovedBy && this.state.discType ) {
               this.createInvoice();
            } else {
                toast.info("Please select discount type/ discount reason");
            }
        } else {
          this.createInvoice();
        }
        
        
       
    }

    createInvoice() {
         sessionStorage.removeItem('recentSale');
        const obj  = {
            approvedBy: "pos-user",
            biller: "honey",
            grossAmount: this.state.deliverySlipData.mrp,
            totalPromoDisc: this.state.deliverySlipData.promoDisc,
            totalManualDisc: 0.0,
            netPayableAmount: this.state.deliverySlipData.netAmount,
            taxAmount: this.state.deliverySlipData.taxAmount,
            customerDetails: this.state.mobileData,
            dlSlip:  this.state.dlslips,
            discType: this.state.discType,
            discApprovedBy: this.state.discApprovedBy,
            invoiceNumber: 100153,
            natureOfSale: "InStore",
            offlineNumber: 6789012345,
            paymentAmountType: [
                {
                    "id": 1,
                    "paymentAmount": 500,
                    "paymentType": "Cash"
                },
                {
                    "id": 1,
                    "paymentAmount": 500,
                    "paymentType": "Card"
                }
            ],
            reason: "wish",
            roundOff: 0,
            taxAmount: 20,

        }

        NewSaleService.saveSale(obj).then((res) => {
            if(res.data.statusCodeValue === 200) {
                this.setState({isBillingDetails: false, dsNumber: '', finalList: []});
                this.setState({
                    customerName: " ", gender: " ",
                    dob: " ",
                    customerGST:" ", address: " ",manualDisc:"",customerEmail:""
                });
                this.setState({showDiscReason: false, isPayment: true});
                sessionStorage.setItem('recentSale',res.data.body);
                toast.success(res.data.body);
            } else {
                toast.error(res.data.body);
            }
        });
  
    }

    tagCustomer() {
        this.state.mobileData = {
            address: this.state.address,
            altMobileNo: "",
            dob: this.state.dob,
            gender: this.state.gender,
            gstNumber: this.state.gstNumber,
            mobileNumber: this.state.mobilenumber,
            name: this.state.customerName,
            email: this.state.customerEmail
        }

        this.setState({isBillingDetails: true, customerMobilenumber: this.state.mobilenumber});
        this.state.customerFullName = this.state.customerName;
        // this.state.customerMobilenumber = ;
        this.hideModal();

        
    }
    



    renderTableData() {
       
        return this.state.finalList.map((items, index) => {
            
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

    handleCallback = (childData) => {
        console.log(childData);
    }

    handleDiscountChange=(e)=>{
        console.log(e);
        this.setState({ dropValue: e.label });
        this.setState({discType: e.label});
        this.setState({selectedDisc: e});
      //  this.setState({discType: e.label}); this.state.isCardSelected && 
    }
    renderPayment(){
        if(this.state.isCashSelected){
            return  (
                <tr className="row m-0 p-0">
                                                <td className="col-6">Collected Cash</td>
                                                <td className="col-6 text-right font-bold">₹ {this.state.cashAmount}</td>
                                            </tr> 
            )
        } else if(this.state.isCardSelected){
            return  (
                <tr className="row m-0 p-0">
                                                <td className="col-6">Card Payment</td>
                                                <td className="col-6 text-right font-bold">₹ {this.state.cardAmount}</td>
                                            </tr> 
            )
        }
     
    }

    renderBillingData() {
        return this.state.isBillingDetails && (
            <div>
                                <div className="row">
                    <div className="col-6">
                        <h5 className="mt-4">Billing Details</h5>
                    </div>
                    <div className="col-6 text-right">


                    </div>

                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="rect p-0 pb-3">
                            <div className="d-flex">
                                <button type="button" className="btn-bdr m-l-2 mt-2" onClick={this.getCashModel} >CASH <p>CTL+1</p></button>
                                <button type="button" className="btn-bdr m-l-1 mt-2"   onClick={this.getCardModel}>CARD <p>CTL+2</p></button>
                                <button type="button" className={"btn-bdr m-l-1 mt-2" + (this.state.btnDisabled? ' btn-bdr-disable':'')} disabled={this.state.btnDisabled}>OTHER PAYMENTS</button>
                            </div>
                            <hr className="mt-2 mb-1" />
                            <div className="p-2">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col">Payment Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPayment()}
                                        {/* <tr className="row m-0 p-0">
                                            <td className="col-6">Collected Cash</td>
                                            <td className="col-6 text-right font-bold">₹ {this.state.cashAmount}</td>
                                        </tr> */}
                                        {/* <tr className="row m-0 p-0">
                                            <td className="col-6">Card-1234</td>
                                            <td className="col-6 text-right font-bold">₹ 200:00</td>
                                        </tr> */}
                                    </tbody>
                                </table>
                                <div className="rect-grey">
                                    <label>Net</label> <span className="font-bold text-right">₹ {this.state.grandNetAmount}
                                    </span>
                                    <label>Received</label> <span className="font-bold text-right">₹ {this.state.grandReceivedAmount}
                                    </span>
                                    <hr className="w-100 mt-2 mb-2" />
                                    <label className="fs-16 font-bold">Balance</label> <span className="fs-16 font-bold text-right">₹ 0.00</span>
                                    <hr className="w-100 mt-2 mb-2" />
                                    <label className="text-red">Return Cash</label> <span className="text-red font-bold text-right">₹ {this.state.returnCash}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-9">
                        <div className="rect p-0 pb-3">
                            <div className="d-flex">
                            {/* className={"btn-bdr m-l-1 mt-2" + (this.state.btnDisabled? ' btn-bdr-disable':'')} disabled={this.state.btnDisabled} */}
                                <button type="button" className={"btn-bdr m-l-2 mt-2" + (this.state.btnDisabled? ' btn-bdr-disable':'')} disabled={this.state.btnDisabled}>RT SLP <p>CTL+3</p></button>
                                <button type="button" className={"btn-bdr m-l-2 mt-2" + (this.state.btnDisabled? ' btn-bdr-disable':'')} disabled={this.state.btnDisabled}>PKT PENDING <p>CTL+4</p></button>
                                <button type="button" className={"btn-bdr m-l-2 mt-2" + (this.state.btnDisabled? ' btn-bdr-disable':'')} disabled={this.state.btnDisabled}>PKT ADVANCE <p>CTL+5</p></button>
                                <button type="button" className={"btn-bdr m-l-1 mt-2 pt-2" + (this.state.btnDisabled? ' btn-bdr-disable':'')} disabled={this.state.btnDisabled}>PHR GVS</button>
                                <button type="button" className={"btn-bdr m-l-2 m-r-2 mt-2 pt-2" + (this.state.btnDisabled? ' btn-bdr-disable':'')} disabled={this.state.btnDisabled}>LOYALTY POINT</button>
                                <button type="button" className={"btn-bill pt-2" + (this.state.isBillLevelDisc? ' btn-bdr-disable':'')}
                                onClick={this.showDiscount}
                               >BILL LEVEL DISCOUNT</button>
                            </div>
                            <hr className="mt-2 mb-1" />
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
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                                <div className="row">
                                    <div className="col-5">
                                        <div className="rect-grey">
                                            <h6 className="text-blue fs-16 font-bold mb-2">Customer Details</h6>
                                            <h6>Name</h6> <p className="font-bold">
                                                {this.state.customerFullName}
                                            </p>
                                            <hr className="w-100 mt-2 mb-2" />
                                            <h6>Phone Number</h6> <p className="font-bold">{this.state.customerMobilenumber}</p>
                                            <hr className="w-100 mt-2 mb-2" />
                                            <h6>Loyalty Points</h6> <p className="font-bold text-blue"></p>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="rect-lightgrey">
                                            <label>Gross Amount</label> <span className="font-bold text-right">₹ {this.state.grossAmount}</span>
                                            <label>Promo Discount</label> <span className="font-bold text-right">₹ {this.state.totalPromoDisc}</span>
                                            <label>Manual Discount</label> <span className="font-bold text-right">₹ {this.state.totalManualDisc}</span>
                                            <hr className="w-100 mt-2 mb-2" />
                                            <label className="fs-16 font-bold text-green">Net Payable</label> 
                                            <span className="fs-16 text-green font-bold text-right">₹ 
                                            {this.state.netPayableAmount}</span>
                                            <hr className="w-100 mt-2 mb-2" />
                                            <label className="">Tax Amount</label> <span className="font-bold text-right">₹{this.state.taxAmount}</span>
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
        let subModalDialogStyles = {
            base: {
                bottom: -600,
                transition: 'bottom 0.4s'
            },
            open: {
                bottom: 0
            }
        };
        return (
            <div className="maincontent">
                {/* <button className='btn btn-primary' onClick={this.openModal}>
              Open Modal
            </button> */}
                {/* <Popup\
          isOpen={this.state.isOpen}
          title={"Customer Details :"}
          data={this.state.mobileData}
          onClose={() => this.setState({ isOpen: false })}
          actions={[
            { title: "Tag Customer", onClick: () => this.setState({ isOpen: false })},
            {
              title: "Cancel",
              onClick: () => this.setState({ isOpen: false }),
            },
          ]}
        /> */}
                {/* <Modal isOpen={this.state.open} size='modal-lg' onRequestHide={this.hideModal}>
     <CustomerData  toggleModal={this.toggleModal} parentCallback = {this.handleCallback}/>
     </Modal> */}

                <Modal isOpen={this.state.isBillingDisc} size='lg'>
                    <ModalHeader>
                        Bill Level Discount
                    </ModalHeader>
                    <ModalBody>
                        <div className="row p-4">
                            <div className="col-3">
                                <label>Bill Level Discount: </label>
                            </div>
                            <div className="col-9">

                                <input type="text" name="discount" className="form-control"
                                    value={this.state.totalManualDisc}
                                    onChange={(e) => this.setState({ totalManualDisc: e.target.value })}

                                />
                            </div>
                        </div>
                        <br></br>
                    </ModalBody>
                    <ModalFooter>
                            <button className='pt-2 btn-bdr' onClick={this.hideDiscount}>
                            CANCEL
                        </button>
                        <button className='btn btn-bdr active fs-12' onClick={this.saveDiscount}>
                            SAVE DISCOUNT
                        </button>
                    
                    </ModalFooter>
                </Modal>

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
                                    value={this.state.cashAmount}
                                    onChange={(e) => this.setState({ cashAmount: e.target.value })}
                                   
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
                <Modal isOpen={this.state.isCard} size='lg' onRequestHide={this.hideCardModal}>
                    <ModalHeader>
                        Card Payment
                    </ModalHeader>
                    <ModalBody>
                        {/* <div className="row">
                            <div className="col-4">
                                <label>Card Last 4 Digts: </label>
                            </div>
                            <div className="col-8">

                                <input type="text" name="cash" className="form-control"
                                    value={this.state.cardDigts}
                                    onChange={(e) => this.setState({ cardDigts: e.target.value })}
                                   
                                />
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-4">
                                <label>Amount: </label>
                            </div>
                            <div className="col-8">

                                <input type="text" name="cash" className="form-control"
                                    value={this.state.cardAmount}
                                    onChange={(e) => this.setState({ cardAmount: e.target.value })}
                                   
                                />
                            </div>
                        </div>
                        <br></br>

                    </ModalBody>
                    <ModalFooter>
                    <button className='pt-2 btn-bdr' onClick={this.hideCardModal}>
                            CANCEL
                        </button>
                        <button className='btn btn-bdr active fs-12' 
                        onClick={() => { this.hideCardModal();this.pay()} }>
                          PAY
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
                                    value={this.state.mobilenumber}
                                    onChange={this.handleChange} minLength="10" maxLength="10"
                                    onKeyPress={this.getMobileDetails} autoComplete="off"   />
                                <div className="text-danger">{this.state.errors.phone}</div>
                            </div>
                            <div className="col-4">
                                <label>Customer Name</label>
                                <input type="text" name="customer" className="form-control"
                                    value={this.state.customerName}
                                    onChange={(e) => this.setState({ customerName: e.target.value })}
                                />
                            </div>
                            <div className="col-4">
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
                        <h5>New Sale</h5>
                    </div>
                    <div className="col-6 text-right pb-2">
                        <button type="button" className="btn-bdr active m-r-2" onClick={this.toggleModal}
                        >TAG CUSTOMER <p>CTL+6</p></button>
                    
                        <button type="button" className={"btn-save-ctl" + (this.state.isPayment? ' btn-disable': '')} disabled={this.state.isPayment}  onClick={this.savePayment}>SAVE PAYMENT [CTL + 9]</button>
                    </div>
                </div>

                <div className="rect">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.dsNumber}
                                    onChange={(e) => this.setState({ dsNumber: e.target.value })}
                                    onKeyPress={this.getDeliverySlipDetails} placeholder="Delivery Slip Number" />
                                <button className="btn-nobg"></button>
                            </div>
                        </div>

                            <div className="col-4">
                                {this.state.showDiscReason &&
                                        <div className="form-group">
                                            <input type="text" className="form-control" tabIndex="2"
                                                value={this.state.discApprovedBy}
                                                onChange={(e) => this.setState({ discApprovedBy: e.target.value })}
                                        
                                                placeholder="Discount Approved By" />
                                        </div>


                                }
                            </div>

                            <div className="col-4 sele">
                                {this.state.showDiscReason &&

                                        <div className="form-group sele">
                                            {/* <input type="number" className="form-control" placeholder="Check Promo Discount [Ctrl + 3]"/> */}
                                            {/* <button className="btn-add"  onClick={this.getDeliverySlipDetails}>ADD DS </button> */}
                                            <Select className="upper-case" placeholder="Discount Reason"
                                           value={this.state.selectedDisc} // set selected value
                                           options={this.state.discReasons} // set list of the data
                                           onChange={this.handleDiscountChange} // assign onChange function
                                            />
                                        </div>

                                }
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
