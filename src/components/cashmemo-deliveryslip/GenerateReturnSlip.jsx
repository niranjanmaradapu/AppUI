import React, { Component } from "react";
import dress1 from "../../assets/images/midi_blue.svg";
import scan from "../../assets/images/scan.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CreateDeliveryService from "../../services/CreateDeliveryService";
import { toast } from "react-toastify";

export default class GenerateReturnSlip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTagCustomer: false,
      isGenerateSlip: false,
      invoiceNo: "",
      userId: "NA",
      mobileNo: "",
      rtStatus: "",
      returnslipsList: [],
      reason: "",
      netValue: 0,
      quantity: 0,
      netValueList: [],
      returnSlipTotal: 0,
      isgenerateReturnSlip: true,
      mobileNumber: null,
      createdBy: 0,
      comments: null,
    };
    this.tagCustomer = this.tagCustomer.bind(this);
    this.closeTagCustomer = this.closeTagCustomer.bind(this);
    this.generateReturn = this.generateReturn.bind(this);
    this.closegenerateReturn = this.closegenerateReturn.bind(this);
    this.getReturnSlipDetails = this.getReturnSlipDetails.bind(this);
    this.saveGenerateReturnSlip = this.saveGenerateReturnSlip.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.validation=this.validation.bind(this);
  }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.setState({ userId: parseInt(user["custom:userId"]) });
  }

  tagCustomer() {
    this.setState({ isTagCustomer: true });
  }

  getCustomer() {
    CreateDeliveryService.getUserByMobile("+91" + this.state.mobileNumber).then(
      (res) => {
        console.log("get customer", res);
        console.log("phonenumber", res.data.result.phoneNumber);

        if (res) {
          this.setState({
            isgenerateReturnSlip: false,
            userId: res.data.result.userId,
            mobileNumber: res.data.result.phoneNumber,
          });
        }
      }
    );
    this.closeTagCustomer();
  }

  closeTagCustomer() {
    this.setState({ isTagCustomer: false });
  }

  generateReturn() {
    this.setState({ isGenerateSlip: true });
  }

  closegenerateReturn() {
    this.setState({ isGenerateSlip: false });
  }

  saveGenerateReturnSlip() {
    const storeId = sessionStorage.getItem("storeId");
    let barList = [];
    this.state.returnslipsList.forEach((element) => {
      console.log("returnSlipList", this.state.returnslipsList);
      const obj = {
        amount: element.netValue,
        barCode: element.barcode,
        qty: element.quantity,
      };
      barList.push(obj);
    });

    const saveobj = {
      barcodes: barList,
      // mobileNumber: this.state.mobileNo,
      createdBy: parseInt(this.state.createdBy),
      // mobileNumber: this.state.mobileNumber.substring(3, 14),
      mobileNumber: this.state.mobileNumber,
      // rtStatus: this.state.rtStatus,
      storeId: parseInt(storeId),
      totalAmount: parseInt(this.state.returnSlipTotal),
      reason: this.state.reason,
      comments: this.state.comments,
      customerId: parseInt(this.state.userId),
      invoiceNumber:this.state.invoiceNo,
      // invoiceNo: this.state.invoiceNo,

      // userId: this.state.userId,

      // iSReviewed: false,
      // customerName: "",

      // domianId: 1,
    };

    CreateDeliveryService.saveGenerateReturnSlip(saveobj).then((res) => {
      if (res) {
        // toast.success(res.data.result);
        toast.success("ReturnSlip Created Successfully");
        console.log("save generate returnslip", res.data);
        this.setState({
          isTagCustomer: false,
          isGenerateSlip: false,
          invoiceNo: "",
          mobileNo: null,
          mobileNumber: null,
          returnslipsList: [],
          reason: "",
          netValue: 0,
          quantity: 0,
          netValueList: [],
          returnSlipTotal: 0,
          isgenerateReturnSlip: true,
          rtStatus: "",
          createdBy: null,
          comments: "",
        });
      }
    });
  }

  getReturnSlipDetails() {
    const obj = {
      invoiceNo: this.state.invoiceNo,
      // mobileNo: this.state.mobileNo,
      mobileNumber: this.state.mobileNumber,
      domianId: 1, //this feild is mandatory
    };
    CreateDeliveryService.getReturnSlipDetails(obj).then((res) => {
      console.log("get returnslip details", res);
      if (res) {
        this.setState(
          {
            returnslipsList: res.data.result,
          },
          () => {
            let costprice = 0;
            let quantity = 0;

            this.state.returnslipsList.forEach((element) => {
              costprice = costprice + element.netValue;
              quantity = quantity + element.quantity;

              element.isChecked = false;
            });

            this.setState({
              netValue: costprice,
              quantity: quantity,
              amount: costprice,
            });
          }
        );
      }
    });
  }

  getReturnslipTotal(e, value, selectedElement) {
    selectedElement.isChecked = e.target.checked;

    if (e.target.checked) {
      const obj = {
        netValue: selectedElement.netValue,
        barCode: selectedElement.barcode,
      };
      this.state.netValueList.push(obj);
    } else {
      let index = this.state.netValueList.findIndex(
        (ele) => ele.barcode === selectedElement.barcode
      );
      this.state.netValueList.splice(index, 1);
    }

    const netValueList = this.removeDuplicates(
      this.state.netValueList,
      "barcode"
    );
    this.setState({ netValueList: netValueList }, () => {
      let returnSlipTotal = 0;
      this.state.netValueList.forEach((element) => {
        returnSlipTotal = returnSlipTotal + element.netValue;
      });

      this.setState({ returnSlipTotal: returnSlipTotal });
    });
  }

  removeDuplicates(array, key) {
    const lookup = new Set();
    return array.filter((obj) => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }

  renderTableData() {
    return (
      this.state.returnslipsList.length > 0 &&
      this.state.returnslipsList.map((items, index) => {
        const { barcode, quantity, netValue, isChecked } = items;
        return (
          <tr>
            <td className="col-1 geeks">{index + 1}</td>
            <td className="col-5">
              <div className="d-flex">
                <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                  <input
                    type="checkbox"
                    className="form-check-input filled-in mt-3"
                    id="roundedExample2"
                    value={isChecked}
                    onChange={(e) => this.getReturnslipTotal(e, index, items)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="roundedExample2"
                  ></label>
                  6
                  <img src={dress1} />
                </div>
                {/* <div className="td_align ">
                          <label>Antheaa</label>
                          <label>Women Black & Rust Orange Floral Print #123456789</label>
                        </div> */}
              </div>{" "}
            </td>
            <td className="col-2">{barcode}</td>
            <td className="col-2">{quantity}</td>
            <td className="col-2">₹ {netValue}</td>
          </tr>
        );
      })
    );
  }

  getTableData() {
    return this.state.returnslipsList.map((items, index) => {
      const { barcode, quantity, netValue } = items;
      return (
        <div>
          <tr>
            <td className="col-4 geeks">{barcode}</td>
            <td className="col-4">{quantity}</td>
            <td className="col-4">₹ {netValue}</td>
          </tr>
        </div>
      );
    });
  }


  validation(e) {
    console.log(e.target.value)
    const regex = /^[0-9\b]+$/;
    const value = e.target.value;
    if (value === "" || regex.test(value)) {
      this.setState({
        [e.target.id]: e.target.value,
        mobileNumber: e.target.value,
      });
    } else {
      this.setState({mobileNumber: ""});
      // toast.error("pls enter numbers")
    }
  }
  

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isGenerateSlip} size="lg">
          <div className="headerGreen">
            <h5>List of Return Items</h5>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-12 mb-2">
                <label className="text-green fs-14"></label>
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
                  <tbody>{this.getTableData()}</tbody>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn-bdrG pt-2 m-r-2"
              onClick={this.closegenerateReturn}
            >
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
          <ModalHeader>
            <h5>Tag customer</h5>
          </ModalHeader>
          <ModalBody>
            <div className="row p-3">
              <div className="col-12">
                <h6 className="fs-14 mb-4 mt-1">
                  Please provide customer mobile number{" "}
                </h6>
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  value={this.state.mobileNumber}
                  minLength="10"
                  maxLength="10"
                  onChange={(e) =>
                    this.setState({ mobileNumber: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
                <div className="d-flex mt-3 pointer">
                  <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                    <input
                      type="checkbox"
                      className="form-check-input filled-in"
                      id="roundedExample2"
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="roundedExample2"
                    >
                      Confirming me to receive promotional messages.
                    </label>
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
              onClick={this.getCustomer}
            >
              Confirm
            </button>
          </ModalFooter>
        </Modal>
        <div className="row">
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-12 col-sm-4">
                <label>Invoice Number</label>
                <div className="form-group">
                  <input
                    type="search"
                    className="form-control frm-pr"
                    placeholder="Enter Invoice Number"
                    value={this.state.invoiceNo}
                    onChange={(e) =>
                      this.setState({ invoiceNo: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="scan"
                    onClick={this.getReturnSlipDetails}
                  >
                    <img src={scan} /> SCAN
                  </button>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <label>Customer Mobile Number</label>
                <div className="form-group scaling-mb">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Customer Mobile Number"
                    maxLength="10"
                    // value={this.state.mobileNo}
                    value={this.state.mobileNumber}
                    // onChange={(e) =>
                    //   // this.setState({ mobileNo: e.target.value })
                    //   this.setState({ mobileNumber: e.target.value })
                    // }
                    onChange={this.validation}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4 p-r-0 p-l-0 scaling-center mt-4">
                <button
                  className="btn-unic-search active m-r-2 scaling-mb"
                  onClick={this.getReturnSlipDetails}
                >
                  Search
                </button>
                <button
                  className="btn-unic scaling-mb"
                  onClick={this.tagCustomer}
                >
                  Customer Tagging
                </button>
              </div>
            </div>
            {this.state.returnslipsList.length > 0 && (
              <div className="row m-0 p-0">
                <div className="col-12 col-sm-4 p-l-0">
                  <h5 className="mt-0 mb-3">List Of Items For Return</h5>
                </div>
                <div className="col-sm-8 col-12 text-right p-r-0"></div>
                <div className="table-responsive p-0">
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
                    <tbody>{this.renderTableData()}</tbody>
                  </table>
                </div>

                <div className="rect-cardred m-0">
                  <div className="row">
                    <div className="col-2 text-center">
                      <label>
                        Items :{" "}
                        <span className="font-bold">
                          {" "}
                          {this.state.returnslipsList.length}
                        </span>
                      </label>
                    </div>

                    <div className="col-2">
                      <label>
                        Qty :{" "}
                        <span className="font-bold">
                          {" "}
                          {this.state.quantity}
                        </span>
                      </label>
                    </div>
                    <div className="col-2">
                      <label>
                        N/Rate :{" "}
                        <span className="font-bold">
                          {" "}
                          ₹ {this.state.netValue}
                        </span>{" "}
                      </label>
                    </div>
                    <div className="col-3">
                      <label>
                        Discount : <span className="font-bold"> ₹ 0</span>{" "}
                      </label>
                    </div>
                    <div className="col-2">
                      <label>
                        Value :{" "}
                        <span className="font-bold">
                          {" "}
                          ₹ {this.state.netValue}
                        </span>{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {this.state.returnslipsList.length > 0 && (
            <div className="col-12 col-sm-4">
              <div className="rect-grey pb-3">
                <h5 className="m-b-5">Return summary</h5>

                <div className="payment">
                  <div className="row">
                    <div className="col-5 p-r-0 pt-1">
                      <label>Return Amount</label>
                    </div>
                    <div className="col-7 p-l-0 pt-1 text-right">
                      <label className="font-bold">
                        ₹ {this.state.returnSlipTotal}
                      </label>
                    </div>
                  </div>
                </div>
                <h5 className="m-b-3 m-t-5 p-t-4">
                  Return for reason{" "}
                  <span className="text-red float-none fs-18">*</span>
                </h5>

                <select
                  className="form-control"
                  value={this.state.reason}
                  onChange={(e) => this.setState({ reason: e.target.value })}
                >
                  <option>Not fitting</option>
                  <option>Damaged Piece</option>
                  <option>Quality Is Not Good</option>
                  <option>Other</option>
                </select>
                <textarea
                  rows="4"
                  cols="46"
                  className="form-control mt-3"
                  placeholder="Write Comments"
                  value={this.state.comments}
                  onChange={(e) => this.setState({ comments: e.target.value })}
                ></textarea>

                <div className="mt-3">
                  <button
                    className={
                      "mt-1 w-100 " +
                      (this.state.isGenerateReturnSlip
                        ? "btn-unic btn-disable"
                        : "btn-unic active")
                    }
                    onClick={this.generateReturn}
                  >
                    GENERATE RETURN SLIP
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
