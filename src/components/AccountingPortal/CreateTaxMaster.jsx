import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class CreateTaxMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTaxMaster: false,
    };

    this.addTaxMaster = this.addTaxMaster.bind(this);
    this.closeTaxMaster = this.closeTaxMaster.bind(this);
  }


  addTaxMaster() {
    this.setState({ isTaxMaster: true });
  }

  closeTaxMaster() {
    this.setState({ isTaxMaster: false });
  }
  
  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isTaxMaster} size="md">
          <ModalHeader>Add Tax Master</ModalHeader>
          <ModalBody>
          <div className="row">
                <div className="col-6">
                <div className="form-group">
                  <label>TAX Rate %</label>
                  <input type="text" className="form-control" placeholder="%" />
                </div>
                </div>
                <div className="col-6">
                <div className="form-group">
                  <label>CGST %</label>
                  <input type="text" className="form-control" placeholder="%" />
                </div>
                </div>
                <div className="col-6 mt-3">
                <div className="form-group">
                  <label>SGST %</label>
                  <input type="text" className="form-control" placeholder="%" />
                </div>
                </div>
                <div className="col-6 mt-3">
                <div className="form-group">
                  <label>IGST %</label>
                  <input type="text" className="form-control" placeholder="%" />
                </div>
                </div>
                <div className="col-6 mt-3">
                <div className="form-group">
                  <label>CESS %</label>
                  <input type="text" className="form-control" placeholder="%" />
                </div>
                </div>
                <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Priority</label>
                      <select className="form-control">
                          <option>Select Priority</option>
                      </select>
                </div>
                </div>
         
                </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeTaxMaster}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.closeTaxMaster}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
        <div className="row">
          <div className="col-sm-5 col-6">
            <h5 className="mt-1 mb-2 fs-18 p-l-0 mt-3">List Of Taxes</h5>
          </div>
          <div className="col-sm-7 col-6 scaling-mb text-right">
            <button className="btn-unic-search mt-2 active" onClick={this.addTaxMaster}>Add Tax Master</button>
          </div>
        </div>
        <div className="table-responsive">
        <table className="table table-borderless mb-1 mt-2">
          <thead>
            <tr className="m-0 p-0">
              <th className="col-2">Tax Rate</th>
              <th className="col-2">CGST</th>
              <th className="col-1">SGST</th>
              <th className="col-1">IGST</th>
              <th className="col-2">CESS</th>
              <th className="col-2">Priority</th>
              <th className="col-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-2 underline geeks">GST 5%</td>
              <td className="col-2">2.5%</td>
              <td className="col-1">2.5%</td>
              <td className="col-1">0</td>
              <td className="col-2">0</td>
              <td className="col-2"><button className="btn-active">Default</button></td>
              <td className="col-2 text-center">
                <img src={edit} className="w-12 pb-2" />
                <i className="icon-delete m-l-2 fs-16"></i></td>
            </tr>
            <tr>
              <td className="col-2 underline geeks">GST 10%</td>
              <td className="col-2">5%</td>
              <td className="col-1">5%</td>
              <td className="col-1">0</td>
              <td className="col-2">0</td>
              <td className="col-2"><button className="btn-active">Default</button></td>
              <td className="col-2 text-center">
                <img src={edit} className="w-12 pb-2" />
                <i className="icon-delete m-l-2 fs-16"></i></td>
            </tr>
            <tr>
              <td className="col-2 underline geeks">GST 12%</td>
              <td className="col-2">6%</td>
              <td className="col-1">6%</td>
              <td className="col-1">0</td>
              <td className="col-2">0</td>
              <td className="col-2">
                <select className="form-control">
                  <option>Set Default</option>
                </select>
              </td>
              <td className="col-2 text-center">
                <img src={edit} className="w-12 pb-2" />
                <i className="icon-delete m-l-2 fs-16"></i></td>
            </tr>
            <tr>
              <td className="col-2 underline geeks">GST 18%</td>
              <td className="col-2">6.5%</td>
              <td className="col-1">6.5%</td>
              <td className="col-1">2.5%</td>
              <td className="col-2">2.5%</td>
              <td className="col-2">
                <select className="form-control">
                  <option>Set Default</option>
                </select>
              </td>
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
