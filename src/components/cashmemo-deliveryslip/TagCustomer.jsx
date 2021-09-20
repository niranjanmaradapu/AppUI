import React, { Component } from "react";
import TagCustomerToGvService from "../../services/TagCustomerToGvService";
import { ToastContainer, toast } from "react-toastify";
import CreateCustomerService from "../../services/CreateCustomerService";

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
      },
    };
    this.state = {
      mobilenumber: "",

      name: "",

      gvNumber: "",
      giftId: null,
      custId: null,
      mobileData: {
        address: "",
        altMobileNo: "",
        dob: "",
        customerId: 0,
        gender: "",
        gstNumber: "",
        mobileNumber: "",
        name: "",
        email: "",
      },
    };
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeGvNumber = this.handleChangeGvNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTagCustomerToGv = this.createTagCustomerToGv.bind(this);
  }

  handleChangeMobile(event) {
    this.setState({ mobileNumber: event.target.value });
  }

  handleChangeGvNumber(event) {
    this.setState({ gvNumber: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("state values", this.state);
    this.createTagCustomerToGv();
  }

  hideModal = () => {
    this.state.mobileNumber = "";
    this.state.name = "";
    this.state.gvNumber = "";

    this.setState({
      openn: false,
    });
  };

  createTagCustomerToGv() {
    // const obj = {
    //     customerId:this.state.customerId,
    //     gvId:this.state.gvId
    // }

    TagCustomerToGvService.createTagCustomerToGv(
      this.state.customerId,
      this.state.gvId
    ).then((res) => {
      if (this.state.mobileNumber && this.state.name && this.state.gvNumber && res.data !== "Gift voucher is not valid") {
        toast.success(res.data);
        this.setState({});
      } else {
        toast.error("Gift voucher is not valid");
      }
    });
  }

  getMobileDetails = (e) => {
    if (e.key === "Enter") {
      if (this.state.mobileNumber.trim().length === 10) {
        TagCustomerToGvService.getMobileData(this.state.mobileNumber).then(
          (res) => {
            console.log(res);
            if (res.status === 200) {
              toast.success("Mobile Details Fetched Successfully");
              this.state.mobileData = res.data.body;
              this.setState({
                isUserTagged: true,
                customerId: res.data.customerId,
                name: res.data.name,
                mobileNumber: res.data.mobileNumber,
                gstNumber: res.data.gstNumber,
                address: res.data.address,
                email: res.data.email,
                dob: res.data.dob,
                gender: res.data.gender,
                altMobileNo: res.data.altMobileNo,
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
      TagCustomerToGvService.getGvNumberData(this.state.gvNumber).then(
        (res) => {
          console.log(res);
          if (res.data.statusCodeValue === 200) {
            toast.success("GvNumber Details Fetched Successfully");
            this.state.gvNumberData = res.data.body;
            this.setState({
              isUserTagged: true,
              gvNumber: res.data.body.gvNumber,

              gvId: res.data.body.gvId,
              userId: res.data.body.userId,
              description: res.data.body.description,
              isTagged: res.data.body.isTagged,
              expiryDate: res.data.body.expiryDate,
              totalAmount: res.data.body.totalAmount,
              leftOverAmount: res.data.body.leftOverAmount,
              createdDate: res.data.body.createdDate,
            });
          } else {
            this.setState({
              isUserTagged: false,
            });
            toast.error(res.data.body);
          }
        }
      );
      //   this.handleChange = this.handleChange.bind(this);
      //   this.getMobileDetails = this.getMobileDetails.bind(this);
      //   this.getGiftDetails = this.getGiftDetails.bind(this);
      //   this.tagCustomer = this.tagCustomer.bind(this);
    }
  };

  //   handleChange(event) {
  //     this.setState({ mobilenumber: event.target.value });
  //   }
  //   tagCustomer() {
  //     if (this.state.mobilenumber && this.state.name && this.state.gvNumber) {
  //       CreateCustomerService.createTag(
  //         this.state.custId,
  //         this.state.giftId
  //       ).then((res) => {
  //         toast.success(res.data);
  //         console.log(res);
  //       });
  //     } else {
  //       toast.info("Please fill All Mandatory fields !");
  //     }
  //   }
  //   getMobileDetails = (e) => {
  //     if (e.key === "Enter") {
  //       CreateCustomerService.getMobileData(this.state.mobilenumber).then(
  //         (res) => {
  //           console.log(res);
  //           if (res.status === 200) {
  //             this.state.mobileData = res.data;
  //             this.setState({ name: res.data.name });
  //             this.setState({ custId: res.data.customerId });
  //             console.log(this.state.mobileData.customerId);
  //           } else {
  //             toast.error(res.data.body);
  //           }
  //         }
  //       );
  //     }
  //   };
  //   getGiftDetails = (e) => {
  //     if (e.key === "Enter") {
  //       CreateCustomerService.getGiftData(this.state.gvNumber).then((res) => {
  //         console.log(res);
  //         if (res.status === 200) {
  //           // this.state.mobileData = res.data;
  //           this.setState({ giftId: res.data.body.gvId });
  //           console.log(this.state.giftId);
  //         } else {
  //           toast.error(res.data.body);
  //         }
  //       });
  //     }
  //   };

  render() {
    return (
      <div className="maincontent">
        <div className="row">
          <div className="col-6">
            <h5>Tag Customer To GV</h5>
          </div>

          <div className="rect">
            <div className="row">
              {/* <div className="col-3">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    id="mobileNumber"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    value={this.state.mobileNumber}
                    onChange={this.handleChangeMobile}
                    minLength="10"
                    maxLength="10"
                    onKeyPress={this.getMobileDetails}
                  />

                </div>
              </div> */}

              {/* <div className="col-3">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </div>
              </div> */}
              <div className="rect">
                <div className="row">
                  <div className="col-3">
                    <div className="form-group">
                      <label>Mobile Number</label>
                      {/* <input
                        type="text"
                        name="mobile"
                        className="form-control"
                        value={this.state.mobilenumber}
                        onChange={this.handleChange}
                        minLength="10"
                        maxLength="10"
                        onKeyPress={this.getMobileDetails}
                        autoComplete="off"
                      /> */}
                      <input
                        type="text"
                        name="mobileNumber"
                        id="mobileNumber"
                        className="form-control"
                        placeholder="Enter Mobile Number"
                        value={this.state.mobileNumber}
                        onChange={this.handleChangeMobile}
                        minLength="10"
                        maxLength="10"
                        onKeyPress={this.getMobileDetails}
                      />

                      {/* <button className="btn-nobg"><img src={barcode} /></button> */}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="form-group">
                      <label>Customer Name</label>
                      {/* <input
                        type="text"
                        className="form-control"
                        name="cus"
                        placeholder="Enter Name"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      /> */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="form-group">
                      <label>GV Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter GV Number"
                        value={this.state.gvNumber}
                        disabled={!this.state.customerId}
                        // onChange={(e) => this.setState({ gvNumber: e.target.value })}
                        onChange={this.handleChangeGvNumber}
                        onKeyPress={this.getGvNumberDetails}
                      />
                    </div>
                  </div>

                  {/* <div className="col-3">
                    <div className="form-group">
                      <label>GV Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="gv"
                        placeholder="Enter GV Number"
                        value={this.state.gvNumber}
                        onChange={(e) =>
                          this.setState({ gvNumber: e.target.value })
                        }
                        onKeyPress={this.getGiftDetails}
                      />
                    </div>
                  </div> */}

                  <div className="col-3 pt-4">
                    <div className="form-group">
                      <button
                        className="btn-bdr w-100"
                        disable={
                          !this.state.customerId ||
                          !this.state.gvId ||
                          !this.state.mobileNumber ||
                          !this.state.name ||
                          !this.state.gvNumber
                        }
                        onClick={this.handleSubmit}
                      >
                        CREATE
                      </button>
                    </div>
                    {/* <div className="col-3 pt-4">
                      <div className="form-group">
                        <button
                          className="btn-bdr w-100"
                          onClick={this.tagCustomer}
                        >
                          CREATE{" "}
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
