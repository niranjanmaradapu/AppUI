import React, { Component } from 'react'

export default class CreateCustomer extends Component {
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
                        placeholder="CUSTOMER NAME *" />
                </div>
              </div>
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="MOBILE NUMBER *" />
                </div>
              </div>
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="email" className="form-control"
                        placeholder="EMAIL" />
                </div>
              </div>
              <div className="col-sm-4 col-12 mt-4">
              <select className="form-control">
                    <option>GENDER</option>
                    <option>MALE</option>
                    <option>FEMALE</option>
                    <option>Other</option>
                  </select>
              </div>
              <div className="col-sm-4 col-12 mt-4">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="ADDRESS *" />
                </div>
              </div>
            </div>
            <h5 className="mt-4 mb-2">Business Information(Optional) </h5>
            <div className="row mt-3">
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="GST NUMBER" />
                </div>
              </div>
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="COMPANY NAME" />
                </div>
              </div>
              <div className="col-sm-4 col-12 scaling-mb">
              <div className="form-group">
                      <input type="email" className="form-control"
                        placeholder="EMAIL" />
                </div>
              </div>
              <div className="col-sm-4 col-12 mt-4">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="PHONE NUMBER" />
                </div>
              </div>
              <div className="col-sm-4 col-12 mt-4">
              <div className="form-group">
                      <input type="text" className="form-control"
                        placeholder="ADDRESS *" />
                </div>
              </div>
              <div className="col-12 mt-4">
              <button className="btn-unic-search active m-r-2">ADD CUSTOMER</button>
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
