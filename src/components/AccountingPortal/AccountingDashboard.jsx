import React, { Component } from 'react';
import graph1 from '../../assets/images/accounting_graph1.svg';
import graph2 from '../../assets/images/accounting_graph2.svg';

export default class AccountingDashboard extends Component {
    render() {
        return (
            <div className="maincontent">
            <div className="row">
                <div className="col-sm-5 col-12 scaling-center mb-3">
                      <h5 className="fs-25">Accounting Dashboard</h5>
                </div>
                <div className="col-sm-3 col-12 mb-3">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="FROM DATE" />
                    </div>
                </div>
                <div className="col-sm-3 col-12 mb-3">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="TO DATE" />
                    </div>
                </div>
                <div className="col-sm-1 col-12 scaling-center p-l-0 mb-3">
                  <button type="button" className="btn-unic-search active">SEARCH</button>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center">
                                <h5 className="fs-20">Debit Notes by stores</h5>
                            </div>
                            {/* <div className="col-3">
                                <select class="form-control">
                                    <option>Today</option>
                                    <option>Last One Month</option>
                                    <option>Last 6 Months</option>
                                    <option>Last Year</option>
                                </select>
                            </div> */}
                        </div>
                        <div className="rect-image">
                            <img src={graph1} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center">
                                <h5 className="fs-20">Used & balanced amounts by stores</h5>
                            </div>
                            {/* <div className="col-3">
                                <select class="form-control">
                                    <option>Today</option>
                                    <option>Last One Month</option>
                                    <option>Last 6 Months</option>
                                    <option>Last Year</option>
                                </select>
                            </div> */}
                        </div>
                        <div className="rect-image">
                            <img src={graph2} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
