import React, { Component } from 'react';
import dress1 from '../../assets/images/midi_blue.svg';
import error from '../../assets/images/error.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class PosDayClose extends Component {

  constructor(props){
    super(props);
    this.state  = {
      isCloseDay: false,
    };

    this.closeDay = this.closeDay.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }


  closeDay() {
    this.setState({ isCloseDay: true });
  }


  hideModal() {
    this.setState({ isCloseDay: false });
  }

  render() {
    return (
      <div className="maincontent">
          <Modal isOpen={this.state.isCloseDay} size="md">
          <ModalHeader>Confirm Activity</ModalHeader>
          <ModalBody>
            <div className="row ">
              <div className="col text-center">
              <img src={error}/>
            <h6 className="mt-2">Are you sure, you want to close the<br />
register today?</h6>
</div>
</div>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdr" onClick={this.hideModal}>
              Cancel
            </button>
            <button
              className="btn btn-bdr active fs-12"
              onClick={this.hideModal}
            >
              Confirm
            </button>
          </ModalFooter>
        </Modal>

        <div className="row mb-2 scaling-center">
          <div className="col-sm-6 mt-2 col-12 scaling-mb"><h5>List Of Pending Delivery Slips</h5></div>
          <div className="col-sn-6 col-12 text-right scaling-mb">
          <button className="btn-unic mt-2 active" onClick={this.closeDay}>Day Close Activity</button>
          </div>
          </div>
          <div className="table-responsive">
        <table className="table table-borderless mb-1">
          <thead>
            <tr className="m-0 p-0">
              <th className="col-3">ITEM</th>
              <th className="col-1">DIVISION</th>
              <th className="col-1">Size</th>
              <th className="col-1">Qty</th>
              <th className="col-1">sm</th>
              <th className="col-1">mrp</th>
              <th className="col-2">Discount Type</th>
              <th className="col-1">Discount</th>
              {/* <th className="col-4">Description</th> */}
              <th className="col-1">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-3 geeks">
                <div className="d-flex">
                <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                          <input type="checkbox" className="form-check-input filled-in mt-3" id="roundedExample2"  />
                          <label className="form-check-label" htmlFor="roundedExample2"></label>
                    <img src={dress1} />
                  </div>
                  <div className="td_align ">
                    <label>Antheaa</label>
                    <label>Women Black & Rust Orange Floral Print #123456789</label>
                  </div>

                </div>
              </td>
              <td className="col-1">Women</td>
              <td className="col-1">M</td>
              <td className="col-1 V1_forms">10</td>
              <td className="col-1">S1234</td>
              <td className="col-1">₹ 1,499.00</td>
              <td className="col-2">Dussehra offer</td>
              <td className="col-1">₹ 499.00</td>
              <td className="col-1 ">₹ 1,000.00
                <i className="icon-delete m-l-2"></i>
              </td>
            </tr>
            <tr>
              <td className="col-3 geeks">
                <div className="d-flex">
                <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                          <input type="checkbox" className="form-check-input filled-in mt-3" id="roundedExample2" />
                          <label className="form-check-label" htmlFor="roundedExample2"></label>
                    <img src={dress1} />
                  </div>
                  
                  <div className="td_align ">
                    <label>Antheaa</label>
                    <label>Women Black & Rust Orange Floral Print #123456789</label>
                  </div>

                </div>
              </td>
              <td className="col-1">Women</td>
              <td className="col-1">M</td>
              <td className="col-1 V1_forms">10</td>
              <td className="col-1">S1234</td>
              <td className="col-1">₹ 1,499.00</td>
              <td className="col-2">Dussehra offer</td>
              <td className="col-1">₹ 499.00</td>
              <td className="col-1 ">₹ 1,000.00
                <i className="icon-delete m-l-2"></i>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
        <div className="rect-cardred m-0">
              <div className="row">
                <div className="col-sm-5 col-1"></div>
                <div className="col-sm-1 col-2">
                  <label>TOTAL QTY</label>
                  <h6 className="pt-2">02</h6>
                </div>
                <div className="col-sm-1 col-1"></div>
                <div className="col-sm-1 col-2">
                  <label>MRP</label>
                  <h6 className="pt-2">2,998 ₹</h6>
                </div>
                <div className="col-sm-2 col-1"></div>
                <div className="col-sm-1 col-2">
                  <label>DISCOUNT</label>
                  <h6 className="pt-2">998 ₹</h6>
                </div>
                <div className="col-sm-1 col-3 text-right text-center text-red">
                  <label className="text-red ">GRAND TOTAL</label>
                  <h6 className="fs-16 text-red pt-1">2000 ₹</h6>
                </div>
              </div>
          </div>
</div>

  
    )
  }
}
