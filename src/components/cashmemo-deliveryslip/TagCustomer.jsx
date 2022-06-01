import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { ToastContainer, toast } from "react-toastify";
import CreateDeliveryService from '../../services/CreateDeliveryService';
import moment from "moment";

export default class TagCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openn: false,
      mobileNumber: "",
      mobileData: {
        customerId: "",
        name: "",
        mobileNumber: "",
        gstNumber: "",
        address: "",
        email: "",
        dob: "",
        gender: "",
        altMobileNo: "",
      },
      errors: {},
      isUserTagged: false,
      name: "",
      gvNumber: "",
      gvNumberData: {
        gvId: "",
        userId: "",
        gvNumber: "",
        description: "",
        isTagged: "",
        expiryDate: "",
        totalAmount: "",
        leftOverAmount: "",
        createdDate: "",
        giftVochersList: [],
        isGiftVocher: false,
        amount: "",
        fromDate: "",
        toDate: "",
        description: ""
      },
    };

    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeGvNumber = this.handleChangeGvNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTagCustomerToGv = this.createTagCustomerToGv.bind(this);
    this.getGiftVochersList = this.getGiftVochersList.bind(this);
    this.addGiftVoucher = this.addGiftVoucher.bind(this);

  }

  componentWillMount() {
    this.getGiftVochersList();
  }

  handleValidation() {
    let errors = {};
    let formIsValid = true;

    //Name
    if (!this.state.gvNumber) {
        formIsValid = false;
        errors["gvNumber"] = "Please Enter GV Number";
    }
    if(this.state.gvNumber)
    {
      let input=this.state.gvNumber;
      const gvnumValid =input.length === 8;
      if(this.state.gvNumber && !gvnumValid){
        formIsValid = false;
        errors["gvNumber"] = "GV Number Must Have 8 Numbers";

      }
    }

   


    // Mobile
    if (!this.state.fromDate) {
        formIsValid = false;
        errors["fromDate"] = "Select From Date";
    }

    // if (typeof this.state.mobileNumber !== "undefined") {
    //     if (!this.state.mobileNumber.match(/^[0-9\b]+$/)) {
    //         formIsValid = false;
    //         errors["mobileNumber"] = "Please Enter Valid Mobile Number";
    //     }
    // }

    //email 
    if (!this.state.toDate) {
        formIsValid = false;
        errors["toDate"] = "Select To Date";
    }

    if (!this.state.amount) {
      formIsValid = false;
      errors["amount"] = "Enter amount";
  }

    // if (typeof this.state.email !== "undefined") {

    //     if (!this.state.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{4,})$/i)) {
    //         formIsValid = false;
    //         errors["email"] = "Please Enter Valid Email";
    //     }

    // }


    this.setState({ errors: errors });
    return formIsValid;

}


  getGiftVochersList() {
    CreateDeliveryService.getGiftVochersList().then(res => {
      if (res) {
        if(res.data.result != "Record not found") {
          this.setState({ giftVochersList: res.data.result, isGiftVocher: true });
        }
        


        // this.state.giftVochersList = res.data.result;
        // console.log(this.state.giftVochersList);
      }
    });
  }

  handleChangeMobile(event) {
    this.setState({ mobileNumber: event.target.value });
  }

  handleChangeGvNumber(event) {
    this.setState({ gvNumber: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.createTagCustomerToGv();
  }

  createTagCustomerToGv() {
    CreateDeliveryService.createTagCustomerToGv(
      this.state.customerId,
      this.state.gvId
    ).then((res) => {

      if (
        this.state.mobileNumber &&
        this.state.name &&
        this.state.gvNumber &&
        res.data !== "Gift voucher is not valid"
      ) {
        toast.success(res.data.message);
        this.setState({});
      } else {
        toast.error("Gift voucher is not valid");
      }
    });
  }

  getMobileDetails = (e) => {
    if (e.key === "Enter") {
      if (this.state.mobileNumber.trim().length === 10) {
        CreateDeliveryService.getMobileData(this.state.mobileNumber).then(
          (res) => {
            console.log(res);
            if (res.data.status === 200) {
              toast.success("Mobile Details Fetched Successfully");
              this.state.mobileData = res.data.result;
              this.setState({
                isUserTagged: true,
                customerId: res.data.result.customerId,
                name: res.data.result.name,
                mobileNumber: res.data.result.mobileNumber,
                gstNumber: res.data.result.gstNumber,
                address: res.data.result.address,
                email: res.data.result.email,
                dob: res.data.result.dob,
                gender: res.data.result.gender,
                altMobileNo: res.data.result.altMobileNo,
              });
            } else {
              this.setState({
                isUserTagged: false,
              });
              toast.error("Customer not found");
            }
          }
        );
      } else {
        toast.error("Enter a valid mobile number");
      }
    }
  };

  getGvNumberDetails = (e) => {
    if (e.key === "Enter") {
      CreateDeliveryService.getGvNumberData(this.state.gvNumber).then(
        (res) => {
          console.log(res);
          if (res.data.status === 200) {
            toast.success("GvNumber Details Fetched Successfully");
            this.state.gvNumberData = res.data.result;
            this.setState({
              isUserTagged: true,
              gvNumber: res.data.result.gvNumber,

              gvId: res.data.result.gvId,
              userId: res.data.result.userId,
              description: res.data.result.description,
              isTagged: res.data.result.isTagged,
              expiryDate: res.data.result.expiryDate,
              totalAmount: res.data.result.totalAmount,
              leftOverAmount: res.data.result.leftOverAmount,
              createdDate: res.data.result.createdDate,
            });
          } else {
            this.setState({
              isUserTagged: false,
            });
            toast.error(res.data.body);
          }
        }
      );
    }
  };

  getGiftVocherTable() {
    if (this.state.giftVochersList && this.state.giftVochersList.length > 0) {
      return this.state.giftVochersList.map((items, index) => {
        const { gvNumber, fromDate, toDate, value, isActivated } = items;
        return (
          <tr key={index}>
            <td className="col-1 geeks">
              {index + 1}
            </td>
            <td className="col-2">{gvNumber}</td>
            <td className="col-2">{fromDate}</td>
            <td className="col-2">{toDate}</td>
            <td className="col-2">₹ {value}

            </td>

          </tr>
        );
      });
    }

  }

  addGiftVoucher() {
    const formValid = this.handleValidation();
         if (formValid) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const obj = {
      "gvNumber": this.state.gvNumber,
      "description": this.state.description,
      "fromDate": this.state.selectedFromDate,
      "toDate": this.state.selectedToDate,
      "clientId": user["custom:clientId1"],
      "value": this.state.amount
    }
    CreateDeliveryService.saveGiftVoucher(obj).then(res => {
      if (res && res.data.isSuccess === "true") {
        this.setState({
          gvNumber: "",
          description: "",
          fromDate: "",
          toDate: "",
          amount: ""
        });
        this.getGiftVochersList();
        toast.success(res.data.message)

      }
    });
  } else {
    toast.error("Please enter mandatory fields");
  }
  }

  render() {
    return (
      <div className="maincontent">
        <div className="customer-gift">
          <div className="row">
            <div className="col-12 col-sm-3">
              <h5 className="mt-2 mb-3 fs-18">Generate gift voucher </h5>
              <div className="form-group mt-2 mb-2">
              <label>GV Number</label>
                <input type="search" className="form-control"
                  placeholder="Enter GV Number" value={this.state.gvNumber}
                  onChange={(e) =>
                    this.setState({ gvNumber: e.target.value })
                  }
                />
                 <div>
                      <span style={{ color: "red" }}>{this.state.errors["gvNumber"]}</span>
                    </div>
              </div>
              <div className="form-group mb-2">
              <label>Description</label>
                <input type="search" className="form-control"
                  placeholder="Enter Description"
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  } />
              </div>
              <div className="form-group mb-2">
              <label>From Date</label>
                <input type="date" className="form-control" placeholder="Enter FromDate"
                  value={this.state.fromDate}
                  onChange={(e) => this.setState({ fromDate: e.target.value }, () => {
                    var localTime = moment().format('YYYY-MM-DD'); // store localTime
                    var proposedDate = this.state.fromDate + "T00:00:00.000Z";

                    this.setState({ selectedFromDate: proposedDate })
                  }

                  )}
                  autoComplete="off" />
                   <div>
                      <span style={{ color: "red" }}>{this.state.errors["fromDate"]}</span>
                    </div>
              </div>
              <div className="form-group mb-2">
              <label>To Date</label>
                <input type="date" className="form-control" placeholder="Enter ToDate"
                  value={this.state.toDate}
                  onChange={(e) => this.setState({ toDate: e.target.value }, () => {
                    var localToTime = moment().format('YYYY-MM-DD'); // store localTime
                    var proposedToDate = this.state.toDate + "T00:00:00.000Z";

                    this.setState({ selectedToDate: proposedToDate })
                  })}
                  autoComplete="off" />
                   <div>
                      <span style={{ color: "red" }}>{this.state.errors["toDate"]}</span>
                    </div>
              </div>
              <div className="form-group mb-2">
              <label>Amount</label>
                <input type="text" className="form-control"
                  placeholder="Enter Value"
                  value={this.state.amount}
                  onChange={(e) => this.setState({ amount: e.target.value })}
                />
                 <div>
                      <span style={{ color: "red" }}>{this.state.errors["amount"]}</span>
                    </div>
              </div>
              {/* <div className="form-group mb-3">
                      <input type="text" className="form-control"
                        placeholder="END DATE" />
                    </div>
                    <div className="form-group mb-3">
                      <input type="text" className="form-control"
                        placeholder="GV AMOUNT" />
                    </div> */}
              <button className=""
                onClick={this.addGiftVoucher}>ADD GIFT VOUCHER</button>
            </div>
            <div className="col-12 col-sm-9">
              <h5 className="mt-2 mb-3 fs-18">List of gift vouchers</h5>
              {
                this.state.isGiftVocher > 0 && (
                  <div className="table-responsive scaling-mb">
                    <table className="table table-borderless mb-1 mt-2">
                      <thead>
                        <tr className="m-0 p-0">
                          <th className="col-1">S.NO</th>

                          <th className="col-2">GV NUMBER</th>
                          <th className="col-2">FROM DATE</th>

                          <th className="col-2">TO DATE</th>
                          <th className="col-2">VALUE</th>

                        </tr>
                      </thead>
                      <tbody>
                        {this.getGiftVocherTable()}

                      </tbody>
                    </table>
                  </div>
                )
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}
