import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import print from "../../assets/images/print.svg";
import view from "../../assets/images/view.svg";
import ListOfSaleBillsService from "../../services/Reports/ListOfSaleBillsService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";

export default class SalesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: moment(new Date()).format("YYYY-MM-DD").toString(),
      dateTo: moment(new Date()).format("YYYY-MM-DD").toString(),
      // dateFrom: "",
      // dateTo: "",
      custMobileNumber: null,
      billStatus: null,
      invoiceNumber: null,
      empId: null,
      sbList: [],
      sbDetailsList: [],
      isView: false,
      domainId: "",
      storeId: "",
    };
    this.getSaleBills = this.getSaleBills.bind(this);
    this.viewReport = this.viewReport.bind(this);
    this.closeViewReport = this.closeViewReport.bind(this);
    this.validation = this.validation.bind(this);
  }

  componentWillMount() {
    const storeId = sessionStorage.getItem("storeId");
    const domainData = JSON.parse(sessionStorage.getItem("selectedDomain"));
    if (domainData.label == "Textile") {
      this.setState({ domainId: 1 });
    } else if (domainData.label == "Retail") {
      this.setState({ domainId: 2 });
    }

    this.setState({ storeId: storeId });
  }

  getSaleBills() {
    const obj = {
      dateFrom: this.state.dateFrom ? this.state.dateFrom : undefined,
      dateTo: this.state.dateTo ? this.state.dateTo : undefined,
      custMobileNumber: this.state.custMobileNumber
        ? "+91".concat(this.state.custMobileNumber)
        : undefined,
      billStatus: this.state.billStatus ? this.state.billStatus : undefined,
      invoiceNumber: this.state.invoiceNumber
        ? this.state.invoiceNumber
        : undefined,
      empId: this.state.empId ? this.state.empId : undefined,
      domainId: this.state.domainId ? parseInt(this.state.domainId) : undefined,
      storeId: this.state.storeId ? parseInt(this.state.storeId) : undefined,
    };
    ListOfSaleBillsService.getSaleBills(obj).then((res) => {
      console.log(res.data.result);
      let data = res.data.result.newSaleVo;

      this.setState({
        sbList: res.data.result.newSaleVo,
        sbDetailsList: res.data.result.newSaleVo,
      });
    });
  }

  viewReport(invoiceNumber) {
    let filterData = this.state.sbDetailsList.filter(
      (x) => x.invoiceNumber == invoiceNumber
    );

    let obj = {
      barCode: "",
      section: "",
      empId: "",
      hsnCode: "",
      quantity: "",
      itemPrice: "",
      discount: "",
      taxLabel: "",
      // taxableAmount: "",
      taxValue: "",
      cgst: "",
      sgst: "",
      igst: "",
      netValue: "",
    };
    let detailsArry = [];
    filterData[0].lineItemsReVo.map((d) => {
      obj = {
        empId: filterData[0].empId,
        itemPrice: d.itemPrice,
        discount: d.discount,
        barCode: d.barCode,
        section: d.section,
        netValue: d.netValue,
        // hsnCode: d.hsnDetailsVo.hsnCode,
        hsnCode: d.hsnCode,
        quantity: d.quantity,
        // taxLabel: d.hsnDetailsVo.taxVo.taxLabel,
        // taxableAmount: d.hsnDetailsVo.taxVo.taxableAmount,
        // cgst: d.hsnDetailsVo.taxVo.cgst,
        // sgst: d.hsnDetailsVo.taxVo.sgst,
        // igst: d.hsnDetailsVo.taxVo.igst,
        // taxableAmount: d.taxableAmount,
        taxValue: d.taxValue,
        cgst: d.cgst,
        sgst: d.sgst,
        igst: d.igst,
      };
      detailsArry.push(obj);
    });

    this.setState({
      // mobileNumber:
      //   filterData[0].mobileNumber.length > 10
      //     ? filterData[0].mobileNumber.substring(7, 17)
      //     : filterData[0].mobileNumber,

      mobileNumber: filterData[0].mobileNumber,
      // filterData[0].mobileNumber.length > 10
      //   ? filterData[0].mobileNumber.substring(3, 14)
      //   : filterData[0].mobileNumber,

      customerName: filterData[0].customerName,
      createdDate: filterData[0].createdDate,
      invoiceNumber: filterData[0].invoiceNumber,

      lineItemData: detailsArry,
      isView: true,
    });
  }

  closeViewReport() {
    this.setState({ isView: false });
  }

  renderTableData() {
    return this.state.sbList.map((items, index) => {
      const {
        invoiceNumber,
        empId,
        createdDate,
        status,
        billStatus,
        newsaleId,
      } = items;
      return (
        <tr className="" key={index}>
          <td className="col-1">{index + 1}</td>
          <td className="col-3">{invoiceNumber}</td>
          <td className="col-2">{empId}</td>
          <td className="col-2">{createdDate}</td>
          {/* <td className="col-2">
            {billStatus && <button className="btn-active">{billStatus}</button>}
          </td> */}
          <td className="col-2">{status}</td>
          <td className="col-2 text-center">
            <img src={print} className="w-12 m-r-2 pb-2" />
            <img
              src={view}
              className="w-12 pb-2"
              onClick={() => {
                this.viewReport(invoiceNumber);
              }}
            />
            <i className="icon-delete m-l-2 fs-16"></i>
          </td>
        </tr>
      );
    });
  }

  renderPopupTableData() {
    console.log("enter");
    if (this.state.lineItemData) {
      return this.state.lineItemData.map((items, index) => {
        const {
          barCode,
          section,
          empId,
          hsnCode,
          quantity,
          itemPrice,
          discount,
          taxLabel,
          taxValue,
          // taxableAmount,
          cgst,
          sgst,
          igst,
          netValue,
        } = items;
        return (
          <tr key={index}>
            <td width="15%">{barCode}</td>
            <td width="10%">{section}</td>
            {/* <td width="10%">{section}</td> */}
            <td width="5%">{empId}</td>
            <td width="10%">{hsnCode}</td>
            <td width="5%">{quantity}</td>
            <td width="5%">{itemPrice}</td>
            <td width="5%">{discount}</td>
            <td width="5%">{taxLabel}</td>
            <td width="10%">{taxValue}</td>
            <td width="5%">{cgst}</td>
            <td width="10%">{sgst}</td>
            <td width="5%">{igst}</td>
            <td width="10%">{netValue}</td>
          </tr>
        );
      });
    }
  }

  validation(e) {
    // this.setState({
    //   [e.target.id]: e.target.value,
    //   mobileNumber: e.target.value,
    // });

    const regex = /^[0-9\b]+$/;
    const value = e.target.value;
    if (value === "" || regex.test(value)) {
      this.setState({
        [e.target.id]: e.target.value,
        custMobileNumber: e.target.value,
      });
    } else {
      // toast.error("pls enter numbers");
    }
  }

  render() {
    console.log(">>>>>>>>>>>>>>>>lineitem", this.state.lineItemData);

    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isView} className="modal-fullscreen">
          <ModalHeader>Sales Bill Details </ModalHeader>
          <ModalBody>
            <div className="row mb-2">
              <div className="col-3">
                <div className="">
                  <label>Memo No : </label>{" "}
                  <span className="font-bold fs-13">
                    {" "}
                    {this.state.invoiceNumber}
                  </span>
                </div>
              </div>
              <div className="col-3">
                <div className="">
                  <label>Customer : </label>{" "}
                  <span className="font-bold fs-13">
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
              {/* <div className="row m-0 p-0 mb-3"> */}
              <table className="table table-borderless mb-1">
                <thead>
                  <tr className="m-0 p-0">
                    <th width="15%">Barcode</th>
                    <th width="10%">Section</th>
                    <th width="5%">EMPID</th>
                    <th width="10%">HSN Code</th>
                    <th width="5%">QTY</th>
                    <th width="5%">mrp</th>
                    <th width="5%">Disc</th>
                    <th width="5%">GST%</th>
                    <th width="10%">Tax Amount</th>
                    <th width="5%">CGST</th>
                    <th width="10%">SGST</th>
                    <th width="5%">IGST</th>
                    <th width="10%">Net Amount</th>
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
            <div className="form-group">
              <label>Bill Status</label>
              <select
                className="form-control"
                value={this.state.billStatus}
                onChange={(e) => this.setState({ billStatus: e.target.value })}
              >
                <option>BILLPOSITION</option>
                {/* <option>New</option>
                <option>Pending</option> */}

                <option>success</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-sm-2 mt-2">
            <div className="form-group">
              <label>Invoice / Bill No</label>
              <input
                type="text"
                className="form-control"
                placeholder="INVOICE/BILL NO"
                value={this.state.invoiceNumber}
                onChange={(e) =>
                  this.setState({ invoiceNumber: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-12 col-sm-2 mt-2">
            <div className="form-group">
              {/* <input
                type="text"
                name="mobile"
                id="phone"
                className="form-control"
                placeholder="MOBILE NUMBER"
                value={this.state.mobileNumber}
                // onChange={(e) =>
                //   this.setState({ mobileNumber: e.target.value })}
                maxLength="10"
                minLength="10"
                onChange={this.validation}
              /> */}
              <label>Mobile</label>
              <input
                type="text"
                className="form-control"
                placeholder="MOBILE NUMBER"
                value={this.state.custMobileNumber}
                maxLength="10"
                minLength="10"
                onChange={this.validation}
                autoComplete="off"
                // maxLength="12"
                // minLength="12"

                // onFocus={this.validation}
                // onChange={this.validation}
                // onChange={(e) =>
                //   this.setState({ custMobileNumber: e.target.value })
                // }
                // autoComplete="off"
              />
            </div>
          </div>
          <div className="col-12 col-sm-2 mt-2">
            <div className="form-group">
              <label>EMP ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="EMP ID"
                value={this.state.empId}
                onChange={(e) => this.setState({ empId: e.target.value })}
              />
            </div>
          </div>
          <div className="col-sm-4 col-12 mt-2 scaling-mb scaling-center">
            <div className="form-group">
              <button
                className="btn-unic-search active"
                onClick={this.getSaleBills}
              >
                SEARCH{" "}
              </button>
            </div>
          </div>
        </div>
        <h5 className="pl-4 mt-3 scaling-center fs-18 scaling-mb">
          New Sales Report
        </h5>
        <div className="row m-0 p-0 mb-3">
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-1">S.NO</th>
                  <th className="col-3">Invoice Number</th>
                  <th className="col-2">EMP ID</th>
                  <th className="col-2">INVOICE DATE</th>
                  <th className="col-2">Bill Position</th>
                  <th className="col-2"></th>
                </tr>
              </thead>
              {/* <tbody>
                <tr className="">
                    <td className="col-1">01</td>
                    <td className="col-3">INV00001</td>
                    <td className="col-2">EMP123</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-active">Settled</button></td>
                    <td className="col-2 text-center">
                    <img src={print} className="w-12 m-r-2 pb-2"/>
                    <img src={view} className="w-12 pb-2"/>
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
