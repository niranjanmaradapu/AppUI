import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { ToastContainer, toast } from "react-toastify";
import CreateDeliveryService from '../../services/CreateDeliveryService';

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
                email:res.data.result.email,
                dob:res.data.result.dob,
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

  render() {
    return (
      <div className="maincontent">
         <div className="customer-gift">
           <div className="row">
             <div className="col-12 col-sm-3">
             <h5 className="mt-2 mb-3 fs-18">Generate gift vouchure </h5>
                  <div className="form-group mt-2 mb-3">
                      <input type="search" className="form-control"
                        placeholder="Enter MobileNumber"  value={this.state.mobileNumber}
                        onChange={this.handleChangeMobile}
                        minLength="10"
                        maxLength="10"
                        onKeyPress={this.getMobileDetails} />
                    </div>
                    <div className="form-group mb-3">
                      <input type="search" className="form-control"
                          placeholder="Enter Name"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        } />
                    </div>
                    <div className="form-group mb-3">
                      <input type="text" className="form-control"
                       placeholder="Enter GV Number"
                       value={this.state.gvNumber}
                       disabled={!this.state.customerId}
                       onChange={this.handleChangeGvNumber}
                       onKeyPress={this.getGvNumberDetails} />
                    </div>
                    {/* <div className="form-group mb-3">
                      <input type="text" className="form-control"
                        placeholder="END DATE" />
                    </div>
                    <div className="form-group mb-3">
                      <input type="text" className="form-control"
                        placeholder="GV AMOUNT" />
                    </div> */}
                    <button className="btn-unic-search active mt-1 m-r-2"  disable={
                          !this.state.customerId ||
                          !this.state.gvId ||
                          !this.state.mobileNumber ||
                          !this.state.name ||
                          !this.state.gvNumber
                        }
                        onClick={this.handleSubmit}>GENERATE VOUCHER</button>
             </div>
             <div className="col-12 col-sm-9">
             <h5 className="mt-2 mb-3 fs-18">List of gift vouchers</h5>
             <div className="table-responsive scaling-mb">
             <table className="table table-borderless mb-1 mt-2">
                  <thead>
                    <tr className="m-0 p-0">
                      <th className="col-1">S.NO</th>
                      <th className="col-1">BARCODE</th>
                      <th className="col-2">GV NUMBER</th>
                      <th className="col-2">CREATED ON</th>
                      <th className="col-2">START DATE</th>
                      <th className="col-2">END DATE</th>
                      <th className="col-2">VALUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td className="col-1 geeks">
                          01
                        </td>
                    
                        <td className="col-1">BAR3563</td>
                        <td className="col-2">GV2523</td>
                        <td className="col-2">15 Sep 2021</td>
                        <td className="col-2">23 Sep 2021</td>
                        <td className="col-2">23 Oct 2021</td>
                        <td className="col-2">
                        <span className="m-r-3">₹ 1,400.00</span>
                         <img src={edit} className="w-12 pb-2 pointer"/>
                         <i className="icon-delete m-l-2 fs-16 pointer"></i>
                        </td>  
                  </tr>
                  <tr>
                        <td className="col-1 geeks">
                          02
                        </td>
                    
                        <td className="col-1">BAR3557</td>
                        <td className="col-2">GV2527</td>
                        <td className="col-2">17 Sep 2021</td>
                        <td className="col-2">22 Sep 2021</td>
                        <td className="col-2">22 Oct 2021</td>
                        <td className="col-2">
                        <span className="m-r-3">₹ 1,400.00</span>
                         <img src={edit} className="w-12 pb-2 pointer"/>
                         <i className="icon-delete m-l-2 fs-16 pointer"></i>
                        </td>  
                  </tr>
                  <tr>
                        <td className="col-1 geeks">
                          03
                        </td>
                    
                        <td className="col-1">BAR3526</td>
                        <td className="col-2">GV2526</td>
                        <td className="col-2">15 Sep 2021</td>
                        <td className="col-2">21 Sep 2021</td>
                        <td className="col-2">21 Oct 2021</td>
                        <td className="col-2">
                        <span className="m-r-3">₹ 1,500.00</span>
                         <img src={edit} className="w-12 pb-2 pointer"/>
                         <i className="icon-delete m-l-2 fs-16 pointer"></i>
                        </td>  
                  </tr>
                  <tr>
                        <td className="col-1 geeks">
                          04
                        </td>
                    
                        <td className="col-1">BAR3534</td>
                        <td className="col-2">GV2525</td>
                        <td className="col-2">18 Sep 2021</td>
                        <td className="col-2">25 Sep 2021</td>
                        <td className="col-2">25 Oct 2021</td>
                        <td className="col-2">
                         <span className="m-r-3">₹ 1,000.00</span>
                         <img src={edit} className="w-12 pb-2 pointer"/>
                         <i className="icon-delete m-l-2 fs-16 pointer"></i>
                        </td>  
                  </tr>
                  <tr>
                        <td className="col-1 geeks">
                          05
                        </td>
                    
                        <td className="col-1">BAR3534</td>
                        <td className="col-2">GV2525</td>
                        <td className="col-2">18 Sep 2021</td>
                        <td className="col-2">25 Sep 2021</td>
                        <td className="col-2">25 Oct 2021</td>
                        <td className="col-2">
                         <span className="m-r-3">₹ 1,000.00</span>
                         <img src={edit} className="w-12 pb-2 pointer"/>
                         <i className="icon-delete m-l-2 fs-16 pointer"></i>
                        </td>  
                  </tr>
                  <tr>
                        <td className="col-1 geeks">
                          06
                        </td>
                    
                        <td className="col-1">BAR3534</td>
                        <td className="col-2">GV2525</td>
                        <td className="col-2">18 Sep 2021</td>
                        <td className="col-2">25 Sep 2021</td>
                        <td className="col-2">25 Oct 2021</td>
                        <td className="col-2">
                         <span className="m-r-3">₹ 1,000.00</span>
                         <img src={edit} className="w-12 pb-2 pointer"/>
                         <i className="icon-delete m-l-2 fs-16 pointer"></i>
                        </td>  
                  </tr>
                  <tr>
                        <td className="col-1 geeks">
                          07
                        </td>
                    
                        <td className="col-1">BAR3557</td>
                        <td className="col-2">GV2527</td>
                        <td className="col-2">17 Sep 2021</td>
                        <td className="col-2">22 Sep 2021</td>
                        <td className="col-2">22 Oct 2021</td>
                        <td className="col-2">
                        <span className="m-r-3">₹ 1,400.00</span>
                         <img src={edit} className="w-12 pb-2 pointer"/>
                         <i className="icon-delete m-l-2 fs-16 pointer"></i>
                        </td>  
                  </tr>
                  <tr>
                        <td className="col-1 geeks">
                          08
                        </td>
                    
                        <td className="col-1">BAR3557</td>
                        <td className="col-2">GV2527</td>
                        <td className="col-2">17 Sep 2021</td>
                        <td className="col-2">22 Sep 2021</td>
                        <td className="col-2">22 Oct 2021</td>
                        <td className="col-2">
                        <span className="m-r-3">₹ 1,400.00</span>
                         <img src={edit} className="w-12 pb-2 pointer"/>
                         <i className="icon-delete m-l-2 fs-16 pointer"></i>
                        </td>  
                  </tr>
                  <tr>
                        <td className="col-1 geeks">
                          09
                        </td>
                    
                        <td className="col-1">BAR3557</td>
                        <td className="col-2">GV2527</td>
                        <td className="col-2">17 Sep 2021</td>
                        <td className="col-2">22 Sep 2021</td>
                        <td className="col-2">22 Oct 2021</td>
                        <td className="col-2">
                        <span className="m-r-3">₹ 1,400.00</span>
                         <img src={edit} className="w-12 pb-2 pointer"/>
                         <i className="icon-delete m-l-2 fs-16 pointer"></i>
                        </td>  
                  </tr>
                  </tbody>
                </table>
                </div>
             </div>
           </div>
         </div>
      </div>     
    )
  }
}
