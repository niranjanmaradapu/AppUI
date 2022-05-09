import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NewSaleService from '../../services/NewSaleService';
import { toast } from 'react-toastify';
import AccountingPortalService from '../../services/AccountingPortal/AccountingPortalService';

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
      storeId:""
    };

    this.addCredit = this.addCredit.bind(this);
    this.closeCredit = this.closeCredit.bind(this);
    this.saveCredit = this.saveCredit.bind(this);
    this.getCreditNotes = this.getCreditNotes.bind(this);
    this.clearCreditNotes = this.clearCreditNotes(this);
  }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const selectedStore = JSON.parse(sessionStorage.getItem('selectedstoreData'));
    this.setState({ storeName: selectedStore.storeName, storeId: selectedStore.storeId,
     userName: user["cognito:username"], userId: user["custom:userId"] });
    this.getCreditNotes();
  }

  addCredit() {
    this.setState({ isCredit: true });
  }

  editCredit(creditNote) {
   console.log(creditNote);
    this.setState({ isCredit: true, 
        mobileNumber: creditNote.mobileNumber, 
        creditAmount: creditNote.actualAmount,
        comments: creditNote.comments });
    this.state.customerData.userName = creditNote.customerName;
    this.state.customerData.userId  = creditNote.customerId;
  }


  closeCredit() {
    this.setState({ isCredit: false });
  }


  getCreditNotes() {
    const getCredit =
    {
      "fromDate": this.state.fromDate,
      "mobileNumber": this.state.searchMobileNumber,
      "storeId": this.state.storeId,
      "toDate": this.state.toDate,
    }

    AccountingPortalService.getCreditNotes(getCredit).then(response => {
      if (response) {
        this.setState({ creditData: response.data.result });
      }
    });
  }

  clearCreditNotes() {
        this.setState({fromDate:" ", toDate:" ",searchMobileNumber:" "}, () => {
      this.getCreditNotes();
    });
  }


  saveCredit() {
    const {customerData, comments, storeId, creditAmount} = this.state;
    const obj = {
      comments: comments,
      amount: creditAmount,
      customerId: customerData.userId,
      storeId: storeId,
      transactionType: "CREDIT",
      accountType:"CREDIT"
    }
    AccountingPortalService.saveCredit(obj).then(response => {
      if (response) {
        toast.success(response.data.message);
        this.getCreditNotes();
        this.closeCredit();
      }
    });
  }






  getCustomerDetails = (e) => {
    if (e.key === "Enter") {
      NewSaleService.getMobileData("+91" + this.state.mobileNumber).then((res) => {
        if (res && res.data.result) {
          // this.state.customerData = res.data.result;
          this.setState({ customerData: res.data.result });

        } else {
         // toast.error("No Data Found");
        }
      });
    }
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
                  <label>Mobile Number</label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.mobileNumber}
                    onChange={(e) => 
                      {
                        const regex = /^[0-9\b]+$/;
                        const value = e.target.value;
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
                    maxLength="10"
                    onKeyPress={this.getCustomerDetails}


                  />
                </div>
              </div>

              <div className="col-4">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.customerData?.userName} disabled
                  />
                </div>
              </div>

              {/* <div className="col-4 ">
                <div className="form-group">
                  <label>Customer ID</label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.customerData?.userId} disabled
                  />
                </div>
              </div> */}
              <div className="col-4">
                <div className="form-group">
                  <label>Credit Amount</label>
                  <input type="text" className="form-control" placeholder="₹"
                    value={this.state.creditAmount}
                    onChange={(e) =>  {
                      const regex = /^[0-9]+/;
                      const value = e.target.value;
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
              <div className="col-4">
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
            <button className="btn-unic-search active m-r-2 mt-2" onClick={this.getCreditNotes}>SEARCH</button>
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
                  {/* <th className="col-2">Role</th> */}
                  <th className="col-1"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.creditData.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td className="col-1 underline geeks">{items.customerId}</td>
                      <td className="col-2">{items.customerName}</td>
                      <td className="col-1">{items.storeId}</td>
                      <td className="col-1">{items.fromDate}</td>
                      <td className="col-2">₹ {items.transactionAmount}</td>
                      <td className="col-1">₹ {items.actualAmount}</td>
                      <td className="col-2">{items.approvedBy}</td>
                      {/* <td className="col-2"></td> */}
                      <td className="col-1">
                        
                        <img src={edit} className="w-12 pb-2" onClick={(e) => this.editCredit(items)} />
                        <i className="icon-delete m-l-2 fs-16"></i>
                        </td>

                    </tr>
                  );
                })}
              </tbody>
           
            </table>
          </div>

        </div>

      </div>
    )
  }
}
