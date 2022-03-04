import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import edit from '../../assets/images/edit.svg';
import AccountingPortalService from '../../services/AccountingPortal/AccountingPortalService';
import NewSaleService from '../../services/NewSaleService';

export default class DebitNotes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDebit: false,
      mobileNumber: "",
      storeName: "",
      userName: "",
      userId: "",
      debitAmount: "",
      storeId: "",
      customerData: {},
      debitData: []
    };

    this.addDebit = this.addDebit.bind(this);
    this.closeDebit = this.closeDebit.bind(this);
    this.saveDebit = this.saveDebit.bind(this);
  }


  addDebit() {
    this.setState({ isDebit: true });
  }

  closeDebit() {
    this.setState({ isDebit: false });
  }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const selectedStore = JSON.parse(sessionStorage.getItem('selectedstoreData'));
    this.setState({ storeName: selectedStore.storeName, storeId: selectedStore.storeId, userName: user["cognito:username"], userId: user["custom:userId"] });
    this.getDebitNotes();
  }

  getDebitNotes() {
    const getDebit =
    {
      "fromDate": this.state.fromDate,
      "mobileNumber": this.state.searchMobileNumber,
      "storeId": "",
      "toDate": this.state.toDate
    };

    AccountingPortalService.getDebitNotes(getDebit).then(response => {
      if (response) {
        this.setState({ debitData: response.data.result });
      }
    });
  }

  clearSearch() {
    this.setState({ fromDate: "", toDate: "", searchMobileNumber: "" }, () => {
      this.getDebitNotes();
    });
  }


  saveDebit() {
    const obj = {
      "actualAmount": parseInt(this.state.debitAmount),
      "transactionAmount": parseInt(this.state.debitAmount),
      "approvedBy": parseInt(this.state.userId),
      "comments": this.state.comments,
      "creditDebit": "D",
      "customerId": this.state.customerData?.userId,
      "customerName": this.state.customerData?.userName,
      "mobileNumber": this.state.mobileNumber,
      "storeId": this.state.storeId
    };
    AccountingPortalService.saveCredit(obj).then(response => {
      if (response) {
        toast.success(response.data.message);
        this.getDebitNotes();
        this.closeDebit();
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
          toast.error("No Data Found");
        }
      });
    }
  };

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isDebit} size="lg">
          <ModalHeader>Add Debit Notes</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <h6 className="text-red mb-2 fs-14">Debit information</h6>
              </div>

              <div className="col-4">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.mobileNumber}
                    onChange={(e) => {
                      const regex = /^[0-9\b]+$/;
                      const value = e.target.value;
                      if (value === '' || regex.test(value)) {
                        this.setState({
                          [e.target.id]: e.target.value, mobileNumber: e.target.value,

                        });
                      } else {
                        // toast.error("pls enter numbers")
                      }

                    }}
                    autoComplete="off"
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

              <div className="col-4 ">
                <div className="form-group">
                  <label>Customer ID</label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.customerData?.userId} disabled
                  />
                </div>
              </div>
              <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Debit Amount</label>
                  <input type="text" className="form-control" placeholder="₹"
                    value={this.state.debitAmount}
                    onChange={(e) => {
                      const regex = /^[0-9]+/;
                      const value = e.target.value;
                      if (value === '' || regex.test(value)) {
                        this.setState({
                          [e.target.id]: e.target.value, debitAmount: e.target.value,

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
                  <label>Approved By</label>
                  <input type="text" className="form-control" placeholder=""
                    value={this.state.userName} disabled
                  />
                </div>
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
              onClick={this.saveDebit}
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
                placeholder="FROM DATE"
                value={this.state.fromDate}
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
            <button className="btn-unic-search active m-r-2 mt-2" onClick={this.getDebitNotes}>SEARCH</button>
            <button className="btn-unic-search active m-r-2 mt-2" onClick={this.clearSearch}>Clear</button>
            <button className="btn-unic-search mt-2 active" onClick={this.addDebit}>Add Debit Notes</button>
          </div>
        </div>
        <div className="row m-0 p-0 scaling-center">
          <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Debit Notes</h5>
          <div className="table-responsive">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-1">#CRM ID</th>
                  <th className="col-2">Store</th>
                  <th className="col-1">Date</th>
                  <th className="col-2">Paid Amount</th>
                  <th className="col-2">Balance</th>
                  <th className="col-2">Approved By</th>
                  <th className="col-2"></th>
                </tr>
              </thead>
              <tbody>

                {this.state.debitData.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td className="col-1 underline geeks">{items.customerId}</td>
                      <td className="col-2"></td>
                      <td className="col-1">{items.fromDate}</td>
                      <td className="col-2">₹ {items.transactionAmount}</td>
                      <td className="col-1">₹ {items.actualAmount}</td>
                      <td className="col-2">{items.customerName}</td>
                      <td className="col-2"></td>
                      <td className="col-1">
                        <img src={edit} className="w-12 pb-2" />
                        <i className="icon-delete m-l-2 fs-16"></i></td>

                    </tr>
                  );
                })}


              </tbody>
            </table>
          </div>

        </div>

      </div>
    );
  }
}
