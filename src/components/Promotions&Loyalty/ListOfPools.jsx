import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import left from "../../assets/images/table_arrow_left.svg";
import right from "../../assets/images/table_arrow_right.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class ListOfPools extends Component {
  constructor(props){
    super(props);
    this.state  = {
      isAddPool: false,
      poolRuleList: [
        {
            Privilege: "Generate Estimation slip",
            description: "Generating estimation slip in Cash memo",
            path:"/createdeliveryslip",
            isCheck: false,
        },
        {
            Privilege: "Generate Invoice",
            description: "Generating Invoice in Cash memo",
            path:"/newsale",
            isCheck: false,
        },
        {
            Privilege: "Generate Return Slip",
            description: "Generating return slip in Cash memo",
            path:"/createdeliveryslip",
            isCheck: false,
        },
        {
            Privilege: "Add Customer",
            description: "Add customer in Cash memo",
            path:"/createcustomer",
            isCheck: false,
        },
        {
            Privilege: "Gift Vocher",
            description: "Gift Vocher in Cash memo",
            path:"/tagcustomer",
            isCheck: false,
        },
        {
            Privilege: "Day Close Activity",
            description: "Day Close Activity in Cash memo",
            path:"/posdayclose",
            isCheck: false,
        },
        {
            Privilege: "Admin",
            description: "Admin rights",
            path:"/createdeliveryslip",
            isCheck: false,
        },
        {
            Privilege: "Super Admin",
            description: "Super Admin Rights",
            path:"/createdeliveryslip",
            isCheck: false,
        }

    ],
    };

    this.addPool = this.addPool.bind(this);
    this.closePool = this.closePool.bind(this);
    this.addPoolRule = this.addPoolRule.bind(this);
    this.closePoolRule = this.closePoolRule.bind(this);
  }


  addPool() {
    this.setState({ isAddPool: true });
  }


  closePool() {
    this.setState({ isAddPool: false });
  }

  addPoolRule() {
    this.setState({isAddPoolRule : true});
  } 

  closePoolRule() {
    this.setState({isAddPoolRule : false});
  }


  getPrivilegesList() {
    return this.state.poolRuleList.map((items, index) => {
        const { Privilege, description, isCheck } = items;
        return (
            <tr className="row m-0 p-0" key={index}>
                <td className="col-1">{index + 1}</td>
                <td className="col-4">{Privilege}</td>
                <td className="col-6">{description}</td>
                <td className="col-1">
                    <div className="form-check checkbox-rounded checkbox-living-coral-filled pointer fs-15">
                      <input type="checkbox" className="form-check-input filled-in mt-1" id="remember{{index}}"  
                        name="barcodes{{index}}" checked={isCheck}
                        onChange={(e) => this.setPrivileges(e, index, Privilege)}/>
                      <label className="form-check-label" htmlFor="remember"></label>
                    </div>
                </td>
            </tr>
        );
    });
}

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isAddPoolRule} size="lg">
        <ModalHeader>Add Pool Rule</ModalHeader>
          <ModalBody>
          <div className="maincontent p-0">
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="row m-0 p-0">
                                        <th className="col-1 pt-1">S.No</th>
                                        <th className="col-4 pt-1">Pool Rules</th>
                                        <th className="col-6 pt-1">Description</th>
                                        <th className="col-1 pt-1"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                   
                                    {this.getPrivilegesList()}
                                </tbody>
                            </table>
                        </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn-unic" onClick={this.closePoolRule}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.closePoolRule}
            >
              Save
            </button>
          </ModalFooter>
          </Modal>

        <Modal isOpen={this.state.isAddPool} size="lg">
          <ModalHeader>Add Pool</ModalHeader>
          <ModalBody>
          <div className="row">
              <div className="col-12">
              <h6 className="text-red mb-2">Pool Details</h6>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Pool Name</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Pool Type</label>
                  <select className="form-control">
                    <option>Select Pool Type</option>
                  </select>
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Pool Rule</label>
                  <select className="form-control">
                    <option>Select Rule</option>
                  </select>
                </div>
                </div>
                <div className="col-12">
                   <h6 className="text-red mb-2 mt-3">Pool Rules</h6>
                </div>
                <div className="col-12">
                  <table className="table table-borderless mb-1 mt-2">
                  <thead>
                    <tr className="m-0 p-0">
                      <th className="col-4">Column Name</th>
                      <th className="col-4">Operator</th>
                      <th className="col-3">Values</th>
                      <th className="col-1"></th>
                    </tr>
                  </thead>
                </table>
                <table className="table table-borderless gfg mb-0">
                  <tbody>
                    <tr>
                      <td className="col-4 geeks">
                        <select className="form-control">
                          <option>Select Name</option>
                        </select>
                      </td>
                      <td className="col-4">
                        <select className="form-control">
                          <option>Select Operator</option>
                        </select>
                      </td>
                      <td className="col-3">
                      <input type="text" className="form-control" placeholder="ENTER VALUES"/>
                      </td>
                      <td className="col-1 text-center">
                        <i className="icon-delete m-l-2 fs-16"></i>
                      </td>
                    </tr>
                    </tbody>
                  </table>  
                </div>
            <div className="col-12 text-right mt-3">
            <button type="button" className="btn-unic-redbdr" onClick={this.addPoolRule}>Add Pool Rule</button>
             </div> 
           </div>     
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closePool}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.closePool}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
        <div className="row">
          <div className="col-sm-3 col-12">
            <div className="form-group mt-2 mb-3">
              <select className="form-control">
                <option>Select Created By</option>
              </select>
            </div>
          </div>
          <div className="col-sm-3 col-12">
            <div className="form-group mt-2 mb-3">
              <select className="form-control">
                <option>Select Pool Type</option>
              </select>
            </div>
          </div>
          <div className="col-sm-3 col-12">
            <div className="form-group mt-2 mb-3">
              <select className="form-control">
                <option>Select Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="col-sm-3 col-12 scaling-center scaling-mb">
            <button className="btn-unic-search active m-r-2 mt-2">SEARCH</button>
            <button className="btn-unic-redbdr mt-2" onClick={this.addPool}>Add Pool</button>
          </div>
        </div>
        <div className="row m-0 p-0 scaling-center">
          <div className="col-6 p-l-0">
          <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Pools</h5>
          </div>
          <div className="col-6 text-right p-r-0 mt-2 align-self-center">
            <span className="mt-3">Show on page </span><span className="font-bold fs-14"> 1-10</span><span> out of 11</span><button className="btn-transparent" type="button"><img src={left} /></button><button className="btn-transparent" type="button"><img src={right} /></button>
          </div>
          <div className="table-responsive p-0">
          <table className="table table-borderless mb-1 mt-2">
            <thead>
              <tr className="m-0 p-0">
                <th className="col-1"># Pool-ID</th>
                <th className="col-2">Pool Name</th>
                <th className="col-2">DESCRIPTION</th>
                <th className="col-1">Type</th>
                <th className="col-2">Created By</th>
                <th className="col-2">Created On</th>
                <th className="col-1">Status</th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-1 underline geeks">P1101</td>
                <td className="col-2">Womens @ 999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Ramesh</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1102</td>
                <td className="col-2">Shirt buy 2 @399</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Buy</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-inactive">Inactive</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-inactive">Inactive</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
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
