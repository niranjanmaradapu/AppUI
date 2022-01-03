import React, { Component } from 'react'
import { toast } from 'react-toastify';
import CreateDeliveryService from '../../services/CreateDeliveryService';

export default class CreateCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",	
phoneNumber:"",
birthDate:"",
gender:"",
name:"",
username:"",
tempPassword:"Otsi@123",
parentId:"1",
domianId:"802",
address:"",
role:{
    roleName:""
},
stores:[],
clientId:"",
isConfigUser:"",
clientDomain:[],
gstNumber: "",
gstmobile:"",
gstemail:"",
gstaddress:"",
isCustomer:"true",
isConfigUser:"false"

    };

    this.addCustomer = this.addCustomer.bind(this);
  }


  addCustomer() {
    this.state.phoneNumber = "+91"+ this.state.phoneNumber;
    CreateDeliveryService.addCustomer(this.state).then(res =>{
      if(res) {
      toast.success(res.data.result.body);
      this.setState({
        email:"",	
        phoneNumber:"",
        birthDate:"",
        gender:"",
        name:"",
        username:"",
        tempPassword:"Otsi@123",
        parentId:"1",
        domianId:"802",
        address:"",
        role:{
            roleName:""
        },
        stores:[],
        clientId:"",
        isConfigUser:"",
        clientDomain:[],
        gstNumber: "",
        gstmobile:"",
        gstemail:"",
        gstaddress:"",
        isCustomer:"true",
        isConfigUser:"false"
      })
      }
    });

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
                        autoComplete="off"/>
                </div>
              </div>
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="MOBILE NUMBER *" autoFocus
                        value={this.state.phoneNumber} maxLength="10" minLength="10"
                        onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                        autoComplete="off"/>
                </div>
              </div>
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="email" className="form-control"
                        placeholder="EMAIL" autoFocus
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        autoComplete="off" />
                </div>
              </div>
              <div className="col-sm-4 col-12 mt-4">
              <select className="form-control"  value={this.state.gender}
                        onChange={(e) => this.setState({ gender: e.target.value })} >
                    <option>GENDER</option>
                    <option>MALE</option>
                    <option>FEMALE</option>
                  </select>
              </div>
              <div className="col-sm-4 col-12 mt-4">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="ADDRESS *"  value={this.state.address}
                        onChange={(e) => this.setState({ address: e.target.value })}  autoComplete="off" />
                </div>
              </div>
            </div>
            <h5 className="mt-4 mb-2">Business Information(Optional) </h5>
            <div className="row mt-3">
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="GST NUMBER"  value={this.state.gstNumber}
                        onChange={(e) => this.setState({ gstNumber: e.target.value })}  autoComplete="off" 
                         />
                </div>
              </div>
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="COMPANY NAME"  value={this.state.companyName}
                        onChange={(e) => this.setState({ companyName: e.target.value })}  autoComplete="off" 
                         />
                </div>
              </div>
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="email" className="form-control"
                        placeholder="EMAIL" 
                        value={this.state.gstemail}
                        onChange={(e) => this.setState({ gstemail: e.target.value })}  autoComplete="off" 
                        />
                </div>
              </div>
              <div className="col-sm-4 col-12 mt-4">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="PHONE NUMBER" 
                        value={this.state.gstmobile}
                        onChange={(e) => this.setState({ gstmobile: e.target.value })}  autoComplete="off" 
                        />
                </div>
              </div>
              <div className="col-sm-4 col-12 mt-4">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="ADDRESS *" 
                        value={this.state.gstaddress}
                        onChange={(e) => this.setState({ gstaddress: e.target.value })}  autoComplete="off" 
                        />
                </div>
              </div>
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
