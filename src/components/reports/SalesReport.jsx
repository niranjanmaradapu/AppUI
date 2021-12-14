import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import print from "../../assets/images/print.svg";
import view from "../../assets/images/view.svg";
import ListOfSaleBillsService from "../../services/Reports/ListOfSaleBillsService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class SalesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: "",
      dateTo: "",
      custMobileNumber: null,
      billStatus: null,
      invoiceNumber: null,
      empId: null,
      sbList: [],
      sbDetailsList: [],
      isView: false,
    };
    this.getSaleBills = this.getSaleBills.bind(this);
    this.viewReport = this.viewReport.bind(this);
    this.closeViewReport = this.closeViewReport.bind(this);
    this.validation = this.validation.bind(this);
  }

  getSaleBills() {
    const obj = {
      // dsNumber: this.state.dsNumber,
      // status: this.state.status,
      dateFrom: this.state.dateFrom ? this.state.dateFrom : undefined,
      dateTo: this.state.dateTo ? this.state.dateTo : undefined,
      custMobileNumber: this.state.custMobileNumber
        ? this.state.custMobileNumber
        : undefined,
      billStatus: this.state.billStatus ? this.state.billStatus : undefined,
      invoiceNumber: this.state.invoiceNumber
        ? this.state.invoiceNumber
        : undefined,
      empId: this.state.empId ? this.state.empId : undefined,
    };
    ListOfSaleBillsService.getSaleBills(obj).then((res) => {
      console.log(res.data.result);
      let data = res.data.result.newSaleVo;

      this.setState({
        sbList: res.data.result.newSaleVo,
        sbDetailsList: res.data.result.newSaleVo,
        // customerName: data.customerName,
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
      taxableAmount: "",
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
        hsnCode: d.hsnDetailsVo.hsnCode,
        quantity: d.quantity,
        taxLabel: d.hsnDetailsVo.taxVo.taxLabel,
        taxableAmount: d.hsnDetailsVo.taxVo.taxableAmount,
        cgst: d.hsnDetailsVo.taxVo.cgst,
        sgst: d.hsnDetailsVo.taxVo.sgst,
        igst: d.hsnDetailsVo.taxVo.igst,
      };
      detailsArry.push(obj);
    });

    this.setState({
      mobileNumber: filterData[0].mobileNumber,
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
            <td>{empId}</td>
            <td>{hsnCode}</td>
            <td>{quantity}</td>
            <td>{itemPrice}</td>
            <td>{discount}</td>
            <td>{taxLabel}</td>
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

  validation(e) {
    this.setState({
      [e.target.id]: e.target.value,
      mobileNumber: e.target.value,
    });

    // const regex = /^[0-9\b]+$/;
    // const value = e.target.value;
    // if (value === "" || regex.test(value)) {
    //   this.setState({
    //     [e.target.id]: e.target.value,
    //     mobileNumber: e.target.value,
    //   });
    // } else {
    //   // toast.error("pls enter numbers")
    // }
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
              <table className="table table-borderless mb-1">
                <thead>
                  <tr className="m-0 p-0">
                    {/* <th className="col-1"> </th> */}
                    <th className="">Barcode</th>
                    <th className="">Section</th>
                    <th className="">EMP ID</th>
                    <th className="">HSN Code</th>
                    <th className="">QTY</th>
                    <th className="">mrp</th>
                    <th className="">Disc</th>
                    <th className="">GST%</th>
                    <th className="">Taxable Amount</th>
                    <th className="">CGST</th>
                    <th className="">SGST</th>
                    <th className="">IGST</th>
                    {/* <th className="col-4">Description</th> */}
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
                  <tr>
                    <td>BAR002</td>
                    <td>Western Wear</td>
                    <td>002</td>
                    <td>4610</td>
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
              <select
                className="form-control"
                value={this.state.billStatus}
                onChange={(e) => this.setState({ billStatus: e.target.value })}
              >
                <option>BILLPOSITION</option>
                <option>New</option>
                <option>Pending</option>
                <option>Cancelled</option>
                <option>success</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-sm-2 mt-2">
            <div className="form-group">
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
              <input
                type="text"
                className="form-control"
                placeholder="MOBILE NUMBER"
                value={this.state.custMobileNumber}
                // maxLength="12"
                // minLength="12"
                // onFocus={this.validation}
                // onChange={this.validation}
                onChange={(e) =>
                  this.setState({ custMobileNumber: e.target.value })
                }
                // autoComplete="off"
              />
            </div>
          </div>
          <div className="col-12 col-sm-2 mt-2">
            <div className="form-group">
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
        <h5 className="pl-4 mt-3 scaling-center scaling-mb">
          New Sales Report
        </h5>
        <div className="row m-0 p-0 mb-3">
          <div className="table-responsive">
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
                 <tr className="">
                    <td className="col-1">02</td>
                    <td className="col-3">INV00002</td>
                    <td className="col-2">EMP124</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-inactive">Terminated</button></td>
                    <td className="col-2 text-center">
                    <img src={print} className="w-12 m-r-2 pb-2"/>
                    <img src={view} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i>

                    </td>
                 </tr>   
                 <tr className="">
                    <td className="col-1">03</td>
                    <td className="col-3">INV00003</td>
                    <td className="col-2">EMP124</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-active">Settled</button></td>
                    <td className="col-2 text-center">
                    <img src={print} className="w-12 m-r-2 pb-2"/>
                    <img src={view} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i>

                    </td>
                 </tr> 
                 <tr className="">
                    <td className="col-1">04</td>
                    <td className="col-3">INV00004</td>
                    <td className="col-2">EMP125</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-active">Settled</button></td>
                    <td className="col-2 text-center">
                    <img src={print} className="w-12 m-r-2 pb-2"/>
                    <img src={view} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i>

                    </td>
                 </tr>  
                 <tr className="">
                    <td className="col-1">05</td>
                    <td className="col-3">INV00005</td>
                    <td className="col-2">EMP126</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-active">Settled</button></td>
                    <td className="col-2 text-center">
                    <img src={print} className="w-12 m-r-2 pb-2"/>
                    <img src={view} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i>

                    </td>
                 </tr>  
                 <tr className="">
                    <td className="col-1">06</td>
                    <td className="col-3">INV00006</td>
                    <td className="col-2">EMP127</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-active">Settled</button></td>
                    <td className="col-2 text-center">
                    <img src={print} className="w-12 m-r-2 pb-2"/>
                    <img src={view} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i>

                    </td>
                 </tr>
                 <tr className="">
                    <td className="col-1">07</td>
                    <td className="col-3">INV00007</td>
                    <td className="col-2">EMP128</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-inactive">Terminated</button></td>
                    <td className="col-2 text-center">
                    <img src={print} className="w-12 m-r-2 pb-2"/>
                    <img src={view} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i>

                    </td>
                 </tr>  
                 <tr className="">
                    <td className="col-1">08</td>
                    <td className="col-3">INV00008</td>
                    <td className="col-2">EMP129</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-inactive">Terminated</button></td>
                    <td className="col-2 text-center">
                    <img src={print} className="w-12 m-r-2 pb-2"/>
                    <img src={view} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i>

                    </td>
                 </tr>  
                 <tr className="">
                    <td className="col-1">09</td>
                    <td className="col-3">INV00009</td>
                    <td className="col-2">EMP130</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-inactive">Terminated</button></td>
                    <td className="col-2 text-center">
                    <img src={print} className="w-12 m-r-2 pb-2"/>
                    <img src={view} className="w-12 pb-2"/>
                         <i className="icon-delete m-l-2 fs-16"></i>

                    </td>
                 </tr>  
                 <tr className="">
                    <td className="col-1">10</td>
                    <td className="col-3">INV00010</td>
                    <td className="col-2">EMP131</td>
                    <td className="col-2">30 Dec 2021</td>
                    <td className="col-2"><button className="btn-inactive">Terminated</button></td>
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
        {/* <div className="rect p-l-0 p-r-0 pt-0">
                <div className="navigation">
                    <div style={{ display: 'block', padding: 20 }}>
                        <Tabs defaultActiveKey="second">
                            <Tab eventKey="first" title="SALES SUMMARY">
                         
                            </Tab>
                            <Tab eventKey="second" title="RETURN SUMMARY">
                            <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col-2">Location</th>
                                            <th className="col-1">Tax Desc</th>
                                            <th className="col-1">Total MRP</th>
                                            <th className="col-1">Total Dis</th>
                                            <th className="col-1">Bill Value</th>
                                            <th className="col-2">Taxable Amt</th>
                                            <th className="col-1">Tax Amt</th>
                                            <th className="col-1">SGST</th>
                                            <th className="col-1">CGST</th>
                                            <th className="col-1">IGST</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                      
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                  
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

                                        </tr>
                                    </tbody>
                                </table>

                            </Tab>
                            <Tab eventKey="third" title="OVERALL SUMMARY">
                            <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col-2">Location</th>
                                            <th className="col-1">Tax Desc</th>
                                            <th className="col-1">Total MRP</th>
                                            <th className="col-1">Total Dis</th>
                                            <th className="col-1">Bill Value</th>
                                            <th className="col-2">Taxable Amt</th>
                                            <th className="col-1">Tax Amt</th>
                                            <th className="col-1">SGST</th>
                                            <th className="col-1">CGST</th>
                                            <th className="col-1">IGST</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                      
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                  
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-2">Hyderabad</td>
                                            <td className="col-1">Totals</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-2">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>
                                            <td className="col-1">₹00:00</td>

                                        </tr>
                        
                                     
                                    </tbody>
                                </table>
                            </Tab>
                        </Tabs>
                    </div>
                 </div>
                </div> */}
      </div>
    );
  }
}
