import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg'

export default class TagCustomer extends Component {
  render() {
    return (
      <div className="maincontent">
         <div className="customer-gift">
           <div className="row">
             <div className="col-12 col-sm-3">
             <h5 className="mt-2 mb-3 fs-18">Generate gift vouchure </h5>
                  <div className="form-group mt-2 mb-3">
                      <input type="search" className="form-control"
                        placeholder="ENTER BARCODE" />
                    </div>
                    <div className="form-group mb-3">
                      <input type="search" className="form-control"
                        placeholder="GV NUMBER" />
                    </div>
                    <div className="form-group mb-3">
                      <input type="text" className="form-control"
                        placeholder="START DATE" />
                    </div>
                    <div className="form-group mb-3">
                      <input type="text" className="form-control"
                        placeholder="END DATE" />
                    </div>
                    <div className="form-group mb-3">
                      <input type="text" className="form-control"
                        placeholder="GV AMOUNT" />
                    </div>
                    <button className="btn-unic-search active mt-1 m-r-2">GENERATE VOUCHER</button>
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
