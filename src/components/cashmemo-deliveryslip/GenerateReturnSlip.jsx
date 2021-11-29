import React, { Component } from 'react';
import dress1 from '../../assets/images/midi_blue.svg';
import scan from '../../assets/images/scan.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class GenerateReturnSlip extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isTagCustomer: false,
        isGenerateSlip: false,
      };
      this.tagCustomer = this.tagCustomer.bind(this);
      this.closeTagCustomer = this.closeTagCustomer.bind(this);
      this.generateReturn = this.generateReturn.bind(this);
      this.closegenerateReturn = this.closegenerateReturn.bind(this);
    }

    tagCustomer(){
      this.setState({isTagCustomer: true});
    }

    closeTagCustomer(){
      this.setState({isTagCustomer: false});
    }

    generateReturn() {
      this.setState({isGenerateSlip : true});
    }

    closegenerateReturn() {
      this.setState({isGenerateSlip: false});
    }

  render() {
    return (
      <div className="maincontent">
        
        <Modal isOpen={this.state.isGenerateSlip} size="lg">
        <div className="headerGreen"><h5>Thank you!</h5></div>
          <ModalBody>
          <div className="row">
              <div className="col-12 mb-2">
              <label className="text-green fs-14">Return slip generated successfully</label>
                </div>
                <div className="col-12 mt-3">
                <table className="table table-borderless mb-1">
          <thead>
            <tr className="m-0 p-0">
              {/* <th className="col-1"> </th> */}
              <th className="col-4">SLIP NO.</th>
              <th className="col-4">ITEMS</th>
              <th className="col-4">Return Slip Value</th>
            </tr>
          </thead>
        </table>
        <table className="table table-borderless gfg">
          <tbody>
            <tr>
              <td className="col-4 geeks">
              CR12345678912
              </td>
              <td className="col-4">04</td>
              <td className="col-4">₹ 3,447.00</td>
            </tr>
            <tr>
              <td className="col-4 geeks">
              CR12345678913
              </td>
              <td className="col-4">02</td>
              <td className="col-4">₹ 3,447.00</td>
            </tr>
            

          </tbody>
        </table>
                </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-bdrG pt-2 m-r-2" onClick={this.closegenerateReturn}>
              BACK TO DASHBOARD
            </button>
            <button
              className="btn-bdrG pt-2 active fs-12"
              onClick={this.closegenerateReturn}
            >
              GENERATE NEW
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.isTagCustomer} size="sm">
          <ModalHeader><h5>Tag customer</h5></ModalHeader>
          <ModalBody>
            <div className="row p-3">
              
              <div className="col-12">
                <h6 className="fs-14 mb-4 mt-1">Please provide customer phone number </h6>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                />
              </div>
              {/* <div className="col-4">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customer"
                  className="form-control"
                  value={this.state.customerName}
                  onChange={(e) =>
                    this.setState({ customerName: e.target.value })
                  }
                />
              </div>
              <div className="col-4">
                <label>Gender</label>
                <select
                  className="form-control"
                  onChange={(e) => this.setState({ gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <div className="col-4 mt-3">
                <label>Customer Email </label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={this.state.customerEmail}
                  onChange={(e) =>
                    this.setState({ customerEmail: e.target.value })
                  }
                />
              </div>
              <div className="col-4 mt-3">
                <label>Date of Birth</label>
                <input
                  type="text"
                  name="dob"
                  className="form-control"
                  value={this.state.dob}
                  onChange={(e) => this.setState({ dob: e.target.value })}
                />
              </div>
              <div className="col-4 mt-3">
                <label>Customer GST Number</label>
                <input
                  type="text"
                  name="gst"
                  className="form-control"
                  value={this.state.customerGST}
                  onChange={(e) =>
                    this.setState({ customerGST: e.target.value })
                  }
                />
              </div>
              <div className="col-4 mt-3">
                <label>Address</label>
                <textarea
                  rows="3"
                  name="address"
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
              </div>
              
              <div className="col-4 mt-3">
                <div className="d-flex mt-5">
                  <input type="checkbox" className="m-r-3 mt-1" name="check" />
                  <label>Customer not interested to give his/her number </label>
                </div>
              </div> */}
              <div className="col-12">
              <div className="d-flex mt-3 pointer">
              <div class="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
      <input type="checkbox" class="form-check-input filled-in" id="roundedExample2" checked />
      <label class="form-check-label" htmlFor="roundedExample2">Confirming me to receive promotional messages.</label>
    </div>
       
              </div>
              </div>
             
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdr" onClick={this.closeTagCustomer}>
              Cancel
            </button>
            <button
              className="btn btn-bdr active fs-12"
              onClick={this.closeTagCustomer}
            >
              Confirm
            </button>
          </ModalFooter>
        </Modal>
        <div className="row">
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-12 col-sm-4">
                <div className="form-group">
                  <input type="search" className="form-control frm-pr"
                    placeholder="ENTER BARCODE" />
                           <button type="button"className="scan">
                               <img src={scan}/> SCAN  
                </button>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="form-group scaling-mb">
                  <input type="search" className="form-control"
                    placeholder="CUSTMER PHONE NUMBER" />
                </div>
              </div>
              <div className="col-12 col-sm-4 p-r-0 p-l-0 scaling-center">
                <button className="btn-unic-search active m-r-2 scaling-mb">SEARCH</button>
                <button className="btn-unic scaling-mb" onClick={this.tagCustomer}>Customer Tagging</button>
              </div>
            </div>
            <div className="row m-0 p-0">
              <div className="col-12 col-sm-4 p-l-0">
                <h5 className="mt-0 mb-3">
                  List Of Items For Return
                </h5>
              </div>
              <div className="col-sm-8 col-12 text-right p-r-0"></div>
              <div className="table-responsive">
              <table className="table table-borderless mb-1 mt-1">
                <thead>
                  <tr className="m-0 p-0">
                    <th className="col-1">S.NO</th>
                    <th className="col-5">ITEM</th>
                    <th className="col-2">BARCODE</th>
                    <th className="col-2">QTY</th>
                    <th className="col-2">VALUE</th>
                  </tr>
                </thead>
                <tbody>

                  {/* {this.renderTableData()} */}
                  <tr>
                    <td className="col-1 geeks">
                      01
                    </td>
                    <td className="col-5">
                      <div className="d-flex">
                        <div class="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                          <input type="checkbox" class="form-check-input filled-in mt-3" id="roundedExample2" checked />
                          <label class="form-check-label" htmlFor="roundedExample2"></label>

                          <img src={dress1} />
                        </div>
                        <div className="td_align ">
                          <label>Antheaa</label>
                          <label>Women Black & Rust Orange Floral Print #123456789</label>
                        </div>

                      </div>  </td>
                    <td className="col-2">BAR353526</td>
                    <td className="col-2">02</td>
                    <td className="col-2">₹ 1,000.00</td>
                  </tr>
                  <tr>
                    <td className="col-1 geeks">
                      02
                    </td>
                    <td className="col-5">     <div className="d-flex">
                      <div class="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                        <input type="checkbox" class="form-check-input filled-in mt-3" id="roundedExample2" checked />
                        <label class="form-check-label" htmlFor="roundedExample2"></label>
                        <img src={dress1} />
                      </div>
                      <div className="td_align ">
                        <label>Antheaa</label>
                        <label>Women Black & Rust Orange Floral Print #123456789</label>
                      </div>

                    </div>  </td>
                    <td className="col-2">BAR352546</td>
                    <td className="col-2">02</td>
                    <td className="col-2">₹ 1,200.00</td>
                  </tr>
                  <tr>
                    <td className="col-1 geeks">
                      03
                    </td>
                    <td className="col-5">     <div className="d-flex">
                      <div class="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                        <input type="checkbox" class="form-check-input filled-in mt-3" id="roundedExample2" checked />
                        <label class="form-check-label" htmlFor="roundedExample2"></label>
                        <img src={dress1} />
                      </div>
                      <div className="td_align ">
                        <label>Antheaa</label>
                        <label>Women Black & Rust Orange Floral Print #123456789</label>
                      </div>

                    </div>  </td>
                    <td className="col-2">BAR352547</td>
                    <td className="col-2">02</td>
                    <td className="col-2">₹ 1,500.00</td>
                  </tr>

                </tbody>
              </table>
              </div>

              {/* <div>{this.showOrderDetails()}</div> */}
              <div className="rect-cardred m-0">
                <div className="row">
                  <div className="col-2 text-center">
                    <label>Items : <span className="font-bold"> 02</span></label>
                  </div>

                  <div className="col-2">
                    <label>Qty : <span className="font-bold"> 01</span></label>
                  </div>
                  <div className="col-2">
                    <label>N/Rate : <span className="font-bold"> ₹ 2,998</span> </label>
                  </div>
                  <div className="col-3">
                    <label>Discount : <span className="font-bold"> ₹ 998</span> </label>
                  </div>
                  <div className="col-2">
                    <label>Value : <span className="font-bold"> ₹ 2,000</span> </label>
                  </div>

                </div>
              </div>
              </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="rect-grey pb-3">
              <h5 className="m-b-5">Return summary</h5>
              {/* <div className="row">
                    <div className="col-5">
                      <label>Total Amount</label>
                    </div>
                    <div className="col-7 text-right">
                      <label className="font-bold">₹ 1,500.00</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <label>CGST</label>
                    </div>
                    <div className="col-7 text-right">
                      <label className="font-bold">₹ 75.00</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <label>SGST</label>
                    </div>
                    <div className="col-7 text-right">
                      <label className="font-bold">₹ 75.00</label>
                    </div>
                  </div>
   */}

              <div className="payment">
                <div className="row">
                  <div className="col-5 p-r-0 pt-1">
                    <label>Return Amount</label>
                  </div>
                  <div className="col-7 p-l-0 pt-1 text-right">
                    <label className="font-bold">₹ 1,650.00</label>
                  </div>
                </div>

              </div>
              <h5 className="m-b-3 m-t-5 p-t-4">Return for reason <span className="text-red float-none fs-18">*</span></h5>
              {/* <div className="form-group apply_btn">
                    <button type="button" className=""> Apply</button>
                    <input type="text" className="form-control" placeholder="ENTER RT NUMBER" />
                  </div> */}
              {/* <div className="form-group apply_btn mb-2">
                    <button type="button" className=""> Apply</button>
                    <input type="text" className="form-control" placeholder="COUPON CODE" />
                  </div> */}
              <select className="form-control">
                <option>Not fitting</option>
                <option>Damaged Piece</option>
                <option>Quality Is Not Good</option>
                <option>Other</option>
              </select>
              <textarea rows="4" cols="46" className="form-control mt-3" placeholder="Write Comments"></textarea>

              <div className="mt-3">
                <button className="btn-login_v1 mt-3 mb-3" onClick={this.generateReturn}>GENERATE RETURN SLIP</button>
                {/* <button className="btn-unic p-2 w-100">HOLD PAYMENT</button> */}
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
