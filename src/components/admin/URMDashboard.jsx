import React, { Component } from 'react';
import urm_graph1 from '../../assets/images/urm_graph1.svg';
import urm_graph2 from '../../assets/images/urm_graph2.svg';
import urm_graph3 from '../../assets/images/urm_graph3.svg';

export default class URMDashboard extends Component {
    render() {
        return (
            <div className="maincontent">
            <div className="row">
            <div className="col-12 scaling-center">
                      <h5 className="fs-25">URM Dashboard</h5>
                </div>
                <div className="col-sm-4 col-12">
                <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center">
                                <h5 className="fs-20 mt-2">Users by role</h5>
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
                            <img src={urm_graph1} />
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4 col-12">
                <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center">
                                <h5 className="fs-20 mt-2">Active vs In-active users</h5>
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
                            <img src={urm_graph2} />
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4 col-12">
                <div className="rect">
                        <div className="row">
                            <div className="col-12 scaling-center">
                                <h5 className="fs-20 mt-2">Stores vs Employees</h5>
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
                            <img src={urm_graph3} />
                        </div>
                    </div>
                    </div>
            </div>
            </div>    
        )
    }
}
