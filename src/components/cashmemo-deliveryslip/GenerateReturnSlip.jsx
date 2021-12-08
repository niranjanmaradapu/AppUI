import React, { Component } from 'react';
import dress1 from '../../assets/images/midi_blue.svg';
import scan from '../../assets/images/scan.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CreateDeliveryService from '../../services/CreateDeliveryService';
import { toast } from 'react-toastify';

export default class GenerateReturnSlip extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isTagCustomer: false,
        isGenerateSlip: false,
        invoiceNo:"",
        mobileNo: "",
        returnslipsList:[],
        reason: ""
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

    saveGenerateReturnSlip() {
      const saveobj = {
            "barcodes": this.state.returnslipsList,
            "mobileNumber": this.state.mobileNo,
            "invoiceNo": this.state.invoiceNo,
            "reason": this.state.reason,
            "iSReviewed": false,
            "customerName": "deep",
            "totalAmount": 899,
            "createdBy": "manideep"
        } 

        CreateDeliveryService.saveGenerateReturnSlip(saveobj).then(res => {
          if(res) {
            toast.success(res.data.result);
          }
        })

    }

    getReturnSlipDetails() {
      const obj = {
            invoiceNo: this.state.invoiceNo,
            mobileNo: this.state.mobileNo,
            domianId:1 //this feild is mandatory
        } 
      CreateDeliveryService.getReturnSlipDetails(obj).then(res => {
        console.log(res);
        if(res) {
          this.setState({returnslipsList: res.data.result});
        }
      });
    }

    renderTableData() {
      return this.state.returnslipsList.length > 0 &&  this.state.returnslipsList.map((items, index) => {
        const { barcode, quantity, netValue } = items;
        return (
           <div>
              <tr>
                    <td className="col-1 geeks">
                      {index+1}
                    </td>
                    <td className="col-5">
                      <div className="d-flex">
                        <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                          <input type="checkbox" className="form-check-input filled-in mt-3" id="roundedExample2" checked />
                          <label className="form-check-label" htmlFor="roundedExample2"></label>

                          <img src={dress1} />
                        </div>
                        <div className="td_align ">
                          <label>Antheaa</label>
                          <label>Women Black & Rust Orange Floral Print #123456789</label>
                        </div>

                      </div>  </td>
                    <td className="col-2">{barcode}</td>
                    <td className="col-2">{quantity}</td>
                    <td className="col-2">₹ {netValue}</td>
                  </tr>
           </div>
        );
    });
    }

    getTableData(){
      return this.state.returnslipsList.map((items,index) => {
        const { barcode, quantity, netValue } = items;
        return (
           <div>
                 <tr>
              <td className="col-4 geeks">
              {barcode}
              </td>
              <td className="col-4">{quantity}</td>
              <td className="col-4">₹ {netValue}</td>
            </tr>
         
             </div>
        )
      });
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
          {this.getTableData()}
            

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
              onClick={this.saveGenerateReturnSlip}
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
             
              <div className="col-12">
              <div className="d-flex mt-3 pointer">
              <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
      <input type="checkbox" className="form-check-input filled-in" id="roundedExample2" checked />
      <label className="form-check-label" htmlFor="roundedExample2">Confirming me to receive promotional messages.</label>
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
                    placeholder="Enter Invoice Number" 
                    value={this.state.invoiceNo}
                    onChange={(e) => this.setState({invoiceNo: e.target.value })}/>
                           <button type="button"className="scan" onClick={this.getReturnSlipDetails}>
                               <img src={scan}/> SCAN  
                </button>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="form-group scaling-mb">
                  <input type="search" className="form-control"
                    placeholder="CUSTMER PHONE NUMBER"    value={this.state.mobileNo}
                    onChange={(e) => this.setState({mobileNo: e.target.value })} />
                </div>
              </div>
              <div className="col-12 col-sm-4 p-r-0 p-l-0 scaling-center">
                <button className="btn-unic-search active m-r-2 scaling-mb" onClick={this.getReturnSlipDetails}>SEARCH</button>
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

                  {this.renderTableData()}
                  {/* <tr>
                    <td className="col-1 geeks">
                      01
                    </td>
                    <td className="col-5">
                      <div className="d-flex">
                        <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                          <input type="checkbox" className="form-check-input filled-in mt-3" id="roundedExample2" checked />
                          <label className="form-check-label" htmlFor="roundedExample2"></label>

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
                      <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                        <input type="checkbox" className="form-check-input filled-in mt-3" id="roundedExample2" checked />
                        <label className="form-check-label" htmlFor="roundedExample2"></label>
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
                      <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                        <input type="checkbox" className="form-check-input filled-in mt-3" id="roundedExample2" checked />
                        <label className="form-check-label" htmlFor="roundedExample2"></label>
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
                  </tr> */}

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
              <select className="form-control"   value={this.state.reason}
                    onChange={(e) => this.setState({reason: e.target.value })} >
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
