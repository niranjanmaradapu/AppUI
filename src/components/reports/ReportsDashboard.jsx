import React, { Component } from 'react';
import sales_graph1 from '../../assets/images/sales_report_graph1.svg';
import sales_graph2 from '../../assets/images/sales_report_graph2.svg';
import sales_graph3 from '../../assets/images/sales_report_graph3.svg';
import sales_graph4 from '../../assets/images/sales_report_graph4.svg';
import sales_graph5 from '../../assets/images/sales_report_graph5.svg';

export default class ReportsDashboard extends Component {
    render() {
        return (
            <div className="maincontent">
            <div className="row">
                <div className="col-sm-5 col-12 mb-3">
                      <h5 className="fs-25">Sales Analysis</h5>
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
                <div className="col-sm-8 col-12 mb-3">
                    <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center scaling-mb">
                                <h5 className="fs-20">Sales monthly trend</h5>
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
                            <img className="img-responsive" className="p-0" src={sales_graph1} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-12 mb-3">
                <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center">
                                <h5 className="fs-20 mt-2">Top 5 Sales by store</h5>
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
                        <div className="rect-image pb-3">
                            <img className="img-responsive" src={sales_graph2} />
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4 col-12">
                <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center">
                                <h5 className="fs-20">Invoices generated</h5>
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
                            <img className="img-responsive" src={sales_graph3} />
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4 col-12">
                <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center">
                                <h5 className="fs-20">Sales summary</h5>
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
                            <img className="img-responsive" src={sales_graph4} />
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4 col-12">
                <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center">
                                <h5 className="fs-20">Active & Inactive promo's</h5>
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
                            <img className="img-responsive" src={sales_graph5} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
