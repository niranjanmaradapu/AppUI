import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NewSaleService from '../../services/NewSaleService';
import { toast } from 'react-toastify';
import AccountingPortalService from '../../services/AccountingPortal/AccountingPortalService';
import ecommerce from "../../assets/images/ecommerce.svg";
import axios from 'axios';
import { BASE_URL } from "../../commonUtils/Base";
import { ACCOUNTING_PORTAL } from "../../commonUtils/ApiConstants";
import {errorLengthMin, errorLengthMax, creditNotes_Err_Msg } from './Error';

export default class CreateNotes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCredit: false,
      mobileNumber: "",
      storeName: "",
      userName: "",
      userId: "",
      creditAmount: "",
      storeId: "",
      fromDate: "",
      toDate:"",
      searchMobileNumber:"",
      customerData: {},
      creditData: [],
      error:{},
      storeId:"",
      isAddMore: false,
      isEdit: false,
      selectedItem: '',
      isShowAllTransactions: false,
      transactionHistory: [],
      trasanctionTypes: [
        {label: 'Card', value: 'Card'},
        {label: 'Cash', value: 'Cash'}
        ],
        transactionType: '',
        referenceNumber: '',
        paidAmount: ''
    };

    this.addCredit = this.addCredit.bind(this);
    this.closeCredit = this.closeCredit.bind(this);
    this.saveCredit = this.saveCredit.bind(this);
    this.getCreditNotes = this.getCreditNotes.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const selectedStore = JSON.parse(sessionStorage.getItem('selectedstoreData'));
    this.setState({ storeName: selectedStore.storeName, storeId: selectedStore.storeId,
     userName: user["cognito:username"], isEdit: false,userId: user["custom:userId"] }, () => this.getCreditNotes());
    
  }

  addCredit() {
    this.setState({ isCredit: true });
  }


  closeCredit() {
    this.setState({ isCredit: false, isAddMore: false, mobileNumber: '', customerData: '', creditAmount: '', transactionType: '',isEdit: false,error:{}});
  }

  dateFormat = (d) => {
    let date = new Date(d)
    
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()
}
  getCreditNotes() {
    const accountType ='CREDIT';
    const { storeId } = this.state;
   const reqOb =  {
      fromDate: null,
      mobileNumber:null,
      storeId: storeId,
      toDate: null,
      accountType: "CREDIT",
      customerId: null
    }
    AccountingPortalService.getCreditNotes(reqOb).then(response => {
      if (response) {
        this.setState({ creditData: response.data.content });
      }
    });
  }

  searchCreditNotes = () => {
    const { storeId, fromDate, toDate, searchMobileNumber } = this.state;
   const reqOb =  {
      fromDate: fromDate,
      mobileNumber: searchMobileNumber ? `+91${searchMobileNumber}` : null,
      storeId: storeId,
      toDate: toDate,
      accountType: "CREDIT",
      customerId: null
    }
    AccountingPortalService.getCreditNotes(reqOb).then(response => {
      if (response) {
          this.setState({ creditData: response.data.content });
      }
    });
  }

  clearCreditNotes = () => {
    this.setState({fromDate:"", toDate:"",searchMobileNumber:""}, () => {
        this.getCreditNotes();
    });
  }


  saveCredit() {
    const {customerData, comments, storeId, creditAmount, transactionType} = this.state;
    const obj = {
      comments: comments,
      amount: creditAmount,
      customerId: customerData.userId,
      storeId: storeId,
      transactionType: "CREDIT",
      accountType:"CREDIT",
      paymentType: transactionType
    }
    if(this.handleValidation()) {
    AccountingPortalService.saveCredit(obj).then(response => {
      if (response) {
        if(transactionType === 'Card') {
          this.savePayment(response.data.amount, response.data.referenceNumber);
        } 
        if(transactionType === 'Cash') {
          this.closeCredit();
        }        
        toast.success(response.data.message);
        this.getCreditNotes();       
      }
    });
    }
  else{
    toast.info("Please Enter all mandatory fields");
  }
  }

  getAllLedgerLogs = () => {
    const { selectedItem } = this.state;
    const reqOb =  {
      fromDate: null,
      mobileNumber:null,
      storeId: selectedItem.storeId,
      toDate: null,
      accountType: selectedItem.accountType,
      customerId: selectedItem.customerId
    }
    AccountingPortalService.getAllLedgerLogs(reqOb).then(response => {
      if (response) {
        this.setState({
          isShowAllTransactions: true,
          transactionHistory: response.data.content
        });
      }
    });
  }
  addMore = (item) => {
    this.setState({
      isCredit: true,
      isAddMore: true,
      selectedItem: item,
      mobileNumber: item.mobileNumber,
      customerData: { userName: item.customerName, userId: item.customerId }
    });
  }
  handelTrasanctionTypes = (e) => {
      this.setState({ transactionType: e.target.value }, () => {
        const  { transactionType } = this.state;
       if( transactionType === 'Card') {
        this.saveCredit();
       }
      });
  }
  handleValidation () {
    let error= {};
    let formIsValid= true;

    //Mobile Number
    if(!this.state.mobileNumber){
      formIsValid = false;
      error["mobileNumber"] = creditNotes_Err_Msg.mobileNumber;
      }
      //credit Amount
    if(!this.state.creditAmount){
      formIsValid = false;
      error["creditAmount"] = creditNotes_Err_Msg.creditAmount;
      }

    //Payment type
    if(!this.state.transactionType){
      formIsValid = false;
      error["transactionType"] = creditNotes_Err_Msg.transactionType;
      }
   
    this.setState({ error: error });               
    return formIsValid;  
  }


  getCustomerDetails = (e) => {

    if (e.key === "Enter" ) {
  if(this.state.mobileNumber.length >=10){
      NewSaleService.getMobileData("+91" + this.state.mobileNumber).then((res) => {

        if (res && res.data.result) {
          // this.state.customerData = res.data.result;

          this.setState({ customerData: res.data.result });
        
        }
      });
  }
  else{
    toast.info("Please Enter Valid Mobile Number");
  }
    
  }
}

  toggle = () => {
    this.setState({
      isShowAllTransactions: false,
      transactionHistory: []
    });
  }

  savePayment = (cardAmount, referenceNumber) => {
    const reqObj = {
      amount: cardAmount,
      type: "C",
      referenceNumber : referenceNumber
    }
    AccountingPortalService.creditdebitOrder(reqObj).then((res) => {
    const options = {
     // process.env.RAZORPAY_KEY_ID
      key: "rzp_test_z8jVsg0bBgLQer",
      currency:"INR",
      amount: res.data.result.amount ,
      name: "OTSI",
      description: "Transaction",
      image: ecommerce,
      order_id: res.data.result.razorPayId,
      handler: function (response) {
        toast.success("Payment Done Successfully");
        let status = true
        const param = '?razorPayId=' + response.razorpay_order_id + '&payStatus=' + status;
        const result = axios.post(BASE_URL + ACCOUNTING_PORTAL.payconfirmation + param, {});
      },
      prefill: {
        name: "Kadali",
        email: "kadali@gmail.com",
        contact: "9999999999",
      },
   };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    this.closeCredit();
    this.getCreditNotes();
  });
}

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isCredit} size="lg">
          <ModalHeader>Add Credit Notes</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <h6 className="text-red mb-2 fs-14">Credit information</h6>
              </div>

              <div className="col-4">
                <div className="form-group">
                  <label>Mobile Number <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.mobileNumber} disabled={this.state.isEdit}
                    maxLength={errorLengthMax.mobileNumber}
                    onChange={(e) => 
                      {
                        const regex = /^[0-9\b]+$/;
                        const value = e.target.value;
                        this.state.error["mobileNumber"]="";
                        if (value === '' || regex.test(value)) {
                            this.setState({
                                [e.target.id]: e.target.value, mobileNumber: e.target.value,
                
                            });
                        } else {
                            // toast.error("pls enter numbers")
                        }
                
                      }
                    }
                    minLength="10"
                    // maxLength="10"
                    onKeyPress={this.getCustomerDetails}


                  />
                </div>
                <span style={{ color: "red" }}>{this.state.error["mobileNumber"]}</span>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.customerData?.userName} disabled
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label>Credit Amount <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="text" className="form-control" placeholder="₹"
                    value={this.state.creditAmount} disabled={this.state.isEdit}
                    maxLength={errorLengthMax.creditAmount}
                    onChange={(e) =>  {
                      const regex = /^[0-9]+/;
                      const value = e.target.value;
                      this.state.error["creditAmount"]="";
                      if (value === '' || regex.test(value)) {
                          this.setState({
                              [e.target.id]: e.target.value, creditAmount: e.target.value,
              
                          });
                      } else {
                          // toast.error("pls enter numbers")
                      }
                    }}
                  />
                </div>
                <span style={{ color: "red" }}>{this.state.error["creditAmount"]}</span>
              </div>
              <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Store</label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.storeName} disabled
                  />
                </div>
              </div>
              <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Created By</label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.userName} disabled
                  />
                </div>
              </div>
              <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Payment Type <span className="text-red font-bold" name="bold">*</span></label>
                  <select disabled={!this.state.creditAmount} value={this.state.transactionType} 
                  onChange={(e) => this.handelTrasanctionTypes(e)} className="form-control">
                      <option>Select Payment Type</option>
                        { 
                            this.state.trasanctionTypes &&
                            this.state.trasanctionTypes.map((item, i) => 
                            (<option key={i} value={item.value}>{item.label}</option>))
                          }
                    </select>
                </div>
                <span style={{ color: "red" }}>{this.state.error["transactionType"]}</span>
              </div>
              <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Comments</label>
                  <textarea
                    value={this.state.comments}
                    onChange={(e) => this.setState({ comments: e.target.value })}
                  ></textarea>
                </div>
              </div>
              {this.state.isAddMore && <div className="col-4 mt-5">
                <div className="form-group underline geeks">
                <label></label>
                  <a onClick={() => this.getAllLedgerLogs()}>Show All Transactions</a>
                </div>
              </div>}
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeCredit}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.saveCredit}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isShowAllTransactions}  size="lg"  style={{maxWidth: '1000px', width: '100%'}}>
        <ModalHeader toggle={() =>this.toggle()} charCode="close">All Transactions</ModalHeader>
          <ModalBody>
                  <div className="table-responsive p-0">                      
                    <table className="table table-borderless mb-1 mt-2">
                      {this.state.transactionHistory && <thead>
                        <tr className="mt-1 p-0">
                          <th className="col-2">#CRM ID</th>
                          <th className="col-1">STORE</th>
                          <th className="col-2">TRASANCTION TYPE</th>
                          <th className="col-2">ACCOUNT TYPE</th>                          
                          <th className="col-2">AMOUNT</th>
                          <th className="col-3">DATE</th>
                        </tr>
                      </thead>}
                      <tbody>
                        {this.state.transactionHistory && this.state.transactionHistory.map((itm, ind) => {
                            return (
                              <tr key={ind}>
                                <td className="col-2">{itm.customerId}</td>
                                <td className="col-1">{itm.storeId}</td>
                                <td className="col-2">{itm.transactionType}</td>
                                <td className="col-2">{itm.accountType}</td>
                                <td className="col-2">{itm.amount}</td>
                                <td className="col-3">{itm.createdDate}</td>
                              </tr>
                              )
                        })}
                      </tbody>
                    </table>
                  </div>
            </ModalBody>
            {/* <ModalFooter>
            <button onClick={() => this.closeTransactionModel()} className="btn-unic" >
              Cancel
            </button>
          </ModalFooter> */}
          </Modal>
        <div className="row">
          {/* <div className="col-sm-3 col-12">
            <div className="form-group mt-2 mb-3">
              <select className="form-control">
                <option>Select Store</option>
                <option>Bradipet</option>
                <option>Arundel Pet</option>
                <option>Lakshmipuram</option>
              </select>
            </div>
          </div> */}
          <div className="col-sm-2 col-12 mt-2">
            <div className="form-group mb-3">
            <label>From Date</label>
              <input type="date" className="form-control"
                placeholder="FROM DATE" value={this.state.fromDate}
                onChange={(e) => this.setState({ fromDate: e.target.value })}
                autoComplete="off"
                />
            </div>
          </div>
          <div className="col-sm-2 col-12 mt-2">
            <div className="form-group mb-3">
            <label>To Date</label>
              <input type="date" className="form-control"
                placeholder="TO DATE" 
                value={this.state.toDate}
                onChange={(e) => this.setState({ toDate: e.target.value })}
                autoComplete="off"
                />
            </div>
          </div>
          <div className="col-sm-2 col-12 mt-2">
            <div className="form-group mb-3">
            <label>Mobile</label>
              <input type="text" className="form-control"
                placeholder="MOBILE NUMEBR" 
                maxLength="10"
                minLength="10"
                value={this.state.searchMobileNumber}
                onChange={(e) => {
                  const regex = /^[0-9\b]+$/;
                  const value = e.target.value;
                  if (value === '' || regex.test(value)) {
                      this.setState({
                          [e.target.id]: e.target.value, searchMobileNumber: e.target.value,
          
                      });
                  } else {
                      // toast.error("pls enter numbers")
                  }
          
                }}
                autoComplete="off"
                />
            </div>
          </div>
          <div className="col-sm-6 col-12 scaling-mb scaling-center pt-4">
            <button className="btn-unic-search active m-r-2 mt-2" onClick={this.searchCreditNotes}>SEARCH</button>
            <button className="btn-unic-search active m-r-2 mt-2" onClick={this.clearCreditNotes}>Clear</button>
            <button className="btn-unic-search mt-2 active" onClick={this.addCredit}>Add Credit Notes</button>
          </div>
        </div>
        <div className="row m-0 p-0 scaling-center">
          <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Credit Notes</h5>
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-1">#CRM ID</th>
                  <th className="col-2">Customer Name</th>
                  <th className="col-1">Store</th>
                  <th className="col-1">Date</th>
                  <th className="col-2">Used Amount</th>
                  <th className="col-1">Balance</th>
                  <th className="col-2">Approved By</th>
                  <th className="col-1"></th>
                  <th className="col-1"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.creditData.map((items, index) => {
                  let date = this.dateFormat(items.createdDate)
                  return (
                    <tr key={index}>
                      <td className="col-1 underline geeks">{items.customerId}</td>
                      <td className="col-2">{items.customerName}</td>
                      <td className="col-1">{items.storeId}</td>
                      <td className="col-1">{date}</td>
                      <td className="col-2">₹ {items.usedAmount}</td>
                      <td className="col-1">₹ {items.amount}</td>
                      <td className="col-2">{items.createdBy}</td>
                      <td className="col-1 underline geeks"><a onClick={() => this.addMore(items)}>Add Credit</a></td>
                      <td className="col-1">
                        {/* <img src={edit} className="w-12 pb-2" />
                        <i className="icon-delete m-l-2 fs-16"></i> */}
                      </td>

                    </tr>
                  );
                })}
                {this.state.creditData.length === 0 && <tr>No records found!</tr>}
              </tbody>
           
            </table>
          </div>

        </div>

      </div>
    )
  }
}
