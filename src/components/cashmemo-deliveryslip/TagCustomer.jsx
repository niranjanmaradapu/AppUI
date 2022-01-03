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
        giftVochersList: [],
        isGiftVocher: false,
        amount: "",
        fromDate:"",
        toDate:"",
        description:""
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

  getGiftVochersList() {
    CreateDeliveryService.getGiftVochersList().then(res =>{
      if(res) {
       
        this.setState({giftVochersList: res.data.result, isGiftVocher: true});

        console.log(this.state.giftVochersList);
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

  getGiftVocherTable() {
    // return this.state.giftVochersList.length > 0 && this.state.giftVochersList.map((items, index) => {
    //   const { gvId, gvNumber, createdDate, expiryDate, totalAmount, leftOverAmount } = items;
    //   return ( 
    //     <tr key={index}>
    //                     <td className="col-1 geeks">
    //                       {index+1}
    //                     </td>
                    
    //                     <td className="col-1">{gvId}</td>
    //                     <td className="col-2">{gvNumber}</td>
    //                     <td className="col-2">{createdDate}</td>
    //                     <td className="col-2">{expiryDate}</td>
    //                     <td className="col-2">
    //                     <span className="m-r-3">₹ {totalAmount}</span>
    //                      {/* <img src={edit} className="w-12 pb-2 pointer"/>
    //                      <i className="icon-delete m-l-2 fs-16 pointer"></i> */}
    //                     </td>  
    //                     <td className="col-2">₹ {leftOverAmount}</td>
    //               </tr>
    //   );
    // });
  }

  addGiftVoucher() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const obj = {
      "gvNumber": this.state.gvNumber,
    "description": this.state.description,
    "fromDate": this.state.fromDate,
    "toDate":  this.state.toDate,
    "clientId": user["custom:clientId1"],
    "value": this.state.amount
    }
    CreateDeliveryService.saveGiftVoucher(obj).then(res =>{
      if(res && res.data.isSuccess === "true") {
        this.setState({
          gvNumber:"",
          description:"",
          fromDate:"",
          toDate:"",
          amount:""
        })
        toast.success(res.data.message)
        
      }
    });
  }

  render() {
    return (
      <div className="maincontent">
         <div className="customer-gift">
           <div className="row">
             <div className="col-12 col-sm-3">
             <h5 className="mt-2 mb-3 fs-18">Generate gift vouchure </h5>
                  <div className="form-group mt-2 mb-3">
                      <input type="search" className="form-control"
                        placeholder="Enter GV Number"  value={this.state.gvNumber}
                        onChange={(e) =>
                          this.setState({ gvNumber: e.target.value })
                        }
                         />
                    </div>
                    <div className="form-group mb-3">
                      <input type="search" className="form-control"
                          placeholder="Enter Description"
                        value={this.state.description}
                        onChange={(e) =>
                          this.setState({ description: e.target.value })
                        } />
                    </div>
                    <div className="form-group mb-3">
                    <input type="date" className="form-control"  placeholder="Enter FromDate"
                                            value={this.state.fromDate}
                                            onChange={(e) => this.setState({ fromDate: e.target.value })}
                                            autoComplete="off" />
                    </div>
                    <div className="form-group mb-3">
                    <input type="date" className="form-control"  placeholder="Enter ToDate"
                                            value={this.state.toDate}
                                            onChange={(e) => this.setState({ toDate: e.target.value })}
                                            autoComplete="off" />
                    </div>
                    <div className="form-group mb-3">
                      <input type="text" className="form-control"
                       placeholder="Enter Value"
                       value={this.state.amount}
                       onChange={(e) => this.setState({ amount: e.target.value })}
                       />
                    </div>
                    {/* <div className="form-group mb-3">
                      <input type="text" className="form-control"
                        placeholder="END DATE" />
                    </div>
                    <div className="form-group mb-3">
                      <input type="text" className="form-control"
                        placeholder="GV AMOUNT" />
                    </div> */}
                    <button className="btn-unic-search active mt-1 m-r-2" 
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
                      <th className="col-1">BARCODE</th>
                      <th className="col-2">GV NUMBER</th>
                      <th className="col-2">CREATED ON</th>
                     
                      <th className="col-2">END DATE</th>
                      <th className="col-2">VALUE</th>
                      <th className="col-2">LEFT OVER MONEY</th>
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
