import React, { Component } from 'react'

export default class ListOfSaleBills extends Component {
    constructor(props){
        super(props)
        this.state={
         RecentSaleNumber:sessionStorage.getItem('recentSale')
        }
    }
    render() {
        return (
            <div className="maincontent">
            <h5>Find Sales Bills </h5>
            <div className="rect">
                <div className="row">
                <div className="col-2">
                        <div className="form-group">
                        <label>Biller Number</label>
                            <input type="search" className="form-control" />
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                        <label>Invoice Number</label>
                            <input type="search" className="form-control" />
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                        <label>Bill Status</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                        <label>From Date</label>
                            <input type="date" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                        <label>To Date</label>
                            <input type="date" className="form-control"/>
                        </div>
                    </div>
               
                    <div className="col-2">
                        <div className="form-group">
                        <label>DS Number</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-2 mt-2">
                        <div className="form-group">
                        <label>Customer Mobile Number</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-2 mt-2">
                        <div className="form-group">
                        <label>Barcode</label>
                            <input type="search" className="form-control" />
                        </div>
                    </div>
                    <div className="col-2 mt-2">
                        <div className="form-group mt-3 pt-2">
                            <button className="btn-login btn-create">Apply Filters </button>
                        </div>
                    </div>
                </div>
            </div>
            <h5 className="pl-4 mt-3">LIst Of Sales Bills</h5>
              <div className="rect p-l-3 p-r-3 pt-3">
                <table className="table table-borderless">
                <thead>
                    <tr className="row m-0 p-0">
                        <th className="col-1">S No</th>
                        <th className="col-1">Invoice No</th>
                        <th className="col-1">Offline No</th>
                        <th className="col-1">Amount</th>
                        <th className="col-1">Discount</th>
                        <th className="col-2">Approved By</th>
                        <th className="col-2">Reason</th>
                        <th className="col-1">Biller</th>
                        <th className="col-1">Created On</th>
                        <th className="col-1">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="row m-0 p-0">
                        <td className="col-1">01</td>
                        <td className="col-1">INV87528863</td>
                        <td className="col-1">OF87528863</td>
                        <td className="col-1">₹700:00</td>
                        <td className="col-1">₹100:00</td>
                  
                        <td className="col-2">John Dev</td>
                        <td className="col-2">Lorem ipsum, in graphical and textual </td>
                        <td className="col-1">5218</td>
                        <td className="col-1">20/06/2020</td>
                        <td className="col-1">₹00:00</td>
                    </tr>
                    <tr className="row m-0 p-0">
                        <td className="col-1">02</td>
                        <td className="col-1">INV8752873763</td>
                        <td className="col-1">OF874328863</td>
                        <td className="col-1">₹700:00</td>
                        <td className="col-1">₹100:00</td>
                  
                        <td className="col-2">John Dev</td>
                        <td className="col-2">Lorem ipsum, in graphical and textual </td>
                        <td className="col-1">5218</td>
                        <td className="col-1">20/06/2020</td>
                        <td className="col-1">₹00:00</td>
                    </tr>
                    <tr className="row m-0 p-0">
                        <td className="col-1">03</td>
                        <td className="col-1">INV87528863</td>
                        <td className="col-1">OF87528863</td>
                        <td className="col-1">₹700:00</td>
                        <td className="col-1">₹100:00</td>
                  
                        <td className="col-2">John Dev</td>
                        <td className="col-2">Lorem ipsum, in graphical and textual </td>
                        <td className="col-1">5218</td>
                        <td className="col-1">20/06/2020</td>
                        <td className="col-1">₹00:00</td>
                    </tr>
                    <tr className="row m-0 p-0">
                        <td className="col-1">04</td>
                        <td className="col-1">INV87528863</td>
                        <td className="col-1">OF87528863</td>
                        <td className="col-1">₹700:00</td>
                        <td className="col-1">₹100:00</td>
                  
                        <td className="col-2">John Dev</td>
                        <td className="col-2">Lorem ipsum, in graphical and textual </td>
                        <td className="col-1">5218</td>
                        <td className="col-1">20/06/2020</td>
                        <td className="col-1">₹00:00</td>
                    </tr>
         
                </tbody>
            </table>
            <h2>Latest SaleBill Number:{this.state.RecentSaleNumber}</h2>
            </div>
         </div>
        )
    }
}
