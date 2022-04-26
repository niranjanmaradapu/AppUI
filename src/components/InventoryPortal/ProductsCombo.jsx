import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import edit from '../../assets/images/edit.svg';

export default class ProductsCombo extends Component {
  constructor(props){
    super(props);
    this.state={
      isAddCombo:false,
    }
  this.addCombo = this.addCombo.bind(this);
  this.closeCombo = this.closeCombo.bind(this);
  }
  addCombo() {
    this.setState({isAddCombo : true});
  } 

  closeCombo() {
    this.setState({ isAddCombo : false });
  }
  render() {
    
    return (
      <div className="maincontent">

        <Modal isOpen={this.state.isAddCombo} size="lg">
        <ModalHeader>Add Combo</ModalHeader>
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
                                   
                                   
                                </tbody>
                            </table>
                        </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn-unic" onClick={this.closeCombo}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.closeCombo}
            >
              Save
            </button>
          </ModalFooter>
          </Modal>

      <div className="row">
        <div className="col-sm-3 col-12">
          <div className="form-group mt-2">
            <label>From Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="FROM DATE"
            />
          </div>
        </div>
        <div className="col-sm-3 col-12">
          <div className="form-group mt-2">
            <label>To Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="TO DATE"
            />
          </div>
        </div>
        <div className="col-sm-3 col-12">
          <div className="form-group mt-2">
            <label>Inventory ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter ID"
            />
          </div>
        </div>
        <div className='col-sm-3 col-12 mt-3 pt-2 scaling-center scaling-mb scaling-mtop'>
        <button
                className="btn-unic-search active m-r-2 mt-1"
              >
                SEARCH
              </button>
              <button
                className="btn-unic-redbdr mt-2 m-r-2"
                onClick={this.addCombo}>
                Add Combo
              </button>
        </div>
        </div>
        <h5 className="mb-2 fs-18 p-l-0 mt-3">List of product  bundles</h5>
        <div className="table-responsive m-0 p-0">
              <table className="table table-borderless mb-1 mt-2">
                <thead>
                <tr className="m-0 p-0">
                  <th className="col-1"># Inventory-ID</th>
                  <th className="col-2">Barcode</th>
                  <th className="col-1">Combo Name</th>
                  <th className="col-1">No.of Items</th>
                  <th className="col-2">Unit Price</th>
                  <th className="col-1">In Stock</th>
                  <th className="col-1">UOM</th>
                  <th className="col-2">Inventory Value</th>
                  <th className='col-1'></th>
               </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='col-1 underline'>INV01122</td>
                    <td className='col-2'>BC72672882</td>
                    <td className='col-1'>Men's Jeans</td>
                    <td className='col-1'>2</td>
                    <td className='col-2'>₹1250.00</td>
                    <td className='col-1'>50</td>
                    <td className='col-1'>Bundle</td>
                    <td className='col-2'>₹120450.00</td>
                    <td className='col-1'>
                    <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className='col-1 underline'>INV01122</td>
                    <td className='col-2'>BC72672882</td>
                    <td className='col-1'>Men's Jeans</td>
                    <td className='col-1'>2</td>
                    <td className='col-2'>₹1250.00</td>
                    <td className='col-1'>50</td>
                    <td className='col-1'>Bundle</td>
                    <td className='col-2'>₹120450.00</td>
                    <td className='col-1'>
                    <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className='col-1 underline'>INV01122</td>
                    <td className='col-2'>BC72672882</td>
                    <td className='col-1'>Men's Jeans</td>
                    <td className='col-1'>2</td>
                    <td className='col-2'>₹1250.00</td>
                    <td className='col-1'>50</td>
                    <td className='col-1'>Bundle</td>
                    <td className='col-2'>₹120450.00</td>
                    <td className='col-1'>
                    <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className='col-1 underline'>INV01122</td>
                    <td className='col-2'>BC72672882</td>
                    <td className='col-1'>Men's Jeans</td>
                    <td className='col-1'>2</td>
                    <td className='col-2'>₹1250.00</td>
                    <td className='col-1'>50</td>
                    <td className='col-1'>Bundle</td>
                    <td className='col-2'>₹120450.00</td>
                    <td className='col-1'>
                    <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className='col-1 underline'>INV01122</td>
                    <td className='col-2'>BC72672882</td>
                    <td className='col-1'>Men's Jeans</td>
                    <td className='col-1'>2</td>
                    <td className='col-2'>₹1250.00</td>
                    <td className='col-1'>50</td>
                    <td className='col-1'>Bundle</td>
                    <td className='col-2'>₹120450.00</td>
                    <td className='col-1'>
                    <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className='col-1 underline'>INV01122</td>
                    <td className='col-2'>BC72672882</td>
                    <td className='col-1'>Men's Jeans</td>
                    <td className='col-1'>2</td>
                    <td className='col-2'>₹1250.00</td>
                    <td className='col-1'>50</td>
                    <td className='col-1'>Bundle</td>
                    <td className='col-2'>₹120450.00</td>
                    <td className='col-1'>
                    <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>        
        </div>
    )
  }
}
