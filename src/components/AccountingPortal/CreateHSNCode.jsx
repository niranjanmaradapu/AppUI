import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class CreateHSNCode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isaddHSNCode: false,
    };

    this.addHSNCode = this.addHSNCode.bind(this);
    this.closeHSNCode = this.closeHSNCode.bind(this);
  }


  addHSNCode() {
    this.setState({ isaddHSNCode: true });
  }

  closeHSNCode() {
    this.setState({ isaddHSNCode: false });
  }

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isaddHSNCode} size="lg">
          <ModalHeader>Add HSN Code</ModalHeader>
          <ModalBody>
          <div className="row">
              <div className="col-12">
              <h6 className="text-red mb-2 fs-14">HSN information</h6>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>HSN Code</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Tax Applicable</label>
                  <select className="form-control">
                    <option>Select</option>
                  </select>
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Tax %</label>
                  <select className="form-control">
                    <option>Select</option>
                    <option>2.5 %</option>
                    <option>5 %</option>
                    <option>12 %</option>
                    <option>18 %</option>
                  </select>
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Slab</label>
                  <select className="form-control">
                    <option>Select Slab</option>
                  </select>
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>TAX ID</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>From Price</label>
                  <input type="text" className="form-control" placeholder="₹" />
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>To Price</label>
                  <input type="text" className="form-control" placeholder="₹" />
                </div>
                </div>
                </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeHSNCode}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.closeHSNCode}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
        <div className="row scaling-mb">
          <div className="col-sm-5 col-6">
            <h5 className="mt-1 mb-2 fs-18 p-l-0 mt-3">List Of HSN Codes</h5>
          </div>
          <div className="col-sm-7 col-6 text-right">
            <button className="btn-unic-search mt-2 active"
              onClick={this.addHSNCode}>Add HSN Code</button>
          </div>
        </div>
        <div className="table-responsive">
        <table className="table table-borderless mb-1 mt-2">
          <thead>
            <tr className="m-0 p-0">
              <th className="col-3">HSN Code </th>
              <th className="col-3">GOODS/SERVICES</th>
              <th className="col-2">Tax Applicable</th>
              <th className="col-2">Slab</th>
              <th className="col-2"></th>
            </tr>
          </thead>
        </table>
        <table className="table table-borderless gfg mb-0">
          <tbody>
            <tr>
              <td className="col-3 underline geeks">HSN0011</td>
              <td className="col-3">Goods</td>
              <td className="col-2">Net Amount</td>
              <td className="col-2">YES</td>
              <td className="col-2 text-center">
                <img src={edit} className="w-12 pb-2" />
                <i className="icon-delete m-l-2 fs-16"></i></td>
            </tr>
            <tr>
              <td className="col-3 underline geeks">HSN0012</td>
              <td className="col-3">Goods</td>
              <td className="col-2">Gross Amount</td>
              <td className="col-2">NO</td>
              <td className="col-2 text-center">
                <img src={edit} className="w-12 pb-2" />
                <i className="icon-delete m-l-2 fs-16"></i></td>
            </tr>
            <tr>
              <td className="col-3 underline geeks">HSN0013</td>
              <td className="col-3">Goods</td>
              <td className="col-2">Gross Amount</td>
              <td className="col-2">YES</td>
              <td className="col-2 text-center">
                <img src={edit} className="w-12 pb-2" />
                <i className="icon-delete m-l-2 fs-16"></i></td>
            </tr>
            <tr>
              <td className="col-3 underline geeks">HSN0014</td>
              <td className="col-3">Goods</td>
              <td className="col-2">Net Amount</td>
              <td className="col-2">NO</td>
              <td className="col-2 text-center">
                <img src={edit} className="w-12 pb-2" />
                <i className="icon-delete m-l-2 fs-16"></i></td>
            </tr>

          </tbody>
        </table>
        </div>

      </div>
    )
  }
}
