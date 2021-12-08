
import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import left from "../../assets/images/table_arrow_left.svg";
import right from "../../assets/images/table_arrow_right.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


export default class LoyaltyPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false,
    }
    this.addLoyalityPoints = this.addLoyalityPoints.bind(this);
    this.closeLoyalityPoints = this.closeLoyalityPoints.bind(this);
  }


  addLoyalityPoints() {
    this.setState({ isAdd: true });
  }


  closeLoyalityPoints() {
    this.setState({ isAdd: false });
  }
    render() {
        return (
            <div className="maincontent">
                      <Modal isOpen={this.state.isAdd} size="lg">
          <ModalHeader>Add Loyalty Points</ModalHeader>
          <ModalBody>
          <div className="row">
                <div className="col-4">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-control">
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                </div>
                <div className="col-12 mt-3">
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" className="form-control" placeholder="Enter Address" />
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Invoice No</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Amount Paid</label>
                  <input type="text" className="form-control" placeholder="₹" />
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Add Points </label>
                  <select className="form-control">
                    <option>Select Points</option>
                    {/* <option>Store Manager</option>
                    <option>Admin</option>
                    <option>Super Admin</option> */}
                  </select>
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Store</label>
                    <select className="form-control">
                      <option>Kukatpally</option>
                      <option>Nizampet</option>
                      <option>LB Nagar</option>
                    </select>
                </div>
                </div>
                </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeLoyalityPoints}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.closeLoyalityPoints}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
            <div className="row">
              <div className="col-sm-3 col-12">
                <div className="form-group mt-2 mb-3">
                 <select className="form-control">
                     <option>Select State</option>
                     <option>Andhra Pradesh</option>
                     <option>Telangana</option>
                 </select>
                </div>
              </div>
              <div className="col-sm-3 col-12">
                <div className="form-group mt-2 mb-3">
                <select className="form-control">
                     <option>Select District</option>
                     <option>Guntur</option>
                     <option>Krishna</option>
                 </select>
                </div>
              </div>
              <div className="col-sm-3 col-12">
                <div className="form-group mt-2 mb-3">
                <select className="form-control">
                     <option>Select Store</option>
                     <option>Bradipet</option>
                     <option>Arundel Pet</option>
                     <option>Lakshmipuram</option>
                 </select>
                </div>
              </div>
              <div className="col-sm-3 col-12 scaling-mb scaling-center">
                <button className="btn-unic-search active m-r-2 mt-2">SEARCH</button>
                <button className="btn-unic-redbdr mt-2" onClick={this.addLoyalityPoints}>Add Loyalty Points</button>
              </div>
            </div>
            <div className="row m-0 p-0 scaling-center">
              <div className="col-6 p-l-0"> <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Loyalty Customers <span className="text-red fs-14">(100 POINTS = ₹ 10)</span></h5></div>
            <div className="col-6 text-right p-r-0 mt-2 align-self-center">
            <span className="mt-3">Show on page </span><span className="font-bold fs-14"> 1-10</span><span> out of 11</span><button className="btn-transparent" type="button"><img src={left} /></button><button className="btn-transparent" type="button"><img src={right} /></button>
          </div>
             
              <div className="table-responsive p-0">
              <table className="table table-borderless mb-1 mt-2">
                <thead>
                  <tr className="m-0 p-0">
                    <th className="col-1">S.NO</th>
                    <th className="col-2">Customer Name</th>
                    <th className="col-2">Mobile Number</th>
                    <th className="col-2">Loyalty Points</th>
                    <th className="col-2">Expiry Date</th>
                    <th className="col-2">Points Value</th>
                    <th className="col-1"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-1 underline geeks">01</td>
                    <td className="col-2">Ramesh G</td>
                    <td className="col-2">+91XXX XXX 1233</td>
                    <td className="col-2">5000</td>
                    <td className="col-2">30 Sep 2021</td>
                    <td className="col-2">₹ 500</td>
                    <td className="col-1">  
                    <img src={edit} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i></td>
                  </tr>
                  <tr>
                    <td className="col-1 underline geeks">02</td>
                    <td className="col-2">Santhosh Kumar</td>
                    <td className="col-2">+91XXX XXX 1212</td>
                    <td className="col-2">5000</td>
                    <td className="col-2">30 Sep 2021</td>
                    <td className="col-2">₹ 500</td>
                    <td className="col-1">  
                    <img src={edit} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i></td>
                  </tr>
                  <tr>
                    <td className="col-1 underline geeks">03</td>
                    <td className="col-2">Ramya Sree</td>
                    <td className="col-2">+91XXX XXX 1212</td>
                    <td className="col-2">5000</td>
                    <td className="col-2">30 Sep 2021</td>
                    <td className="col-2">₹ 500</td>
                    <td className="col-1">  
                    <img src={edit} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i></td>
                  </tr>
                  <tr>
                    <td className="col-1 underline geeks">04</td>
                    <td className="col-2">Sandhya Rani</td>
                    <td className="col-2">+91XXX XXX 1213</td>
                    <td className="col-2">5000</td>
                    <td className="col-2">30 Sep 2021</td>
                    <td className="col-2">₹ 500</td>
                    <td className="col-1">  
                    <img src={edit} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i></td>
                  </tr>
                  <tr>
                    <td className="col-1 underline geeks">05</td>
                    <td className="col-2">Kumar</td>
                    <td className="col-2">+91XXX XXX 1213</td>
                    <td className="col-2">5000</td>
                    <td className="col-2">30 Sep 2021</td>
                    <td className="col-2">₹ 500</td>
                    <td className="col-1">  
                    <img src={edit} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i></td>
                  </tr>
                  <tr>
                    <td className="col-1 underline geeks">06</td>
                    <td className="col-2">Ravi Raj</td>
                    <td className="col-2">+91XXX XXX 1213</td>
                    <td className="col-2">5000</td>
                    <td className="col-2">30 Sep 2021</td>
                    <td className="col-2">₹ 500</td>
                    <td className="col-1">  
                    <img src={edit} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i></td>
                  </tr>
                  <tr>
                    <td className="col-1 underline geeks">07</td>
                    <td className="col-2">Ravi</td>
                    <td className="col-2">+91XXX XXX 1213</td>
                    <td className="col-2">5000</td>
                    <td className="col-2">30 Sep 2021</td>
                    <td className="col-2">₹ 500</td>
                    <td className="col-1">  
                    <img src={edit} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i></td>
                  </tr>
                </tbody>
              </table>
             </div>
    
            </div>
    
          </div>
        )
    }
}
