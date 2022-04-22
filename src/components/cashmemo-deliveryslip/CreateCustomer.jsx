import React, { Component } from 'react'
import { toast } from 'react-toastify';
import CreateDeliveryService from '../../services/CreateDeliveryService';

export default class CreateCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phoneNumber: "",
      birthDate: "",
      gender: "",
      name: "",
      username: "",
      tempPassword: "Otsi@123",
      parentId: "1",
      domianId: "802",
      address: "",
      role: {
        roleName: ""
      },
      stores: [],
      clientId: "",
      isConfigUser: "",
      clientDomain: [],
      gstNumber: "",
      gstmobile: "",
      gstemail: "",
      gstaddress: "",
      isCustomer: "true",
      isConfigUser: "false",
      errors: {},

    };

    this.addCustomer = this.addCustomer.bind(this);
  }

  handleValidation() {
    let errors = {};
    let formIsValid = true;

    //Name
    if (!this.state.name) {
        formIsValid = false;
        errors["name"] = "Enter name";
    }

   


    // Mobile
    if (!this.state.phoneNumber) {
        formIsValid = false;
        errors["mobileNumber"] = "Enter Mobile Number";
    }

    // if (typeof this.state.mobileNumber !== "undefined") {
    //     if (!this.state.mobileNumber.match(/^[0-9\b]+$/)) {
    //         formIsValid = false;
    //         errors["mobileNumber"] = "Please Enter Valid Mobile Number";
    //     }
    // }

    //email 
    if (!this.state.email) {
        formIsValid = false;
        errors["email"] = "Enter email";
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


  addCustomer() {
    const formValid = this.handleValidation();
         if (formValid) {


    this.state.phoneNumber = "+91" + this.state.phoneNumber;
    CreateDeliveryService.addCustomer(this.state).then(res => {
      if (res) {
        toast.success(res.data.result.body);
        this.setState({
          email: "",
          phoneNumber: "",
          birthDate: "",
          gender: "",
          name: "",
          username: "",
          tempPassword: "Otsi@123",
          parentId: "1",
          domianId: "802",
          address: "",
          role: {
            roleName: ""
          },
          stores: [],
          clientId: "",
          isConfigUser: "",
          clientDomain: [],
          gstNumber: "",
          gstmobile: "",
          gstemail: "",
          gstaddress: "",
          isCustomer: "true",
          isConfigUser: "false"
        })
      }
    });
  } else {
    toast.error("Please enter all mandatory fields");
  }

  }
  render() {
    return (
      <div className="maincontent">
        <div className="customer-bg">
          <h5 className="mt-2">Personal Information </h5>
          <div className="row">
            <div className="col-sm-9 col-12">
              <div className="row mt-2">
                <div className="col-sm-4 col-12 scaling-mb">
                  <div className="form-group">
                    <input type="text" className="form-control"
                      placeholder="CUSTOMER NAME *" autoFocus
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value, username: e.target.value })}
                      autoComplete="off" />
                    <div>
                      <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 col-12 scaling-mb">
                  <div className="form-group">
                    <input type="text" className="form-control"
                      placeholder="MOBILE NUMBER *" autoFocus
                      value={this.state.phoneNumber} maxLength="10" minLength="10"
                      onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                      autoComplete="off" />
                    <div>
                      <span style={{ color: "red" }}>{this.state.errors["mobileNumber"]}</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 col-12 scaling-mb">
                  <div className="form-group">
                    <input type="email" className="form-control"
                      placeholder="EMAIL *" autoFocus
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      autoComplete="off" />
                    <div>
                      <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-4">
                  <select className="form-control" value={this.state.gender}
                    onChange={(e) => this.setState({ gender: e.target.value })} >
                    <option>GENDER</option>
                    <option>MALE</option>
                    <option>FEMALE</option>
                  </select>
                </div>
                <div className="col-sm-4 col-12 mt-4">
                  <div className="form-group">
                    <input type="text" className="form-control"
                      placeholder="ADDRESS" value={this.state.address}
                      onChange={(e) => this.setState({ address: e.target.value })} autoComplete="off" />
                  </div>
                </div>
              </div>
              {/* <h5 className="mt-4 mb-2">Business Information(Optional) </h5> */}
              <div className="row mt-3">
                {/* <div className="col-sm-4 col-12 scaling-mb">
                  <div className="form-group">
                    <input type="text" className="form-control"
                      placeholder="GST NUMBER" value={this.state.gstNumber}
                      onChange={(e) => this.setState({ gstNumber: e.target.value })} autoComplete="off"
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-12 scaling-mb">
                  <div className="form-group">
                    <input type="text" className="form-control"
                      placeholder="COMPANY NAME" value={this.state.companyName}
                      onChange={(e) => this.setState({ companyName: e.target.value })} autoComplete="off"
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-12 scaling-mb">
                  <div className="form-group">
                    <input type="email" className="form-control"
                      placeholder="EMAIL"
                      value={this.state.gstemail}
                      onChange={(e) => this.setState({ gstemail: e.target.value })} autoComplete="off"
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-4">
                  <div className="form-group">
                    <input type="text" className="form-control"
                      placeholder="PHONE NUMBER"
                      value={this.state.gstmobile}
                      onChange={(e) => this.setState({ gstmobile: e.target.value })} autoComplete="off"
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-4">
                  <div className="form-group">
                    <input type="text" className="form-control"
                      placeholder="ADDRESS *"
                      value={this.state.gstaddress}
                      onChange={(e) => this.setState({ gstaddress: e.target.value })} autoComplete="off"
                    />
                  </div>
                </div> */}
                <div className="col-12 mt-4">
                  <button className="btn-unic-search active m-r-2" onClick={this.addCustomer}>ADD CUSTOMER</button>
                </div>
              </div>
            </div>
            <div className="col-3">

            </div>
          </div>
        </div>
      </div>
    )
  }
}
