import React, { Component } from "react";
import print from "../../assets/images/print.svg";
import view from "../../assets/images/view.svg";
import ListOfReturnSlipsService from "../../services/Reports/ListOfReturnSlipsService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
export default class ListOfSaleBills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RecentSaleNumber: sessionStorage.getItem("recentSale"),
      dateFrom: moment(new Date()).format("YYYY-MM-DD").toString(),
      dateTo: moment(new Date()).format("YYYY-MM-DD").toString(),
      // dateFrom: "",
      // dateTo: "",
      createdBy: null,
      rtNumber: null,
      barcode: null,
      rsList: [],
      rsDetailsList: [],
      rsData: [],
      isView: false,
      domainId: "",
      storeId: "",
      status: null,
      selectOption: [
        {
          name: "RT Status",
          id: "RT STATUS",
        },
        {
          name: "All",
          id: "all",
        },
        {
          name: "Setteled",
          id: "setteled",
        },
        {
          name: "Pending",
          id: "pending",
        },
        {
          name: "Cancelled",
          id: "cancelled",
        },
      ],
    };
    this.getReturnSlips = this.getReturnSlips.bind(this);
    // this.viewReport = this.viewReport.bind(this);
    this.closeViewReport = this.closeViewReport.bind(this);
    this.getReturnslipDetails = this.getReturnslipDetails.bind(this);
  }

  componentWillMount() {
    const storeId = sessionStorage.getItem("storeId");
    const domainData = JSON.parse(sessionStorage.getItem("selectedDomain"));
    // if (domainData.label == "Textile") {
    //   this.setState({ domainId: 1 });
    // } else if (domainData.label == "Retail") {
    //   this.setState({ domainId: 2 });
    // }

    this.setState({ storeId: storeId });
  }

  getReturnSlips() {
    const obj = {
      dateFrom: this.state.dateFrom ? this.state.dateFrom : undefined,
      dateTo: this.state.dateTo ? this.state.dateTo : undefined,
      status: this.state.status ? this.state.status : undefined,
      createdBy: this.state.createdBy ? this.state.createdBy : undefined,
      rtNumber: this.state.rtNumber ? this.state.rtNumber : undefined,
      barcode: this.state.barcode ? this.state.barcode : undefined,
      // domainId: this.state.domainId ? parseInt(this.state.domainId) : undefined,
      storeId: this.state.storeId ? parseInt(this.state.storeId) : undefined,
    };

    ListOfReturnSlipsService.getReturnSlips(obj).then((res) => {
      console.log("....>>>", res);
      if (res.data.result) {
        res.data.result.map((prop, i) => {
          let barcodeData = "";
          if (prop.barcodes.length > 0) {
            barcodeData = Array.prototype.map
              .call(prop.barcodes, function (item) {
                return item.barCode;
              })
              .join(",");
          }
          prop.barcodeVal = barcodeData;
          prop.review = false;
        });
      }

      this.setState({
        rsList: res.data.result,
        rsDetailsList: res.data.result,
      });
    });
  }

  getReturnslipDetails(rtNumber) {
    ListOfReturnSlipsService.getReturnslipDetails(rtNumber).then((res) => {
      console.log("..........", res.data.result);

      let data = res.data.result;

      console.log("dataaaa", data);

      let obj = {
        barCode: "",
        section: "",
        hsnCode: "",
        quantity: "",
        grossValue: "",
        discount: "",
        gst: "",
        taxableAmount: "",
        cgst: "",
        sgst: "",
        igst: "",
        netValue: "",
      };

      let detailsArr = [];

      data.barcode.map((d) => {
        obj = {
          barCode: d.barCode,
          section: d.section,
          hsnCode: d.hsnDetailsVo.hsnCode,
          quantity: d.quantity,
          grossValue: d.grossValue,
          discount: d.discount,
          gst: d.hsnDetailsVo.taxVo.gst,
          taxableAmount: d.hsnDetailsVo.taxVo.taxableAmount,
          cgst: d.hsnDetailsVo.taxVo.cgst,
          sgst: d.hsnDetailsVo.taxVo.cgst,
          igst: d.hsnDetailsVo.taxVo.igst,
          netValue: d.netValue,
        };
        detailsArr.push(obj);
      });
      console.log("?>>>>popup", detailsArr);
      this.setState({
        customerName: data.customerName,
        rtNumber: data.rtNumber,
        mobileNumber: data.mobileNumber,
        createdDate: data.createdDate,
        rsDetailsList: detailsArr,

        isView: true,
      });
    });
  }

  closeViewReport() {
    this.setState({ isView: false });
  }

  renderTableData() {
    return this.state.rsList.map((items, index) => {
      const { rtNumber, barcodeVal, createdBy, createdInfo, amount } = items;
      return (
        <tr className="m-0 p-0" key={index}>
          <td className="col-1">{index + 1}</td>
          <td className="col-2">{rtNumber}</td>
          <td className="col-2">{barcodeVal}</td>
          <td className="col-2">{createdBy}</td>
          <td className="col-2">{createdInfo}</td>
          <td className="col-2">₹{amount}</td>
          <td className="col-1 text-center">
            <img src={print} className="w-12 m-r-2 pb-2 pointer" />
            <img
              src={view}
              className="w-12 pb-2 pointer"
              // onClick={() => this.viewReport(rtNumber)}
              onClick={() => this.getReturnslipDetails(rtNumber)}
            />
            <i className="icon-delete m-l-2 fs-16 pointer"></i>
          </td>
        </tr>
      );
    });
  }

  //   validation(e) {
  //     // const regex = /(\d{4})-(\d{2})-(\d{2})/;
  //     const regex = /^\d{4}-\d{2}-\d{2}$/;
  //     const value = e.target.value;
  //     if (value === "" || regex.test(value))
  //       this.setState({
  //         [e.target.id]: e.target.value,
  //       });
  //   }

  renderPopupTableData() {
    console.log("enterrrr");
    if (this.state.rsDetailsList) {
      return this.state.rsDetailsList.map((items, index) => {
        const {
          barCode,
          section,
          hsnCode,
          quantity,
          grossValue,
          discount,
          gst,
          taxableAmount,
          cgst,
          sgst,
          igst,
          netValue,
        } = items;
        return (
          <tr key={index}>
            <td>{barCode}</td>
            <td>{section}</td>
            <td>{hsnCode}</td>
            <td>{quantity}</td>
            <td>{grossValue}</td>
            <td>{discount}</td>
            <td>{gst}</td>
            <td>{taxableAmount}</td>
            <td>{cgst}</td>
            <td>{sgst}</td>
            <td>{igst}</td>
            <td>{netValue}</td>
          </tr>
        );
      });
    }
  }

  handleSelect(e) {
    if (e.target.value != "RT STATUS") {
      this.setState({
        status: e.target.value,
      });
    }
  }

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isView} className="modal-fullscreen">
          <ModalHeader>Returns Slip Details </ModalHeader>
          <ModalBody>
            <div className="row mb-2">
              <div className="col-3">
                <div className="">
                  <label>Return Memo No : </label>{" "}
                  <span className="font-bold fs-13">
                    {" "}
                    {this.state.rtNumber}
                  </span>
                </div>
              </div>
              <div className="col-3">
                <div className="">
                  <label>Customer : </label>{" "}
                  <span className="font-bold fs-13">
                    {" "}
                    {this.state.customerName}
                  </span>
                </div>
              </div>

              <div className="col-3">
                <div className="">
                  <label>Mobile : </label>{" "}
                  <span className="font-bold fs-13">
                    {" "}
                    {this.state.mobileNumber}
                  </span>
                </div>
              </div>
              <div className="col-3">
                <div className="">
                  <label>Date : </label>{" "}
                  <span className="font-bold fs-13">
                    {" "}
                    {this.state.createdDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-borderless mb-1">
                <thead>
                  <tr className="m-0 p-0">
                    <th className="">Barcode</th>
                    <th className="">Section</th>
                    <th className="">HSN Code</th>
                    <th className="">QTY</th>
                    <th className="">mrp</th>
                    <th className="">Disc</th>
                    <th className="">GST%</th>
                    <th className="">Taxable Amount</th>
                    <th className="">CGST</th>
                    <th className="">SGST</th>
                    <th className="">IGST</th>
                    <th className="">Net Amount</th>
                  </tr>
                </thead>
                {/* <tbody>
            <tr>
              <td>BAR001</td>
              <td>Western Wear</td>
              <td>001</td>
              <td>4699</td>
              <td>01</td>
              <td>1,120</td>
              <td>800</td>
              <td>5.00</td>
              <td>333.33</td>
              <td>8.33</td>
              <td>8.33</td>
              <td>0.00</td>
              <td>350</td>
            </tr>
          </tbody> */}
                {console.log(
                  "?>>>>>>>>>>>>>>>>>table",
                  this.renderPopupTableData()
                )}

                <tbody>{this.renderPopupTableData()}</tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdr" onClick={this.closeViewReport}>
              CANCEL
            </button>
            {/* <button
              className="btn btn-bdr active fs-12"
              onClick={this.closeViewReport}
            >
              SAVE
            </button> */}
          </ModalFooter>
        </Modal>
        <div className="row">
          <div className="col-12 col-sm-2 mt-2">
            <div className="form-group">
              <label>From Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="FROM DATE"
                value={this.state.dateFrom}
                onChange={(e) => this.setState({ dateFrom: e.target.value })}
                // onChange={(e) => this.validation(e)}
              />
            </div>
          </div>
          <div className="col-12 col-sm-2 mt-2">
            <div className="form-group">
              <label>To Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="TO DATE"
                value={this.state.dateTo}
                onChange={(e) => this.setState({ dateTo: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12 col-sm-2 mt-2">
            <label>RT Status</label>
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.status}
                onChange={(e) => {
                  this.handleSelect(e);
                }}
                // onChange={(e) => this.setState({ status: e.target.value })}
              >
                {this.state.selectOption.map((i) => {
                  return (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}
                {/* <option>DS STATUS</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Cancelled</option> */}
              </select>
            </div>
          </div>

          <div className="col-12 col-sm-2 mt-2">
            <div className="form-group">
              <label>EMP ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Emp ID"
                value={this.state.createdBy}
                onChange={(e) => this.setState({ createdBy: e.target.value })}
              />
            </div>
          </div>
          <div className="col-12 col-sm-2  scaling-center scaling-mb mt-2">
            <div className="form-group pt-4">
              <button
                className="btn-unic-search active"
                onClick={this.getReturnSlips}
              >
                Search{" "}
              </button>
            </div>
          </div>
        </div>
        <h5 className="pl-4 mt-3 fs-18 scaling-center scaling-mb">
          Goods Return Slips
        </h5>
        <div className="row m-0 p-0 mb-3">
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-1">S.NO</th>
                  <th className="col-2">RTS Number</th>
                  <th className="col-2">BARCODE</th>
                  <th className="col-2">EMP ID</th>
                  <th className="col-2">RTS DATE</th>
                  <th className="col-2">Amount</th>
                  <th className="col-1"></th>
                </tr>
              </thead>
              {/* <tbody>
              <tr className="m-0 p-0">
                <td className="col-1">01</td>
                <td className="col-2">RTS00001</td>
                <td className="col-2">BAR00001</td>
                <td className="col-2">EMP123</td>
                <td className="col-2">30 Dec 2021</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-1 text-center">
                  <img src={print} className="w-12 m-r-2 pb-2" />
                  <img src={view} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i>
                </td>
              </tr>
             </tbody> */}

              <tbody>{this.renderTableData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
