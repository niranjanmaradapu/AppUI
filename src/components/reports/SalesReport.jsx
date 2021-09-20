import React, { Component } from 'react'

export default class SalesReport extends Component {
    render() {
        return (
            <div className="maincontent">
                <h5>Extract Sales Report </h5>
                <div className="rect">
                    <div className="row">
                        <div className="col-3">
                            <div className="form-group">
                            <label>From Date</label>
                                <input type="date" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                            <label>To Date</label>
                                <input type="date" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                            <label>Bill Type</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group mt-3 pt-2">
                                <button className="btn-login btn-create">Apply Filters </button>
                            </div>
                        </div>
                        {/* <div className="col-3">
                            <div className="custom-control custom-checkbox V1_checkbox-label mt-3">
                                <input className="custom-control-input" type="checkbox" id="remember"
                                    checked={this.state.isRemember}
                                    onChange={this.remberSalesMan}
                                />
                                <label className="custom-control-label V1_custom-control-label p-t-0 fs-14 p-l-3"
                                    htmlFor="remember"  >Remember Sales Man</label>
                            </div>
                        </div> */}
                    </div>
                </div>
                <h5 className="pl-4 mt-3">Sales Report Details</h5>
                <div className="rect p-l-0 p-r-0 pt-3">
    
                    <div className="navigation">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">Profile</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="true">Contact</button>
                        </li>
                    </ul>
                        <div class="tab-content p-4" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col-2">Location</th>
                                            <th className="col-1">Tax Desc</th>
                                            <th className="col-1">Total MRP</th>
                                            <th className="col-1">Total Dis</th>
                                            <th className="col-1">Bill Value</th>
                                            <th className="col-2">Taxable Amt</th>
                                            <th className="col-1">Tax Amt</th>
                                            <th className="col-1">SGST</th>
                                            <th className="col-1">CGST</th>
                                            <th className="col-1">IGST</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                      
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                  
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

                                        </tr>
                        
                                     
                                    </tbody>
                                </table>
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col-2">Location</th>
                                            <th className="col-1">Tax Desc</th>
                                            <th className="col-1">Total MRP</th>
                                            <th className="col-1">Total Dis</th>
                                            <th className="col-1">Bill Value</th>
                                            <th className="col-2">Taxable Amt</th>
                                            <th className="col-1">Tax Amt</th>
                                            <th className="col-1">SGST</th>
                                            <th className="col-1">CGST</th>
                                            <th className="col-1">IGST</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                      
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                  
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

                                        </tr>
                        
                                     
                                    </tbody>
                                </table>
                        </div>
                        <div class="tab-pane fade"  id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col-2">Location</th>
                                            <th className="col-1">Tax Desc</th>
                                            <th className="col-1">Total MRP</th>
                                            <th className="col-1">Total Dis</th>
                                            <th className="col-1">Bill Value</th>
                                            <th className="col-2">Taxable Amt</th>
                                            <th className="col-1">Tax Amt</th>
                                            <th className="col-1">SGST</th>
                                            <th className="col-1">CGST</th>
                                            <th className="col-1">IGST</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                      
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                  
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

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
