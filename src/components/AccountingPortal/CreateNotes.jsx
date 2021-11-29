import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class CreateNotes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCredit: false,
    };

    this.addCredit = this.addCredit.bind(this);
    this.closeCredit = this.closeCredit.bind(this);
  }


  addCredit() {
    this.setState({ isCredit: true });
  }


  closeCredit() {
    this.setState({ isCredit: false });
  }

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isCredit} size="lg">
          <ModalHeader>Add Credit Notes</ModalHeader>
          <ModalBody>
          <div className="row">
              <div className="col-12">
              <h6 className="text-red mb-2 fs-14">Credit information</h6>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4 ">
                <div className="form-group">
                  <label>EMP ID</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Credit Amount</label>
                  <input type="text" className="form-control" placeholder="₹" />
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Store</label>
                  <select className="form-control">
                    <option>Select Store</option>
                    <option>Kukatpally</option>
                    <option>Nizampet</option>
                  </select>
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Approved By</label>
                  <select className="form-control">
                    <option>Select</option>
                    <option>Store Manager</option>
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                </div>
                </div>
              
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Created Date</label>
                  <input type="date" className="form-control" placeholder="" />
                </div>
                </div>
                </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeCredit}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.closeCredit}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
        <div className="row">
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
          <div className="col-sm-3 col-12 mt-2">
            <div className="form-group mb-3">
              <input type="text" className="form-control"
                placeholder="FROM DATE" />
            </div>
          </div>
          <div className="col-sm-3 col-12 mt-2">
            <div className="form-group mb-3">
              <input type="text" className="form-control"
                placeholder="TO DATE" />
            </div>
          </div>
          <div className="col-sm-3 col-12 mt-2">
            <div className="form-group mb-3">
              <input type="text" className="form-control"
                placeholder="MOBILE NUMEBR" />
            </div>
          </div>
          <div className="col-sm-3 col-12 scaling-mb scaling-center">
            <button className="btn-unic-search active m-r-2 mt-2">SEARCH</button>
            <button className="btn-unic-search mt-2 active" onClick={this.addCredit}>Add Credit Notes</button>
          </div>
        </div>
        <div className="row m-0 p-0 scaling-center">
          <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Credit Notes</h5>
          <div className="table-responsive">
          <table className="table table-borderless mb-1 mt-2">
            <thead>
              <tr className="m-0 p-0">
                <th className="col-1">#CRM ID</th>
                <th className="col-2">Store</th>
                <th className="col-1">Date</th>
                <th className="col-2">Used Amount</th>
                <th className="col-1">Balance</th>
                <th className="col-2">Approved By</th>
                <th className="col-2">Role</th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-1 underline geeks">CRM1011</td>
                <td className="col-2">Kukatpally</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 1,250.00</td>
                <td className="col-1">₹ 1,250.00</td>
                <td className="col-2">Ramesh G</td>
                <td className="col-2">Store Manager</td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">CRM1012</td>
                <td className="col-2">Ameerpet</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1">₹ 2,000.00</td>
                <td className="col-2">Santhosh Kumar</td>
                <td className="col-2">Manager</td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">CRM1013</td>
                <td className="col-2">Dilsuknagar</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1">₹ 2,000.00</td>
                <td className="col-2">Ramya Sree</td>
                <td className="col-2">General Manager</td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">CRM1014</td>
                <td className="col-2">Chandanagar</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1">₹ 2,000.00</td>
                <td className="col-2">Sandhya Rani</td>
                <td className="col-2">General Manager</td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">CRM1015</td>
                <td className="col-2">Patny</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1">₹ 2,000.00</td>
                <td className="col-2">Kumar</td>
                <td className="col-2">Sales Manager</td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">CRM1016</td>
                <td className="col-2">Attapur</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1">₹ 2,000.00</td>
                <td className="col-2">Mahesh</td>
                <td className="col-2">Store Manager</td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">CRM1017</td>
                <td className="col-2">Panjagutta</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1">₹ 2,000.00</td>
                <td className="col-2">Ravi Raju</td>
                <td className="col-2">Accounts</td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">CRM1018</td>
                <td className="col-2">Kukatpally</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1">₹ 2,000.00</td>
                <td className="col-2">Ranganath</td>
                <td className="col-2">Store Manager</td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">CRM1019</td>
                <td className="col-2">Kukatpally</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1">₹ 2,000.00</td>
                <td className="col-2">Narendra</td>
                <td className="col-2">Store Manager</td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">CRM10110</td>
                <td className="col-2">Kukatpally</td>
                <td className="col-1">30 Sep 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1">₹ 2,000.00</td>
                <td className="col-2">Rakhi</td>
                <td className="col-2">Store Manager</td>
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
