import React, { Component } from 'react'

export default class Retail extends Component {
    render() {
        return (
            <div className="maincontent">
            
                <div className="row">
                    <div className="col-6">
                    <h5>Retail New Sale</h5>
                    <div className="rect">
                            <div className="row m-0 p-0">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Invoice Number</label>
                                        <input type="text" className="form-control" placeholder="Enter Invoice Number"/>
                                    </div>   
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Invoice Date</label>
                                        <input type="date" className="form-control" placeholder="DD/MM/YY"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-2">
                                    <div className="form-group">
                                        <label>Till ID</label>
                                        <input type="text" className="form-control" placeholder="Enter ID"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-2">
                                    <div className="form-group">
                                        <label>Payment Type</label>
                                        <input type="text" className="form-control" placeholder="Enter Payment Type"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-2">
                                    <div className="form-group">
                                        <label>User ID</label>
                                        <input type="text" className="form-control" placeholder="Enter ID"/>
                                    </div>   
                                </div>
                                <hr className="mt-3 mb-2"/>
                                <div className="col-12 row pb-3">
                                <div className="col-6 mt-2 p-r-0">
                                    <div className="form-group">
                                        <label>Barcode</label>
                                        <input type="text" className="form-control" placeholder="Enter Barcode"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-4 pt-2 p-l-4">
                                    <button type="button" className="btn-login btn-create">SALES RETURN</button>
                                </div>
                                </div>
                            </div>
                     </div>   
                </div>
                <div className="col-6">
                <h5>Add Item </h5>
                    <div className="rect-blue">
                            <div className="row m-0 p-0">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>No.of Items</label>
                                        <input type="text" className="form-control" placeholder="Enter No.of Items"/>
                                    </div>   
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Barcode</label>
                                        <input type="text" className="form-control" placeholder="Etner Barcode"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-3">
                                    <div className="form-group">
                                        <label>Till ID</label>
                                        <input type="text" className="form-control" placeholder="Enter ID"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-3">
                                    <div className="form-group">
                                        <label>Product</label>
                                        <input type="text" className="form-control" placeholder="Enter Product"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-3">
                                    <div className="form-group">
                                        <label>Price Per Qty</label>
                                        <input type="number" className="form-control" placeholder="Enter Price"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-3">
                                    <div className="form-group">
                                        <label>Discount</label>
                                        <input type="number" className="form-control" placeholder="%"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-3 pb-3">
                                    <div className="form-group">
                                        <label>Sales Rate  (Inclusive of Taxes)</label>
                                        <input type="number" className="form-control" placeholder="Enter Sales Rate"/>
                                    </div>   
                                </div>
                                <div className="col-6 mt-3 pt-4">
                                <button type="button" className="btn-bdr w-100 bg-white">ADD ITEM</button>
                                </div>
                              </div>  
                     </div>   
                </div>
            </div>
            <div className="row m-0 p-0 mt-3 mb-2">
                <div className="col-4 p-l-0">
                    <h5 className="mt-3">Item Details</h5>
                </div>
                <div className="col-8 text-right pt-2 p-r-0">
                      <button type="button" className="btn-bdr bg-white m-l-2">CASH <p className="mb-0">CTL+1</p></button>
                      <button type="button" className="btn-bdr bg-white m-l-2">CREDIT CARD <p className="mb-0">CTL+2</p></button>
                      <button type="button" className="btn-bdr bg-white m-l-2">DEBIT CARD <p className="mb-0">CTL+3</p></button>
                      <button type="button" className="btn-bdr bg-white m-l-2 active">WALLET <p className="mb-0">CTL+4</p></button>
                      <button type="button" className="btn-grey active m-l-2">CREDIT CUSTOMER <p className="mb-0">CTL+5</p></button>
                </div>
            </div>

            <div className="rect p-0 pb-3">
                            <div className="p-2">
                            <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col-1">S.No</th>
                                            <th className="col-2">Barcode</th>
                                            <th className="col-2">Product</th>
                                            <th className="col-2">Price Per Qty</th>
                                            <th className="col-2">Discount</th>
                                            <th className="col-1">VAT</th>
                                            <th className="col-2">Sales Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row m-0 p-0">
                                        <td className="col-1">01</td>
                                          <td className="col-2">COA238106</td>
                                          <td className="col-2">Dairy Milk Chocolate</td>
                                          <td className="col-2">₹ 200:00 </td>
                                          <td className="col-2">10 % </td>
                                          <td className="col-1">14:40 </td>
                                          <td className="col-2">₹ 300:00 </td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                        <td className="col-1">02</td>
                                          <td className="col-2">COA238106</td>
                                          <td className="col-2">Dairy Milk Chocolate</td>
                                          <td className="col-2">₹ 200:00 </td>
                                          <td className="col-2">10 % </td>
                                          <td className="col-1">14:40 </td>
                                          <td className="col-2">₹ 300:00 </td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                        <td className="col-1">02</td>
                                          <td className="col-2">COA238106</td>
                                          <td className="col-2">Dairy Milk Chocolate</td>
                                          <td className="col-2">₹ 200:00 </td>
                                          <td className="col-2">10 % </td>
                                          <td className="col-1">14:40 </td>
                                          <td className="col-2">₹ 300:00 </td>
                                        </tr>
                                                             
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    <div className="rect-features mt-3">

                        <ul>
                            <li>
                            <button type="button" className="btn-grey active m-r-3">New Trans <p className="mb-0">F1</p></button>
                            </li>
                            <li> <button type="button" className="btn-bdr active m-r-3 m-l-3">Save Point <p className="mb-0">F2</p></button></li>
                            <li>
                            <button type="button" className="btn-dark_blue active m-r-3 m-l-3">Get Cash<p className="mb-0">F3</p></button>
                            </li>
                            <li>
                            <button type="button" className="btn-dark_blue active m-r-3 m-l-3">Lock Trans<p className="mb-0">F4</p></button>
                            </li>
                            <li>
                            <button type="button" className="btn-dark_blue active m-r-3 m-l-3">Close Tally<p className="mb-0">F5</p></button>
                            </li>
                            <li>
                            <button type="button" className="btn-dark_blue active m-r-3 m-l-3">Scan Items<p className="mb-0">F6</p></button>
                            </li>
                            <li>
                            <button type="button" className="btn-dark_blue active m-l-3">Delete Row<p className="mb-0">F7</p></button>
                            </li>

                        </ul>
                        
                       
                      
                        
                      
                    
                       
                        </div>
                        <div className="col-12 p-0 m-0 mt-1">
                        <button type="button" className="btn-grey active m-r-2">New Trans <p className="mb-0">F1</p></button>
                        <button type="button" className="btn-bdr active m-r-2">Save Point <p className="mb-0">F2</p></button>
                        <button type="button" className="btn-dark_blue active m-r-2">Get Cash<p className="mb-0">F3</p></button>
                        <button type="button" className="btn-dark_blue active m-r-2">Lock Trans<p className="mb-0">F4</p></button>
                        <button type="button" className="btn-dark_blue active m-r-2">Close Tally<p className="mb-0">F5</p></button>
                        <button type="button" className="btn-dark_blue active m-r-2">Scan Items<p className="mb-0">F6</p></button>
                        <button type="button" className="btn-dark_blue active m-r-2">Delete Row<p className="mb-0">F7</p></button>
                        </div>
                
            </div>
        )
    }
}
